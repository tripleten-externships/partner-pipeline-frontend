import { processServerRequest, baseUrl, headers } from "./api";
//import { setToken } from "./token";

const login = ({ email, password }: { email: string; password: string}) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password }),
  }).then(processServerRequest);
};

//could be further refined by creating validation through typescript for email type, but I'm expecting we'll address that with user entry and backend validation


//  const onLogin = ({ email, password }: { email: string; password: string}) => {
//     const makeRequest = () => {
//       if (!email || !password) {
//         return;
//       }
//       return auth.login({ email, password }).then((data) => {
//         if (data.token) {
//           setToken(data.token);
//           //room for other functionality (set user, navigate, etc)
//         }
//       });
//     };
//     makeRequest;
//   };
// ^Function pre built to place into app. Logs in user and sets token 

export { login };