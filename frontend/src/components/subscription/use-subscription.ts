import { useCallback, useEffect, useState } from "react";

import { SubscribeParams } from "../../hooks/use-nats";

type UseSubscriptionParams = {
  onSubscribe: (params: SubscribeParams) => void;
  onUnsubscribe: (subject: string) => void;
};

export const useSubscription = (params: UseSubscriptionParams) => {
  const [subject, setSubject] = useState("never-ending-streaming");
  const [unsubscribeAfterNMessages, setUnsubscribeAfterNMessages] =
    useState(-1);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [messages, setMessages] = useState<unknown[]>([]);

  const handleReceiveMessage = useCallback((message: unknown) => {
    setMessages((messages: unknown[]) => [message, ...messages]);
  }, []);

  const handleClickSubscribe = useCallback(() => {
    setMessages([]);
    setIsSubscribed(true);
    params.onSubscribe({
      unsubscribeAfterNMessages:
        unsubscribeAfterNMessages > 0 ? unsubscribeAfterNMessages : undefined,
      onReceiveMessage: handleReceiveMessage,
      subject,
    });
  }, [unsubscribeAfterNMessages, subject]);

  const handleUnsubscribe = useCallback(() => {
    setIsSubscribed(false);
    params.onUnsubscribe(subject);
  }, [params.onUnsubscribe, subject]);

  useEffect(() => {
    if (unsubscribeAfterNMessages <= 0) {
      return;
    }
    if (unsubscribeAfterNMessages === messages.length) {
      setIsSubscribed(false);
    }
  }, [messages]);

  return {
    onChangeSubject: setSubject,
    unsubscribeAfterNMessages,
    onChangeUnsubscribeAfterNMessages: (value: string) =>
      setUnsubscribeAfterNMessages(parseInt(value)),
    onClickSubscribe: handleClickSubscribe,
    onClickUnsubscribe: handleUnsubscribe,
    subject,
    isSubscribed,
    messages,
  };
};
