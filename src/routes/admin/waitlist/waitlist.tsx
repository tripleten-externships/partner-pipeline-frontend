import React, { useState } from "react";
import { SearchFilter } from "@/components/Waitlist/SearchFilter";
import { WaitlistTable } from "@/components/Waitlist/WaitlistTable";

/* Waitlist Page 
It holds the search and status filter state, 
renders the SearchFilter barrenders the WaitlistTable with those filters. 
The page does not know anything about GraphQL directly. 
The data is handled inside WaitlistTable via the useWaitlistEntries() hook. */

const WaitlistPage: React.FC = () => {
    //Text search input "Search by name or email..."
    const [search, setSearch] = useState("");

    // Status filter: "all" | "pending" | "approved" | "rejected"
    const [status, setStatus] = useState("all");

    return (
        <main className="flex-1 bg-zinc-950 p-6">
            <div className="mx-auto max-w-6xl space-y-6">
                <h1 className= "text-2xl font-semibold text-white">Waitlist</h1>

                <SearchFilter 
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
                />

                <WaitlistTable search={search} status={status} />
            </div>
        </main>
    );
};

export default WaitlistPage;