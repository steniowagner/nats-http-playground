import { useEffect } from "react";
import { Container } from "@chakra-ui/react";

import { LoadingNats, SubscribeSingleSubject } from "./components";
import { useNats } from "./hooks";

export const App = () => {
  const nats = useNats();

  useEffect(() => {
    nats.connect();
    return () => nats.disconnect();
  }, []);

  return (
    <Container
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
    >
      {nats.isConnecting && <LoadingNats />}
      {nats.isConnected && (
        <>
          <SubscribeSingleSubject
            onSubscribe={nats.subscribe}
            onUnsubscribe={nats.unsubscribe}
          />
        </>
      )}
    </Container>
  );
};
