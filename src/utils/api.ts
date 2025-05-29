function processServerRequest(res: { ok: any; json: () => any; status: any; }) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}
//helpful function for shorthand on requests to check for errors 

const baseUrl = process.env.NODE_ENV === "production"
    ? "server"
    : "http://localhost:3000";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
//making an assumption for headers

export { processServerRequest, baseUrl, headers}

