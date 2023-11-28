import { useEffect, useState } from "react";
import Socket from "../../utils/Socket";
import ConversationInput from "../conversation-input/conversation-input.component";
import ConversationHeader from "../conversation-header/conversation-header.component";
import MessagesList from "../messages-list/messages-list.component";
import { formatDateForBackend } from "../../utils/format-date";
import UseChatContext from "../../context/chat/useChatContext";
import useUserContext from "../../context/user/useUserContext";
const Conversation = () => {
  const { setMessages, chosenUser } =  UseChatContext()
  const { currentUser } = useUserContext()
  const [message, setMessage] = useState({
    messageBody: "",
    receiver: chosenUser.uid,
    sender: currentUser.uid,
    date: "",
  })


  useEffect(() => {
    const messageCallback = ({ body }) => {
      const msg = JSON.parse(body);

      setMessages((prev) => {
        const addedMessages = [...prev, msg];
        const filteredMessages = Array.from(
          new Set(addedMessages.map(JSON.stringify))
        ).map(JSON.parse);

        return filteredMessages;
      });
    };

    Socket.connect();
    Socket.subscribe(`/user/${currentUser.uid}/private`, messageCallback);
  }, [currentUser]);

  const sendMessage = () => {
    const newMessage = {
      ...message,
      sender: currentUser.uid,
      date: formatDateForBackend(new Date()),
    };

    setMessages((prev) => [...prev, newMessage]);

    Socket.send("/app/private-message", JSON.stringify(newMessage));
  };

  const setMsg = (event) => {
    setMessage({ ...message, messageBody: event.target.value });
  };

  return (
    <div className="flex flex-col w-full h-full">
      <ConversationHeader 
        username={chosenUser.username} 
      />
      <MessagesList
        user={chosenUser.uid}
        currentUser={currentUser.uid}/>
      <ConversationInput
        messageBody={message.messageBody}
        setMsg={setMsg}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default Conversation;
