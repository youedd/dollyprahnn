import { GraphQLClient } from "graphql-request"
import { getSdk } from "./generated/sdk"

const client = () => {
  const endpoint = import.meta.env.GRAPHQL_ENDPOINT;

  if (!endpoint) {
    throw "GRAPHQL_ENDPOINT env variable is not defiend"
  }

  const client = new GraphQLClient(endpoint);
  return getSdk(client)
};


export default client