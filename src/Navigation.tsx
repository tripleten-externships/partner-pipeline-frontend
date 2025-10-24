import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import NotFound from "./pages/notFound/NotFound";



import Introduction from "./pages/docs/Introduction";
import GetStarted from "./pages/docs/GetStarted";
import Tutorial from "./pages/docs/Tutorial";
import Changelog from "./pages/docs/Changelog";



import History from "./pages/overview/History";
import Starred from "./pages/overview/Starred";

import Timeline from "./pages/milestones/Timeline";
import Explorer from "./pages/milestones/Explorer";
import Notification from "./pages/milestones/Notification";


import General from "./pages/settings/General";
import Team from "./pages/settings/Team";


import DesignSystem from "./pages/links/DesignSystem";
import Legal from "./pages/links/Legal";
import Contact from "./pages/links/Contact";


// Route configuration
const routeConfig = {
  docs: [
    { path: "introduction", element: <Introduction /> },
    { path: "get-started", element: <GetStarted /> },
    { path: "tutorials", element: <Tutorial /> },
    { path: "changelog", element: <Changelog /> },
  ],
  overview: [
    { path: "history", element: <History /> },
    { path: "starred", element: <Starred /> },
  ],
  milestones: [
    { path: "timeline", element: <Timeline /> },
    { path: "explorer", element: <Explorer /> },
    { path: "notifications", element: <Notification /> },
  ],
  settings: [
    { path: "general", element: <General /> },
    { path: "team", element: <Team /> },
  ],
  links: [
    { path: "design-system", element: <DesignSystem /> },
    { path: "legal", element: <Legal /> },
    { path: "contact", element: <Contact /> },
  ],
};

const Navigation: React.FC = () => {
  return (
    <Routes>
    <Route path="/" element={<Layout />}>
      {/* <Route index element={<Navigate to="docs/introduction" replace />} /> */}
      <Route path="docs/introduction" element={<div>4444</div>} />
      <Route path="explorer" element={<div>333</div>} />
      {Object.entries(routeConfig).map(([section, pages]) => {
        return pages.map(({ path, element }) => (
          <Route
            key={`${section}-${path}`}
            path={`${section}/${path}`} 
            element={element}
          />
        ))
      })}
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
  );
};

export default Navigation;
