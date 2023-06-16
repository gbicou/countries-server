import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { schema } from "@bicou/countries-server-schema";

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({
  schema,
  graphqlEndpoint: "/",
});

// Pass it into a server to hook into request handlers.
const server = createServer(yoga.requestListener);

const port = Number(process.env.PORT) || 4000;

// Start the server and you're done!
server.listen(port, () => {
  console.info(`Server is running on http://localhost:${port}/`);
});
