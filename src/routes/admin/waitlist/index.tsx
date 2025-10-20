import React, { useState } from "react";
import { SearchFilter } from "@/components/Waitlist/SearchFilter";
import { WaitlistTable } from "@/components/Waitlist/WaitlistTable";

export default function WaitlistPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  return (
    <section className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Waitlist Management
      </h1>

      <SearchFilter search={search} setSearch={setSearch} status={status} setStatus={setStatus} />

      <WaitlistTable search={search} status={status} />
    </section>
  );
}
