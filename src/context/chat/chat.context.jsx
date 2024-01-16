import { createContext, useEffect, useState } from "react";
import groupeMessages from "../../utils/groupe-messages";
import useUserContext from "../user/useUserContext";
import UseSessionContext from "../session/useSessionContext";

export const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [groupedMessages, setGroupedMessages] = useState({});
  const [chosenUser, setChosenUser] = useState(null);
  const {currentUser} = useUserContext();
  const {session } = UseSessionContext();
  const [sessionMessages, setSessionMessages] = useState([]);

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

  useEffect(() => {

    if(!session) return
    const fetchSessionMessages = async () => {
      try {
        const response = await fetch(`http://localhost:8080/message/session/${session.uid}`)
        const jsonData = await response.json()
        setSessionMessages(jsonData)
      } catch (error) {
        console.log({ error })
      }
    }

    fetchSessionMessages();
  }, [session]);
  console.log({sessionMessages})

  const value = {
    sessionMessages,
    setSessionMessages,
    groupedMessages,
    setMessages,
    chosenUser,
    setChosenUser,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
