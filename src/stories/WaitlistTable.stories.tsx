import React from "react";
import { WaitlistTable } from "@/components/Waitlist/WaitlistTable";

export default {
    title: "Admin/WaitlistTable",
    components: WaitlistTable,
};

export const Default = () => (
    <WaitlistTable search="" status="all" />
);