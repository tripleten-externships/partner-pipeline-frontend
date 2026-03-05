import React, { useState } from "react";
import { SearchFilter } from "@/components/Waitlist/SearchFilter";
import { WaitlistTable } from "@/components/Waitlist/WaitlistTable";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function WaitlistPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  return (
    <section className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Waitlist Management
      </h1>

      <SearchFilter search={search} setSearch={setSearch} status={status} setStatus={setStatus} />

      <WaitlistTable
        search={search}
        status={status}
        sendInviteButton={
          <Link to="/invite">
            <Button className="flex items-center gap-2 mr-2.5">
              <Mail className="h-4 w-4" />
              Send Invite
            </Button>
          </Link>
        }
      />
    </section>
  );
}
