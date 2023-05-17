import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Router, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from './components/error-page/error-page.component';
import Home from "./components/Home/home.component";
import Movies from './components/Movies/movies.component';
import Genres from './components/Genres/genres.component';
import EditMovie from './components/admin/edit-movie.component';
import ManageCatalogue from './components/admin/manage-movies.component';
import GraphQL from './components/admin/graphql.component';
import Movie from './components/Movies/Movie/movie.component';
import Login from './Services/login/login.component';

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
      },
      {
        path: "/movies/:id",
        element: <Movie />
      },
      {
        path: "/genres",
        element: <Genres />
      },
      {
        path: "/admin/movie/0",
        element: <EditMovie />
      },
      {
        path: "/manage-catalogue",
        element: <ManageCatalogue />
      },
      {
        path: "/graphql",
        element: <GraphQL />
      },
      {
        path: "/login",
        element: <Login />
      },
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
