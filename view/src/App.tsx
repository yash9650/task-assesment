import "./styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React, { useState } from "react";
import { CustomNavbar } from "./Components/UI/CustomNavbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Components/Pages/Home";
import Tasks from "./Components/Pages/Tasks";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <CustomNavbar />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/tasks",
          element: <Tasks />,
        },
      ],
    },
  ]);

  return (
    <React.Fragment>
      <React.Fragment>
        <ToastContainer />
        <RouterProvider router={router} />
      </React.Fragment>
    </React.Fragment>
  );
}

export default App;
