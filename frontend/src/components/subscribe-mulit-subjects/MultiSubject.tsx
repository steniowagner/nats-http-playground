import { Fragment } from "react";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  NumberInputField,
  NumberInput,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";

type MultiSubjectProps = {
  onChangeUnsubscribeAfterNMessages: (value: string) => void;
  unsubscribeAfterNMessages: string;
  onClickSubscribe: () => void;
  onClickUnsubscribe: () => void;
  isSubscribed: boolean;
  title: string;
};

export const MultiSubject = (props: MultiSubjectProps) => (
  <Fragment>
    <Text>{props.title}</Text>
    <NumberInput
      onChange={props.onChangeUnsubscribeAfterNMessages}
      value={props.unsubscribeAfterNMessages}
      defaultValue={props.unsubscribeAfterNMessages}
      isDisabled={props.isSubscribed}
    >
      <NumberInputField placeholder="Unsubscribe after N calls (optional)" />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
    <Box display="flex" justifyContent="flex-end">
      <Button
        isDisabled={!props.isSubscribed}
        onClick={props.onClickUnsubscribe}
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
        onClick={props.onClickSubscribe}
        isLoading={props.isSubscribed}
        loadingText="Subscribed"
        colorScheme="blue"
        variant="outline"
        bg="blue.400"
        _hover={{
          bg: "blue.300",
        }}
        textColor="white"
      >
        Subscribe
      </Button>
    </Box>
  </Fragment>
);
