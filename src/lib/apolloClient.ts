import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

export const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri: import.meta.env.VITE_API_URL ?? "http://localhost:8080/api/graphql",
    credentials: "include",             // Include cookies for authentication
  }),
  cache: new InMemoryCache(),
});