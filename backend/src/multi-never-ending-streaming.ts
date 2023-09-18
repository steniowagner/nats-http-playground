import { connect, StringCodec } from "nats";

import CONSTANTS from "./constants";

const MIN_SUBJECT = 1;
const MAX_SUBJECT = 3;

(async () => {
  const server = await connect({
    servers: CONSTANTS.SERVER,
  });
  const codec = StringCodec();
  setInterval(() => {
    const subject =
      Math.floor(Math.random() * (MAX_SUBJECT + 1 - MIN_SUBJECT)) + MIN_SUBJECT;
    console.log(`Publishing to "Subject-${subject}"`);
    server.publish(
      `Subject-${subject}`,
      codec.encode(
        JSON.stringify({
          message: `Hello from the "multi-never-ending-streaming"!`,
          subject: `Subject-${subject}`,
        })
      )
    );
  }, 1000);
})();
