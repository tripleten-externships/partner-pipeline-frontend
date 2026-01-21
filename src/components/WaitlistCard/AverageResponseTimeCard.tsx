import DashCard from "@/components/DashCard/DashCard";
import React from 'react';

// Placehold until backend is ready with timestamp data
const AverageResponseTimeCard: React.FC = () => {
  const avgDays = 12; // Placeholder value

  return (
  <DashCard>
   <div className="h-full w-full flex flex-col items-center justify-center px-4 py-6">
    <div className="text-5xl font-semibold text-white">
      {avgDays}d
    </div>
    <div className="mt-2 text-sm text-zinc-400">
      average response time
    </div>
   </div>
 </DashCard>
  );
};

export default AverageResponseTimeCard;