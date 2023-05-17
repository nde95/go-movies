import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Router, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from './components/error-page/error-page.component';
import Home from "./components/Home/home.component";
import Movies from './components/Movies/movies.component';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <Home />},
      {
        path: "/movies",
        element: <Movies />
      }
    ]
  }, 
  {

  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
