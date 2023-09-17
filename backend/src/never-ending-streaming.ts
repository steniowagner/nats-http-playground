import { connect, StringCodec } from "nats";

import CONSTANTS from "./constants";

(async () => {
  const server = await connect({
    servers: CONSTANTS.SERVER,
  });
  const codec = StringCodec();
  setInterval(() => {
    server.publish(
      "never-ending-streaming",
      codec.encode(
        JSON.stringify({
          subject: `Hello from the "never-ending-streaming" subject!`,
        })
      )
    );
  }, 1000);
})();
