import express from "express";
import { connect, StringCodec } from "nats";
import bodyParser from "body-parser";

import CONSTANTS from "./constants";

const SUBJECT = "api-event";

const app = express();

app.use(bodyParser.json());

app.post("/", async (req, res) => {
  const server = await connect({
    servers: CONSTANTS.SERVER,
  });
  const codec = StringCodec();
  server.publish(SUBJECT, codec.encode(JSON.stringify(req.body)));
  return res.json();
});

app.listen(3000);
