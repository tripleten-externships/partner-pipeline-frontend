import { baseUrl, headers, processServerRequest } from "./api";
//import { setToken } from "./token";

const login = ({ email, password }: { email: string; password: string }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password }),
  }).then(processServerRequest);
};

//could be further refined by creating validation through typescript for email type, but I'm expecting we'll address that with user entry and backend validation

export { login };
