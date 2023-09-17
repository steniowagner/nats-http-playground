import { CircularProgress, Text, Box } from "@chakra-ui/react";

export const LoadingNats = () => (
  <Box display="flex" flexDirection="column">
    <CircularProgress alignSelf="center" isIndeterminate color="blue.300" />
    <Box h="4" />
    <Text size="16" as="b">
      Connecting to NATS...
    </Text>
  </Box>
);
