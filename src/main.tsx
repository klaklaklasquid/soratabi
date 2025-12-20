import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "leaflet/dist/leaflet.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./UI/AppLayout.tsx";
import Home from "./Pages/Home.tsx";
import Browse from "./Pages/Browse.tsx";
import About from "./Pages/About.tsx";
import Journey from "./Pages/Journey.tsx";
import Account from "./Pages/Account.tsx";
import HamburgerProvider from "./Context/HamburgerContext/HamburgerProvider.tsx";
import FilterSettings from "./Components/browseComponents/FilterSettings.tsx";
import FilterProvider from "./Context/FilterContext/FilterProvider.tsx";
import FullTourCard from "./Components/browseComponents/FullTourCard.tsx";
import ModelsProvider from "./Context/ModelsContext/ModelsProvider.tsx";
import NotFound from "./UI/NotFound.tsx";
import LoginPage from "./Pages/LoginPage.tsx";
import RegisterPage from "./Pages/RegisterPage.tsx";
import AuthProtectedRoute from "./Auth/AuthProtectedRoute.tsx";
import AuthProvider from "./Auth/AuthProvider.tsx";
import CreateTour from "./Pages/CreateTour.tsx";

export const routeConfig = [
  {
    path: "/",
    element: <Home />,
    name: "HOME",
    inNav: true,
  },
  {
    path: "/browse-destination",
    element: <Browse />,
    name: "BROWSE",
    inNav: true,
  },
  {
    path: "/about",
    element: <About />,
    name: "ABOUT",
    inNav: true,
  },
  {
    path: "/my-journey",
    element: (
      <AuthProtectedRoute>
        <Journey />
      </AuthProtectedRoute>
    ),
    name: "MY JOURNEY",
    inNav: true,
  },
  {
    path: "/account",
    element: (
      <AuthProtectedRoute>
        <Account />
      </AuthProtectedRoute>
    ),
    name: "ACCOUNT",
    inNav: true,
  },
  {
    path: "create-tour",
    element: (
      <AuthProtectedRoute>
        <CreateTour />
      </AuthProtectedRoute>
    ),
    name: "CREATE TOUR",
    inNav: true,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/filter-settings",
    element: <FilterSettings />,
  },
  {
    path: "/tour/:type/:id",
    element: <FullTourCard />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: routeConfig,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ModelsProvider>
        <FilterProvider>
          <HamburgerProvider>
            <RouterProvider router={router} />
          </HamburgerProvider>
        </FilterProvider>
      </ModelsProvider>
    </AuthProvider>
  </StrictMode>,
);
