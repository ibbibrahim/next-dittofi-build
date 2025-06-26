
import StoreProvider from "store-provider";
import App from "app";

export const metadata = {
  "theme-color": "#000000",
  description: "Site built with Dittofi",
  title: "test"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        
        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Bitter:400,700,400italic|Changa One:400,400italic|Droid Sans:400,700|Droid Serif:400,700,400italic,700italic|Roboto:400,700,400italic|Exo:100,200,300,400,500,600,700,800,900,100italic,200italic,300italic,400italic,500italic,600italic,700italic,800italic,900italic|Great Vibes:400|Inconsolata:400,700|Lato:100,300,400,700,900,100italic,300italic,400italic,700italic,900italic|Merriweather:300,400,700,900,300italic,400italic,700italic,900italic|Montserrat:100,200,300,400,500,600,700,800,900,100italic,200italic,300italic,400italic,500italic,600italic,700italic,800italic,900italic|Open Sans:300,400,600,700,800,300italic,400italic,600italic,700italic,800italic|Oswald:200,300,400,500,600,700|PT Sans:400,700,400italic,700italic|PT Serif:400,700,400italic,700italic|Ubuntu:300,400,500,700,300italic,400italic,500italic,700italic|Varela:400|Varela Round:400|Vollkorn:400,700,400italic,700italic&amp;subset="></link>
        
        <style>
            
        </style>

        <script type="text/javascript" src="https://prod.dittofi.link/static/js/index.js?v=1"></script>
        <script type="text/javascript" src="https://kit.fontawesome.com/fa2b9968df.js"></script>
        
        <link rel="stylesheet" type="text/css" href="https://prod.dittofi.link/static/css/style.css"></link>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="https://app5621.prod.dittofi.link/style.css"/>

        <link rel="stylesheet" type="text/css" href="/style.css?uuid=0e2493c4-4cb3-46e9-af5d-132a06b932ff"></link>
      </head>
      <body>
        <div id="root">
          <StoreProvider><App>{children}</App></StoreProvider>
        </div>
      </body>
    </html>
  );
}
