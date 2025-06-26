export function makePath(url, payload) {
    if(payload) {
        // Add the path variables.
        if(payload.path_variables && Object.keys(payload.path_variables).length > 0) {
            for (const [field, value] of Object.entries(payload.path_variables)) {
                url = url.replaceAll(`{${field}}`, value);
            }
        }

        // Add the query variables.
        if(payload.query_variables && Object.keys(payload.query_variables).length > 0) {
            url += "?" + new URLSearchParams(payload.query_variables).toString();
        }
    }
    
    return url;
}

// Function to refresh the token
async function refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
        throw new Error("No refresh token available");
    }

    const response = await fetch(`iapi/v1/refresh_token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken })
    });

    if (!response.ok) {
        throw new Error("Failed to refresh token");
    }

    const data = await response.json();
    localStorage.setItem('token', data.access_token);
    return data.access_token;
}

export async function makeRequest(url, method, requestContentType, payload, baseUrl){
    const { hostname, port, protocol } = window.location;

    let fetchOptions = {
        method: method,
        headers: {},
        credentials: 'include'
    };

    const token = localStorage.getItem('token');
    if (token) {
        fetchOptions.headers['Authorization'] = `Bearer ${token}`;
    }

    if(requestContentType && requestContentType !== "multipart/form-data") {
        fetchOptions['Content-Type'] = requestContentType;
    }

    
    if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_IS_NEXT === 'true') {
        baseUrl =  process.env.NEXT_PUBLIC_API_URL;
    }

    // Else fallback to CRA env
    if (typeof process !== 'undefined' && process.env.REACT_APP_IS_NEXT === 'false') {
        baseUrl =  process.env.REACT_APP_API_URL;
    }

    
    let finalUrl = `${baseUrl}${url}`;
    console.log(finalUrl)

    if(payload) {
        // Add headers.
        if(payload.header_variables) {
            fetchOptions.headers = payload.header_variables;
        }

        // Add missing headers.
        if(!fetchOptions.headers['Accept']) {
            fetchOptions.headers['Accept'] = 'application/json';
        } else if (!fetchOptions.headers['Accept'].indexOf('application/json') < 0) {
            fetchOptions.headers['Accept'] += ', ' + 'application/json';
        }

         // Add the body variables.
        if(payload.body_variables) {
            if(payload.body_variables instanceof FormData) {
                fetchOptions.body = payload.body_variables;
            } else if(Object.keys(payload.body_variables).length > 0) {
                if(requestContentType === "multipart/form-data") {
                    var formData = new FormData();
                    Object.keys(payload.body_variables).forEach((key) => {
                        const value = payload.body_variables[key];
                        if (Array.isArray(value)) {
                            // Append multiple files
                            value.forEach((file) => formData.append(key, file));
                        } else {
                            formData.append(key, value);
                        }
                    });
                    fetchOptions.body = formData;
                } else {
                    fetchOptions.body = JSON.stringify(payload.body_variables);
                }
            }
        }

        // Add the path & query variables
        finalUrl = makePath(finalUrl, payload);
    }

   try {
       let response = await fetch(finalUrl, fetchOptions);

       // Check for expired token and refresh if needed
      if (response.status === 401) {
          const authFlow = response.headers.get('X-Auth-Flow');
          if (authFlow === 'JWT' && localStorage.getItem('refresh_token')) {
              try {
                  const newToken = await refreshToken();
                  fetchOptions.headers['Authorization'] = `Bearer ${newToken}`;

                  // Retry the original request
                  response = await fetch(finalUrl, fetchOptions);
              } catch (err) {
                  console.error("Token refresh failed:", err);
                  // Handle logout if refresh token fails
                  //logout();
                  throw new Error("Token expired. Please log in again.");
              }
          }
      }

       if (response.headers.get('Content-Disposition') === "attachment") {
           return downloadFile(response);
       }

       const responseText = await response.text();
       let jsonData = {};
       try{
           jsonData = JSON.parse(responseText);
       } catch(e){
           //throw Error(e);
       }

       if (jsonData.data) {

           if (jsonData.data.access_token && jsonData.data.refresh_token) {
               const { access_token, refresh_token } = jsonData.data;
               if (access_token) {
                   localStorage.setItem('token', access_token);
               }
               if (refresh_token) {
                   localStorage.setItem('refresh_token', refresh_token);
               }
           }
           else if (jsonData.data.responseToken) {
               const { access_token, refresh_token } = jsonData.data.responseToken;
               if (access_token) {
                   localStorage.setItem('token', access_token);
               }
               if (refresh_token) {
                   localStorage.setItem('refresh_token', refresh_token);
               }
           }
       }

       return {
           data: jsonData.data ? jsonData.data : jsonData,
           status: response.status
       };
   } catch (error) {
       console.error("Request failed:", error);
       throw error;
   }
}

// Custom download file function.
async function downloadFile(fetchResult) {        
    var filename = fetchResult.headers.get('content-disposition').split('filename=')[1];
    var data = await fetchResult.blob();
    // It is necessary to create a new blob object with mime-type explicitly set
    // otherwise only Chrome works like it should
    const blob = new Blob([data], { type: data.type || 'application/octet-stream' });
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // IE doesn't allow using a blob object directly as link href.
        // Workaround for "HTML7007: One or more blob URLs were
        // revoked by closing the blob for which they were created.
        // These URLs will no longer resolve as the data backing
        // the URL has been freed."
        window.navigator.msSaveBlob(blob, filename);
        return;
    }
    // Other browsers
    // Create a link pointing to the ObjectURL containing the blob
    const blobURL = window.URL.createObjectURL(blob);
    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = blobURL;
    tempLink.setAttribute('download', filename);
    // Safari thinks _blank anchor are pop ups. We only want to set _blank
    // target if the browser does not support the HTML5 download attribute.
    // This allows you to download files in desktop safari if pop up blocking
    // is enabled.
    if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank');
    }
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    setTimeout(() => {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(blobURL);
    }, 100);
}
