import { useCallback, useState } from "react";

import { SubscribeParams } from "../../hooks/use-nats";

type Subject = {
  unsubscribeAfterNMessages: string;
  isSubscribed: boolean;
  index: number;
  title: string;
};

type UpdateSubjectsStateParams = {
  subjectIndex: number;
  key: keyof Subject;
  value: unknown;
};

type UseSubscribeMultiSubjectsProps = {
  onSubscribe: (params: SubscribeParams) => void;
  onUnsubscribe: (subject: string) => void;
};

export const useSubscribeMultiSubjects = (
  props: UseSubscribeMultiSubjectsProps
) => {
  const [subjects, setSubjects] = useState<Subject[]>(
    Array(3)
      .fill({})
      .map((_, index) => ({
        unsubscribeAfterNMessages: "-1",
        title: `Subject-${index + 1}`,
        isSubscribed: false,
        index,
      }))
  );
  const [messages, setMessages] = useState<unknown[]>([]);

  const updateSubjectsState = useCallback(
    (params: UpdateSubjectsStateParams) => {
      setSubjects((subjects) =>
        subjects.map((subject, index) => {
          if (params.subjectIndex !== index) {
            return subject;
          }
          return {
            ...subject,
            [params.key]: params.value,
          };
        })
      );
    },
    []
  );

  const handleClickSubscribe = useCallback(
    (subjectIndex: number) => {
      updateSubjectsState({ subjectIndex, key: "isSubscribed", value: true });
      const unsubscribeAfterNMessages = parseInt(
        subjects[subjectIndex].unsubscribeAfterNMessages
      );
      props.onSubscribe({
        onReceiveMessage: (message: unknown) =>
          setMessages((messages) => [message, ...messages]),
        subject: `Subject-${subjectIndex + 1}`,
        unsubscribeAfterNMessages:
          unsubscribeAfterNMessages > 0 ? unsubscribeAfterNMessages : undefined,
      });
    },
    [props.onSubscribe, subjects]
  );

  const handleClickUnsubscribe = useCallback(
    (subjectIndex: number) => {
      updateSubjectsState({ subjectIndex, key: "isSubscribed", value: false });
      props.onUnsubscribe(`Subject-${subjectIndex + 1}`);
    },
    [props.onUnsubscribe, subjects]
  );

  const handleChangeUnsubscribeAfterNMessages = useCallback(
    (subjectIndex: number, value: string) => {
      updateSubjectsState({
        key: "unsubscribeAfterNMessages",
        subjectIndex,
        value,
      });
    },
    []
  );

  return {
    onChangeUnsubscribeAfterNMessages: handleChangeUnsubscribeAfterNMessages,
    onClickUnsubscribe: handleClickUnsubscribe,
    onClickSubscribe: handleClickSubscribe,
    messages,
    subjects,
  };
};
