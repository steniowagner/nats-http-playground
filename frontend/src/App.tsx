import { useEffect } from "react";
import { Box, Container } from "@chakra-ui/react";

import {
  SubscribeMultiSubjects,
  LoadingNats,
  SubscribeSingleSubject,
} from "./components";
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
        <Box display="flex">
          <SubscribeSingleSubject
            onSubscribe={nats.subscribe}
            onUnsubscribe={nats.unsubscribe}
          />
          <Box w="0.5" h="500px" bg="gray.200" m="24" alignSelf="center" />
          <SubscribeMultiSubjects
            onSubscribe={nats.subscribe}
            onUnsubscribe={nats.unsubscribe}
          />
        </Box>
      )}
    </Container>
  );
};
