import { createContext, useEffect, useState } from "react";
import groupeMessages from "../../utils/groupe-messages";
import useUserContext from "../user/useUserContext";

export const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [groupedMessages, setGroupedMessages] = useState({});
  const [chosenUser, setChosenUser] = useState(null);
  const {currentUser} = useUserContext();

  useEffect(() => {
    setGroupedMessages(groupeMessages(messages));
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:8080/message/all/${currentUser.uid}`)
        const jsonData = await response.json()
        setMessages(jsonData)
      } catch (error) {
        console.log({ error })
      }
    }

    fetchMessages();

  }, [chosenUser])

  const value = {
    groupedMessages,
    setMessages,
    chosenUser,
    setChosenUser,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
