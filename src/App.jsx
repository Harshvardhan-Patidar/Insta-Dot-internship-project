
import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { AppLayout } from "./Layouts/AppLayout";
import Home from "./Pages/Home";
import Dashboard from "./Components/Complaints/Dashboard";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";

// const dotenv=require("dotenv");
// const dbConnection=require("./DB/db")
// dotenv.config();

const isAuthenticated = () => !!localStorage.getItem("token");


function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout isAuth={isAuthenticated}/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/login",
        element: <Login />
      },
      {
        path:"/register",
        element: <Register />
      },
      {
        path:"/dashboard",
        element: <ProtectedRoute> <Dashboard /> </ProtectedRoute>
      },
    ]
  },
  

]);

const App = () => {
  return <RouterProvider router={router}> </RouterProvider>;
};

// dbConnection();

export default App;
