import { connect, StringCodec } from "nats";

(async () => {
  const server = await connect({
    servers: "127.0.0.1:4222",
  });
  const codec = StringCodec();
  const subscription = server.subscribe("hello");
  (async () => {
    for await (const message of subscription) {
      console.log(
        `[${subscription.getProcessed()}]: ${codec.decode(message.data)}`
      );
    }
    console.log("subscription closed");
  })();
})();
