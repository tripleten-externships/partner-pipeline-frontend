import React from 'react';

export type MilestoneStatus = 'To-do' | 'In progress' | 'In review' | 'Complete';

const statusConfig: Record<MilestoneStatus, { color: string; icon: React.ReactNode; label: string }> = {
    'To-do': {
        color: 'text-gray-400',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
        ),
        label: 'To-do',
    },
    'In progress': {
        color: 'text-blue-500',
        icon: (
            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeDasharray="60 40" /></svg>
        ),
        label: 'In progress',
    },
    'In review': {
        color: 'text-yellow-500',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" />
                <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        label: 'In review',
    },
    'Complete': {
        color: 'text-green-500',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
        ),
        label: 'Complete',
    },
};

interface MilestoneStatusIndicatorProps {
    status: MilestoneStatus;
    className?: string;
}

export const MilestoneStatusIndicator: React.FC<MilestoneStatusIndicatorProps> = ({ status, className }) => {
    const config = statusConfig[status];
    return (
        <span className={`inline-flex items-center gap-2 font-medium ${config.color} ${className ?? ''}`.trim()}>
            {config.icon}
            <span>{config.label}</span>
        </span>
    );
}; 