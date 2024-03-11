import { createContext, useEffect, useState } from "react";
import groupeMessages from "../../utils/groupe-messages";
import useUserContext from "../user/useUserContext";
import UseSessionContext from "../session/useSessionContext";
import socket from "../../utils/Socket";
export const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [groupedMessages, setGroupedMessages] = useState({});
  const [chosenUser, setChosenUser] = useState(null);
  const { currentUser } = useUserContext();
  const { session } = UseSessionContext();
  const [sessionMessages, setSessionMessages] = useState([]);

  useEffect(() => {
    setGroupedMessages(groupeMessages(messages));
  }, [messages]);

  useEffect(() => {
    if (!currentUser) return
    const messageCallback = ({ body }) => {

      const msg = JSON.parse(body);
      setMessages((prev) => {
        const addedMessages = [...prev, msg];
        return Array.from(
          new Set(addedMessages.map(JSON.stringify))
        ).map(JSON.parse);
      });
    };

    socket.connect();
    socket.subscribe(`/user/${currentUser?.uid}/private`, messageCallback);
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:8080/message/all/${currentUser.uid}`)
        const jsonData = await response.json()
        setMessages(jsonData)
      } catch (error) {
      }
    }

    fetchMessages();

  }, [chosenUser, currentUser])

  useEffect(() => {

    if (!session.uid) return
    const fetchSessionMessages = async () => {
      try {
        const response = await fetch(`http://localhost:8080/message/session/${session.uid}`)
        const jsonData = await response.json()
        setSessionMessages(jsonData)
      } catch (error) {
      }
    }

    fetchSessionMessages();
  }, [session]);

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
