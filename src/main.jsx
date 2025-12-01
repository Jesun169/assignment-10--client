import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import RootLayout from './Layouts/RootLayout.jsx';
import Home from './Components/Home/Home.jsx';
import AllServices from './Components/AllServices/AllServices.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import Login from './Components/Login/Login.jsx';
import Register from './Components/Register/Register.jsx';
import MyServices from './Components/Services/MyServices.jsx';
import Addservices from './Components/Services/Addservices.jsx';
import MyBookings from './Components/MyBookings/MyBookings.jsx';
import PrivateRoute from './Components/PrivateRoutes/PrivateRoute';


const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "allServices",
        Component: AllServices
      },
      {
        path: "login",
        Component: Login
      },
      {
        path: "register",
        Component: Register
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "myServices",
            Component: MyServices
          },
          {
            path: "addServices",
            Component: Addservices
          },
          {
            path: "myBookings",
            Component: MyBookings
          }
        ]
      }
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
