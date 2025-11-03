import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./UI/AppLayout.tsx";
import Home from "./Pages/Home.tsx";
import Browse from "./Pages/Browse.tsx";
import About from "./Pages/About.tsx";
import Journey from "./Pages/Journey.tsx";
import Account from "./Pages/Account.tsx";
import HamburgerProvider from "./Context/HamburgerProvider.tsx";

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
    element: <Journey />,
    name: "MY JOURNEY",
    inNav: true,
  },
  {
    path: "/account",
    element: <Account />,
    name: "ACCOUNT",
    inNav: true,
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
    <HamburgerProvider>
      <RouterProvider router={router} />
    </HamburgerProvider>
  </StrictMode>,
);
