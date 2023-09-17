import {
  Text,
  Button,
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";

import { SubscribeParams } from "../../hooks/use-nats";
import { useSubscribeSingleSubject } from "./use-subscribe-single-subject";

type SubscribeSingleSubjectProps = {
  onSubscribe: (params: SubscribeParams) => void;
  onUnsubscribe: (subject: string) => void;
};

export const SubscribeSingleSubject = (props: SubscribeSingleSubjectProps) => {
  const subscribeSingleSubject = useSubscribeSingleSubject(props);

  return (
    <Box w="300px">
      <Text fontSize="3xl" as="b">
        Single subject
      </Text>
      <Box h="6" />
      <Text fontSize="medium" as="b">
        Subject (topic)
      </Text>
      <Box h="1" />
      <RadioGroup
        value={subscribeSingleSubject.subject}
        onChange={subscribeSingleSubject.onChangeSubject}
      >
        <Stack direction="column">
          <Radio value="never-ending-streaming">never-ending-streaming</Radio>
          <Radio value="api-event">api-event</Radio>
        </Stack>
      </RadioGroup>
      <Box h="4" />
      <Text fontSize="medium" as="b">
        Unsubscribe after N calls (optional)
      </Text>
      <Box h="1" />
      <NumberInput
        onChange={subscribeSingleSubject.onChangeUnsubscribeAfterNMessages}
        value={subscribeSingleSubject.unsubscribeAfterNMessages}
        defaultValue={subscribeSingleSubject.unsubscribeAfterNMessages}
        isDisabled={subscribeSingleSubject.isSubscribed}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Box h="6" />
      <Box display="flex" justifyContent="flex-end">
        <Button
          isDisabled={!subscribeSingleSubject.isSubscribed}
          onClick={subscribeSingleSubject.onClickUnsubscribe}
          bg="red.400"
          _hover={{
            bg: "red.300",
          }}
          textColor="white"
        >
          Unsubscribe
        </Button>
        <Box w="4" />
        <Button
          onClick={subscribeSingleSubject.onClickSubscribe}
          isLoading={subscribeSingleSubject.isSubscribed}
          loadingText="Subscribed"
          colorScheme="blue"
          variant="outline"
          bg="blue.400"
          _hover={{
            bg: "blue.300",
          }}
          textColor="white"
          isDisabled={
            subscribeSingleSubject.isSubscribed ||
            !subscribeSingleSubject.subject
          }
        >
          Subscribe
        </Button>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        h="200px"
        overflowY="scroll"
        mt="6"
      >
        {subscribeSingleSubject.messages.map((message, index) => (
          <Text key={`${message}-${index}`} fontSize="medium" as="b" mb="4">
            {`[${index + 1}] - ${JSON.stringify(message)}`}
          </Text>
        ))}
      </Box>
    </Box>
  );
};
