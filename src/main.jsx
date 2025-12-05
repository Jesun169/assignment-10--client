import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import RootLayout from "./Layouts/RootLayout.jsx";
import Home from "./Components/Home/Home.jsx";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import MyServices from "./Components/Services/MyServices.jsx";
import AddServices from "./Components/Services/AddServices.jsx";
import MyBookings from "./Components/MyBookings/MyBookings.jsx";
import Profile from "./Components/Profile/Profile.jsx";
import ServiceList from "./Components/Services/ServiceList.jsx";
import ServiceDetails from "./Components/Services/ServiceDetails.jsx";
import PrivateRoute from "./Components/PrivateRoutes/PrivateRoute.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import ThemeProvider from "./context/ThemeProvider.jsx";
import { Toaster } from "react-hot-toast";

// ⭐ Import your Error Page
import ErrorPage from "./Components/ErrorPage/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,

    errorElement: <ErrorPage />,

    children: [
      { index: true, Component: Home },
      { path: "services", Component: ServiceList },
      { path: "services/:id", Component: ServiceDetails },
      { path: "login", Component: Login },
      { path: "register", Component: Register },

      {
        element: <PrivateRoute />,
        children: [
          { path: "myServices", Component: MyServices },
          { path: "addServices", Component: AddServices },
          { path: "myBookings", Component: MyBookings },
          { path: "profile", Component: Profile },
        ],
      },
    ],
  },

  // Optional global fallback (not required but safe)
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" reverseOrder={false} />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
