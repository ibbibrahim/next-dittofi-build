import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export function baseUrl() {
  /*const { hostname, port, protocol } = window.location;
  let url = `${protocol}//${hostname}`;
  if(port) {
    url = `${url}:${port}`;
  }*/

    if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_IS_NEXT === 'true') {
      return process.env.NEXT_PUBLIC_API_URL;
    }
  
    // Else fallback to CRA env
    if (typeof process !== 'undefined' && process.env.REACT_APP_IS_NEXT === 'false') {
      return process.env.REACT_APP_API_URL;
    }
}

function formatVariables(payload, url) {
  const urlData = {
    path: url,
    headers: (payload && payload.header_variables) ? payload.header_variables : {},
    body: null
  }

  const token = localStorage.getItem('token');

  if (token) {
    urlData.headers['Authorization'] = `Bearer ${token}`;
  }

  if (payload) {
    // Replace path variables
    if(payload.path_variables && Object.keys(payload.path_variables).length > 0) {
      for (const [field, value] of Object.entries(payload.path_variables)) {
        urlData.path = urlData.path.replaceAll(`{${field}}`, value);
      }
    }

    // Add query variables
    if (payload.query_variables && Object.keys(payload.query_variables).length > 0) {
      const queryParams = new URLSearchParams();

      for (const key in payload.query_variables) {
        const value = payload.query_variables[key];

        // Stringify objects and arrays, otherwise, add the value as is
        const serializedValue = typeof value === 'object' ? JSON.stringify(value) : value;
        queryParams.append(key, serializedValue);
      }

      urlData.path += '?' + queryParams.toString();
    }

    // Add body variables
    if(payload.body_variables) {
      if(payload.body_variables instanceof FormData) {
        urlData.body = payload.body_variables;
      } else if(Object.keys(payload.body_variables).length > 0) {
        if(requestContentType === "multipart/form-data") {
          var formData = new FormData();
          Object.keys(payload.body_variables).forEach((k) => formData.append(k, payload.body_variables[k]));
          urlData.body = formData;
        } else {
          urlData.body = JSON.stringify(payload.body_variables);
        }
      }
    }
  }

  return urlData;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl() }),
  tagTypes: [
      "LoginEndpoint",
    
      "LogoutEndpoint",
    
      "GetMeEndpoint",
    
      "RequestPasswordResetEndpoint",
    
      "ResetPasswordEndpoint",
    
      "SignUpEndpoint",
    
      "Action47118Endpoint",
    
      "GetUsersEndpoint",
    
      "Action47159Endpoint",
    
      "Action46465Endpoint",
    
  ],
  endpoints: (builder) => ({
    LoginEndpoint: builder.query({
      query: (payload) => {
        // Build path, headers & body
        const { path, headers, body } = formatVariables(payload, '/v1/login');
        let handler = {
          url: path,
          method: 'post',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            ...headers
          }
        };

        // Set body if exists
        if(body) {
          handler.body = body;
        }
        
        // Return the handler
        return handler;
      },
      providesTags: ["LoginEndpoint"],
      transformResponse: (response) => {
        return response.data
      }
    }),
  
    LogoutEndpoint: builder.query({
      query: (payload) => {
        // Build path, headers & body
        const { path, headers, body } = formatVariables(payload, '/v1/logout');
        let handler = {
          url: path,
          method: 'get',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            ...headers
          }
        };

        // Set body if exists
        if(body) {
          handler.body = body;
        }
        
        // Return the handler
        return handler;
      },
      providesTags: ["LogoutEndpoint"],
      transformResponse: (response) => {
        return response.data
      }
    }),
  
    GetMeEndpoint: builder.query({
      query: (payload) => {
        // Build path, headers & body
        const { path, headers, body } = formatVariables(payload, '/v1/me');
        let handler = {
          url: path,
          method: 'get',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            ...headers
          }
        };

        // Set body if exists
        if(body) {
          handler.body = body;
        }
        
        // Return the handler
        return handler;
      },
      providesTags: ["GetMeEndpoint"],
      transformResponse: (response) => {
        return response.data
      }
    }),
  
    RequestPasswordResetEndpoint: builder.query({
      query: (payload) => {
        // Build path, headers & body
        const { path, headers, body } = formatVariables(payload, '/v1/request_password_reset');
        let handler = {
          url: path,
          method: 'get',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            ...headers
          }
        };

        // Set body if exists
        if(body) {
          handler.body = body;
        }
        
        // Return the handler
        return handler;
      },
      providesTags: ["RequestPasswordResetEndpoint"],
      transformResponse: (response) => {
        return response.data
      }
    }),
  
    ResetPasswordEndpoint: builder.query({
      query: (payload) => {
        // Build path, headers & body
        const { path, headers, body } = formatVariables(payload, '/v1/reset_password');
        let handler = {
          url: path,
          method: 'get',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            ...headers
          }
        };

        // Set body if exists
        if(body) {
          handler.body = body;
        }
        
        // Return the handler
        return handler;
      },
      providesTags: ["ResetPasswordEndpoint"],
      transformResponse: (response) => {
        return response.data
      }
    }),
  
    SignUpEndpoint: builder.query({
      query: (payload) => {
        // Build path, headers & body
        const { path, headers, body } = formatVariables(payload, '/v1/signup');
        let handler = {
          url: path,
          method: 'post',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            ...headers
          }
        };

        // Set body if exists
        if(body) {
          handler.body = body;
        }
        
        // Return the handler
        return handler;
      },
      providesTags: ["SignUpEndpoint"],
      transformResponse: (response) => {
        return response.data
      }
    }),
  
    Action47118Endpoint: builder.query({
      query: (payload) => {
        // Build path, headers & body
        const { path, headers, body } = formatVariables(payload, '/v1/users');
        let handler = {
          url: path,
          method: 'delete',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            ...headers
          }
        };

        // Set body if exists
        if(body) {
          handler.body = body;
        }
        
        // Return the handler
        return handler;
      },
      providesTags: ["Action47118Endpoint"],
      transformResponse: (response) => {
        return response.data
      }
    }),
  
    GetUsersEndpoint: builder.query({
      query: (payload) => {
        // Build path, headers & body
        const { path, headers, body } = formatVariables(payload, '/v1/users');
        let handler = {
          url: path,
          method: 'get',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            ...headers
          }
        };

        // Set body if exists
        if(body) {
          handler.body = body;
        }
        
        // Return the handler
        return handler;
      },
      providesTags: ["GetUsersEndpoint"],
      transformResponse: (response) => {
        return response.data
      }
    }),
  
    Action47159Endpoint: builder.query({
      query: (payload) => {
        // Build path, headers & body
        const { path, headers, body } = formatVariables(payload, '/v1/users/confirm_email');
        let handler = {
          url: path,
          method: 'get',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            ...headers
          }
        };

        // Set body if exists
        if(body) {
          handler.body = body;
        }
        
        // Return the handler
        return handler;
      },
      providesTags: ["Action47159Endpoint"],
      transformResponse: (response) => {
        return response.data
      }
    }),
  
    Action46465Endpoint: builder.query({
      query: (payload) => {
        // Build path, headers & body
        const { path, headers, body } = formatVariables(payload, '/v1/users/password');
        let handler = {
          url: path,
          method: 'put',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            ...headers
          }
        };

        // Set body if exists
        if(body) {
          handler.body = body;
        }
        
        // Return the handler
        return handler;
      },
      providesTags: ["Action46465Endpoint"],
      transformResponse: (response) => {
        return response.data
      }
    }),
  
  }),
})

export const {
  useLoginEndpointQuery,
  
  useLogoutEndpointQuery,
  
  useGetMeEndpointQuery,
  
  useRequestPasswordResetEndpointQuery,
  
  useResetPasswordEndpointQuery,
  
  useSignUpEndpointQuery,
  
  useAction47118EndpointQuery,
  
  useGetUsersEndpointQuery,
  
  useAction47159EndpointQuery,
  
  useAction46465EndpointQuery,
  
} = api;
