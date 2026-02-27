import React from "react";
import { DashCardProps } from "@/utils/types";

const DashCard: React.FC<DashCardProps> = ({ children }) => {
  const isLoading = !children;

  return (
    <div className="bg-zinc-1000 rounded-lg h-38 md:h-42 lg:h-50 w-full overflow-hidden">
      {isLoading ? (
        <div className="w-full h-full animate-shimmer rounded-lg" />
      ) : (
        <div className="">{children}</div>
      )}
    </div>
  );
};

export default DashCard;
