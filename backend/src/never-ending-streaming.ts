import { connect, StringCodec } from "nats";

import CONSTANTS from "./constants";

(async () => {
  const server = await connect({
    servers: CONSTANTS.SERVER,
  });
  const codec = StringCodec();
  setInterval(() => {
    console.log(`Publishing to "never-ending-streaming"`);
    server.publish(
      "never-ending-streaming",
      codec.encode(
        JSON.stringify({
          message: `Hello from the "never-ending-streaming"!`,
          subject: "never-ending-streaming",
        })
      )
    );
  }, 1000);
})();
