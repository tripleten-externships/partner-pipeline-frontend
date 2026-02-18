/**
 * Backend stores the `value` (e.g. "ai_machine_learning"),
 * while the frontend displays the `label` (e.g. "AI/ML").
 * This mapping ensures consistency between UI and API.
 **/
export const programOptions = [
  { label: "AI/ML", value: "ai_machine_learning" },
  { label: "AI Automation", value: "ai_automation" },
  { label: "BI Analytics", value: "business_intelligence_analytics" },
  { label: "CS", value: "cyber_security" },
  { label: "QA", value: "quality_assurance" },
  { label: "AI SE", value: "ai_software_engineering" },
  { label: "UX/UI", value: "ux_ui_design" },
] as const;

export type Program = (typeof programOptions)[number]["value"];

export const getProgramLabel = (value?: Program | null) =>
  programOptions.find((p) => p.value === value)?.label || "AI SE";
