import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Year from "@/pages/Year";
import New from "@/pages/New";
import Layout from "@/pages/Layout";
import Month from "@/pages/Month";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/year", element: <Year /> },
      { path: "/month", element: <Month /> },
    ],
  },
  {
    path: "/new",
    element: <New />,
  },
]);

export default router;
