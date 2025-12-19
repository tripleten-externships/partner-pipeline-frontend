import React from "react";
import TotalStudentsCard from "@/components/WaitlistCard/TotalStudentsCard";

export default function WaitlistDashboard() { 
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Waitlist Dashboard</h1>
        <p className="text-zinc-400">Overview of students in the externship waitlist</p>
      </div>
      
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <TotalStudentsCard />
        
        {/* Placeholder for future cards */}
        <div className="bg-zinc-900 border-2 border-dashed border-zinc-700 rounded-lg h-38 md:h-42 lg:h-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-zinc-500 text-sm">More cards</div>
            <div className="text-zinc-500 text-sm">coming soon...</div>
          </div>
        </div>
      </div>
    </div>
  );
}

