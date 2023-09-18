import { Fragment } from "react";
import { Text, Box, Stack } from "@chakra-ui/react";

import { useSubscribeMultiSubjects } from "./use-subscribe-mulit-subjects";
import { SubscribeParams } from "../../hooks/use-nats";
import { MultiSubject } from "./MultiSubject";

type SubscribeMultiSubjectsProps = {
  onSubscribe: (params: SubscribeParams) => void;
  onUnsubscribe: (subject: string) => void;
};

export const SubscribeMultiSubjects = (props: SubscribeMultiSubjectsProps) => {
  const subscribeMultiSubjects = useSubscribeMultiSubjects(props);

  return (
    <Box w="300px">
      <Text fontSize="3xl" as="b">
        Multi subjects
      </Text>
      <Box h="6" />
      <Stack spacing={2} direction="column">
        <>
          {subscribeMultiSubjects.subjects.map((subject) => (
            <Fragment key={subject.title}>
              <MultiSubject
                isSubscribed={subject.isSubscribed}
                onChangeUnsubscribeAfterNMessages={(value: string) =>
                  subscribeMultiSubjects.onChangeUnsubscribeAfterNMessages(
                    subject.index,
                    value
                  )
                }
                unsubscribeAfterNMessages={subject.unsubscribeAfterNMessages}
                onCheck={(value: boolean) =>
                  subscribeMultiSubjects.onCheck(value, subject.index)
                }
                title={subject.title}
                isChecked={subject.isChecked}
                onClickSubscribe={() =>
                  subscribeMultiSubjects.onClickSubscribe(subject.index)
                }
                onClickUnsubscribe={() =>
                  subscribeMultiSubjects.onClickUnsubscribe(subject.index)
                }
              />
              <Box h="4" />
            </Fragment>
          ))}
        </>
      </Stack>
      <Box h="6" />
      <Box
        display="flex"
        flexDirection="column"
        h="200px"
        overflowY="scroll"
        mt="6"
      >
        {subscribeMultiSubjects.messages.map((message, index) => (
          <Text key={`${message}-${index}`} fontSize="medium" as="b" mb="4">
            {`[${index + 1}] - ${JSON.stringify(message)}`}
          </Text>
        ))}
      </Box>
    </Box>
  );
};
