import { connect, StringCodec } from "nats";

(async () => {
  const server = await connect({
    servers: "demo.nats.io",
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
