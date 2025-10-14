import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { DocumentNode } from "graphql";

// storage key for convenience
export const AUTH_TOKEN = "__drops_token";

// http link (keystone GraphQL endpoint)
const httpLink = new HttpLink({
  uri: "http://localhost:8080/api/graphql",
  credentials: "include", // keep cookies for keystone sessions
});

// error logging link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  }
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

// Export a single Apollo client instance
export const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

/**
 * setGraphqlHeaders
 * - call this when you want to change the token used for future requests.
 * - It replaces the client's link with a new context-setting link which adds Authorization header.
 *
 * NOTE: we keep `credentials: include` on the httpLink so keystone cookie auth still works.
 */
import { setContext } from "@apollo/client/link/context";
export function setGraphqlHeaders(token: string | undefined) {
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      // If you want an Authorization header: e.g. `Bearer ${token}`.
      // Keystones session-cookie auth doesn't require this header, but other setups might.
      authorization: token ? `Bearer ${token}` : "",
    },
  }));
  // replace link on client
  client.setLink(authLink.concat(httpLink));
}

/**
 * Utility: refetch a particular query safely from outside hooks.
 * Accepts either DocumentNode or string key (but prefer DocumentNode).
 */
export async function refetchQuery(query: DocumentNode) {
  try {
    await client.refetchQueries({ include: [query] });
  } catch (err) {
    // silent catch if nothing to refetch, but log for debugging
    console.warn("refetchQuery failed", err);
  }
}