import React from 'react';

type Props = Record<string, never>;

const ActivityLog: React.FC<Props> = () => {
  return (
    <section className="p-4 bg-white rounded-md shadow">
      <h2 className="text-xl font-semibold mb-4">Activity Log</h2>
      <div>
        {/* Activity log entries will render here */}
        <p className="text-gray-500">No activities yet.</p>
      </div>
    </section>
  );
};

export default ActivityLog;
