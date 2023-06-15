import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  // Apollo Server Location
  uri: "https://ch2phase3.dheoab.dev",
  // Auto caching from Apollo
  cache: new InMemoryCache(),
});

// export it
export default client;
