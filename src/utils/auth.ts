const ENDPOINT = "http://localhost:8080/api/graphql";

type GraphQLErrorShape = { message: string };

export const login = async ({ email, password }: { email: string; password: string }) => {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      query: `
        mutation($email:String!, $password:String!){
          authenticateUserWithPassword(email:$email, password:$password){
            __typename
            ... on UserAuthenticationWithPasswordSuccess {
              sessionToken
              item { id email name }
            }
            ... on UserAuthenticationWithPasswordFailure { message }
          }
        }`,
      variables: { email, password },
    }),
  });

  const json = await res.json();
  if (json.errors) {
    const errs = json.errors as GraphQLErrorShape[]; // narrow typing
    throw new Error(errs.map((e) => e.message).join("; "));
  }
  return json.data.authenticateUserWithPassword;
};

export const logout = async () => {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ query: `mutation { endSession }` }),
  });
  const json = await res.json();
  if (json.errors) {
    const errs = json.errors as GraphQLErrorShape[];
    throw new Error(errs.map((e) => e.message).join("; "));
  }
  return json.data.endSession;
};
