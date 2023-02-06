import { createServer } from "http";
import { createYoga } from "graphql-yoga";
import { schema } from "./schema";

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({
  schema,
  graphqlEndpoint: "/",
});

// Pass it into a server to hook into request handlers.
// eslint-disable-next-line @typescript-eslint/no-misused-promises
const server = createServer(yoga);

const port = Number(process.env.PORT) || 4000;

// Start the server and you're done!
server.listen(port, () => {
  console.info(`Server is running on http://localhost:${port}/`);
});
