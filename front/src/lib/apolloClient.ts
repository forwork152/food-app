import { ApolloClient, InMemoryCache } from "@apollo/client";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const client = new ApolloClient({
  uri: `${BACKEND_URL}/graphql`,
  cache: new InMemoryCache(),
});

export default client;
