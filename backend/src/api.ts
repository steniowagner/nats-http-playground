import express from "express";
import { connect, StringCodec } from "nats";
import bodyParser from "body-parser";

const SERVERS = "demo.nats.io";
const SUBJECT = "API-EVENT";

const app = express();

app.use(bodyParser.json());

app.post("/", async (req, res) => {
  const server = await connect({
    servers: SERVERS,
  });
  const codec = StringCodec();
  server.publish(SUBJECT, codec.encode(JSON.stringify(req.body)));
  return res.json();
});

app.listen(3000);
