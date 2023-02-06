import { createYoga } from "graphql-yoga";
import { schema } from "../schema";

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({
  schema,
  graphqlEndpoint: "/",
});

export default defineEventHandler((event) => yoga.handle(event.node.req, event.node.res));
