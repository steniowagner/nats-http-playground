import { connect, StringCodec } from "nats";

(async () => {
  const server = await connect({
    servers: "127.0.0.1:4222",
  });
  const codec = StringCodec();
  setInterval(() => {
    server.publish("hello", codec.encode("world"));
  }, 1000);
})();
