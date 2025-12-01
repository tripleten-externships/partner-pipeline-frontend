import React from "react";
import { createBrowserRouter } from "react-router-dom";
import WaitlistDashboard from "@/routes/WaitlistDashboard";

const router = createBrowserRouter([
  {
    path: "/waitlist",
    element: <WaitlistDashboard />,
  },
]);

export default router;
