export async function ensureDevSession() {
  // 1) Check if already authenticated
  const res = await fetch("http://localhost:8080/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      query: `query { authenticatedItem { __typename ... on User { id email name } } }`,
    }),
  });
  const json = await res.json();
  if (json?.data?.authenticatedItem) return true;

  // 2) Not logged in — authenticate with a user from the dev seed data
  //    Replace with the email/password you used in your seed data if different
  const email = "kate@example.com";
  const password = "password123";

  const loginRes = await fetch("http://localhost:8080/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // <— store Set-Cookie from server
    body: JSON.stringify({
      query: `
        mutation Login($email: String!, $password: String!) {
          authenticateUserWithPassword(email: $email, password: $password) {
            __typename
            ... on UserAuthenticationWithPasswordSuccess {
              sessionToken
              item { id email name }
            }
            ... on UserAuthenticationWithPasswordFailure {
              message
            }
          }
        }`,
      variables: { email, password },
    }),
  });
  const loginJson = await loginRes.json();
  // If success, the browser now has the session cookie; 
  if (loginJson?.data?.authenticateUserWithPassword?.__typename === "UserAuthenticationWithPasswordSuccess") {
    return true;
  }
  console.error("Dev auto-login failed:", loginJson);
  return false;
}
