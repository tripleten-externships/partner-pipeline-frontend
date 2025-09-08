const baseUrl = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

type Milestone = {
  title: string;
  status: string;
  description: string;
};

//helpful function pair for shorthand on requests to check for errors
function processServerRequest(res: Response) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

// API client function to fetch data from the backend.
function requestData(url: string, options?: RequestInit) {
  return fetch(url, options).then(processServerRequest);
}

// a dedicated frontend API function that sends a POST request
function addMilestone(milestone: Milestone) {
  return requestData(`${baseUrl}/api/projects/:projectID/milestones`, {
    method: "POST",
    headers: {
      ...headers,
    },
    body: JSON.stringify(milestone),
  });
}

export { baseUrl, headers, processServerRequest, requestData, addMilestone };
