import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import DashCard from "../DashCard/DashCard";
import DashContent from "../DashContent/DashContent";
import BreadcrumbHeader from "../BreadcrumbHeader/BreadcrumbHeader";

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto bg-zinc-950">
        <BreadcrumbHeader section="Overview" page="History" />
        {/* Top row of 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <DashCard />
          <DashCard />
          <DashCard />
        </div>

        {/* Main content area */}
        <DashContent />
      </main>
    </div>
  );
};

export default Dashboard;
