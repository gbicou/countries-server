import { createServer } from "node:http";
import { yoga } from "../yoga";

// Pass it into a server to hook into request handlers.
const server = createServer(yoga.requestListener);

const port = Number(process.env.PORT) || 4000;

// Start the server and you're done!
server.listen(port, () => {
  console.info(`Server is running on http://localhost:${port}/`);
});
