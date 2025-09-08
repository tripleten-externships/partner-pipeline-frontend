function processServerRequest(res: Response) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}
//helpful function pair for shorthand on requests to check for errors

const baseUrl = process.env.NODE_ENV === "production" ? "" : "http://localhost:8080";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
//making an assumption for headers

const getActivityLog = async (projectId: string) => {
  const res = await fetch(`${baseUrl}/api/projects/${projectId}/activity-log`, {
    method: "GET",
    headers: headers,
  });
  return processServerRequest(res);
};

// Types for Activity Log API response
export interface ActivityLogEntry {
  milestone: {
    id: string;
    milestoneName: string;
  };
  oldStatus: string;
  newStatus: string;
  updatedBy: {
    id: string;
    name: string;
  };
  timestamp: string;
}

export { processServerRequest, baseUrl, headers , getActivityLog};
