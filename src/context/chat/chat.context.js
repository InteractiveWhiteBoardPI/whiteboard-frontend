import { createContext, useEffect, useState } from "react";
import groupeMessages from "../../utils/groupe-messages";

export const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [groupedMessages, setGroupedMessages] = useState({});
  const [chosenUser, setChosenUser] = useState(null);

  useEffect(() => {
    setGroupedMessages(groupeMessages(messages));
  }, [messages]);

  const value = {
    groupedMessages,
    setMessages,
    chosenUser,
    setChosenUser,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
