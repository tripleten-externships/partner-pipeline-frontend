import React from "react";
import "./StudentAcceptanceRate.css"; 

interface MetricCardProps {
  title: string;
  value: number | null;
  description?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, description }) => {
  return (
    <div className="metric-card">
      <h3 className="metric-card-title">{title}</h3>
      <span className="metric-card-value">
        {value !== null ? `${value}%` : "—"}
        </span>      
      {description && <p className="metric-card-description">{description}</p>}
    </div>
  );
};

interface StudentAcceptanceRateProps {
  invitedCount: number;
  acceptedCount: number;
}

const StudentAcceptanceRate: React.FC<StudentAcceptanceRateProps> = ({ invitedCount, acceptedCount }) => {
  const acceptanceRate =
    invitedCount === 0 ? null : Math.round((acceptedCount / invitedCount) * 100);

  return (
    <MetricCard
      title="Invite Acceptance Rate"
      value={acceptanceRate}
      description={
        invitedCount > 0
          ? `${acceptedCount} of ${invitedCount} invited students accepted`
          : "No invitations sent yet"
      }
    />
  );
};

export default StudentAcceptanceRate;
