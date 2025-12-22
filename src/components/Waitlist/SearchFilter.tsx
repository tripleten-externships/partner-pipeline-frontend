import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

interface Props {
  search: string;
  setSearch: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  program: string;
  setProgram: (v: string) => void;
}

export function SearchFilter({ search, setSearch, status, setStatus, program, setProgram }: Props) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <Input
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:flex-1 border-2 border-gray-300 dark:border-gray-700 p-2 rounded-lg"
      />

      <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row md:items-center">

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <Select value={program} onValueChange={setProgram}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="All Programs" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Programs</SelectItem>
            <SelectItem value="se">SE</SelectItem>
            <SelectItem value="qa">QA</SelectItem>
            <SelectItem value="ai">AI</SelectItem>
            <SelectItem value="ds">DS</SelectItem>
            <SelectItem value="ux/ui">UX/UI</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
