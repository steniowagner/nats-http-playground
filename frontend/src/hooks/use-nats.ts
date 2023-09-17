import { useCallback, useState } from "react";
import {
  connect as natsConnect,
  JSONCodec,
  NatsConnection,
  Subscription,
} from "nats.ws";

const NATS_SERVER_URL = "wss://demo.nats.io:8443";

export type SubscribeParams = {
  onReceiveMessage: <T>(data: T) => void;
  unsubscribeAfterNMessages?: number;
  subject: string;
};

export const useNats = () => {
  const [connection, setConnection] = useState<NatsConnection>();
  const [subscriptions, setSubscriptions] = useState<
    Record<string, Subscription>
  >({});
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    const connection = await natsConnect({
      servers: [NATS_SERVER_URL],
    });
    setIsConnecting(false);
    setConnection(connection);
  }, []);

  const disconnect = useCallback(() => {
    connection?.drain();
  }, [connection]);

  const subscribe = useCallback(
    async <T>(params: SubscribeParams) => {
      if (!connection) {
        return;
      }
      const codec = JSONCodec();
      const subscription = connection.subscribe(params.subject, {
        callback(err, message) {
          if (err) {
            return console.error(err);
          }
          params.onReceiveMessage(codec.decode(message.data) as T);
        },
      });
      setSubscriptions((subscriptions) => ({
        ...subscriptions,
        [params.subject]: subscription,
      }));
      if (params.unsubscribeAfterNMessages) {
        subscription.unsubscribe(params.unsubscribeAfterNMessages);
      }
    },
    [connection]
  );

  const unsubscribe = useCallback(
    (subject: string) => {
      if (!subscriptions[subject]) {
        return;
      }
      subscriptions[subject].unsubscribe();
    },
    [subscriptions]
  );

  return {
    subscribe,
    isConnecting,
    isConnected: !!connection,
    unsubscribe,
    connect,
    disconnect,
  };
};
