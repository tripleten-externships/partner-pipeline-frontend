import React from "react";
import { PanelLeft, ChevronRight } from "lucide-react";
import { BreadcrumbHeaderProps } from "@/utils/types";

const BreadcrumbHeader: React.FC<BreadcrumbHeaderProps> = ({ section, page }) => {
  return (
    <div className="flex items-center gap-2 text-sm text-zinc-400 mb-6">
      <PanelLeft size={16} className="text-zinc-500" />
      <span className="w-[1px] h-4 bg-zinc-700" />
      <span className="text-white">{section}</span>
      <ChevronRight size={16} className="text-zinc-600" />
      <span className="text-white">{page}</span>
    </div>
  );
};

export default BreadcrumbHeader;
