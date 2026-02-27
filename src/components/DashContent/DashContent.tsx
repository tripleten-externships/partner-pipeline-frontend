import React from "react";
import { DashContentProps } from "@/utils/types";

const DashContent: React.FC<DashContentProps> = ({ children }) => {
  const isLoading = !children;

  return (
    <div className="bg-zinc-1000 rounded-lg w-full h-[635px] overflow-hidden">
      {isLoading ? (
        <div className="w-full h-full animate-shimmer rounded-lg" />
      ) : (
        <div className="p-6">{children}</div>
      )}
    </div>
  );
};

export default DashContent;
