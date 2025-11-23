import React from "react";
import DashCard from "../DashCard/DashCard";

const StudentsWaitingCard: React.FC = () => {
  // Placeholder for future implementation
  const count = 0;

  return (
    <DashCard>
      <div className="p-4">
        <p className="text-zinc-300 text-sm">Students Waiting</p>
        <h2 className="text-3xl font-bold text-white">{count}</h2>
      </div>
    </DashCard>
  );
};
export default StudentsWaitingCard;