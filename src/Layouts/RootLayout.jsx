import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Components/Header/NavBar";
import Footer from "../Components/Footer/Footer";
import { useTheme } from "../context/ThemeProvider";

const RootLayout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text transition-colors duration-500">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <NavBar />
      </div>

      <Outlet />

      <Footer />
    </div>
  );
};

export default RootLayout;
