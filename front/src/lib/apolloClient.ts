import { ApolloClient, InMemoryCache } from "@apollo/client";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = BACKEND_URL;

const client = new ApolloClient({
  uri: `${BACKEND_URL}/graphql`,
  cache: new InMemoryCache(),
});

export default client;
