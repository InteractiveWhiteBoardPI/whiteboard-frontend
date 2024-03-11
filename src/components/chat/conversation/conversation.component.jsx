import {useEffect, useState} from "react";
import socket from "../../../utils/Socket";
import ConversationInput from "../conversation-input/conversation-input.component";
import ConversationHeader from "../conversation-header/conversation-header.component";
import MessagesList from "../messages-list/messages-list.component";
import {formatDateForBackend} from "../../../utils/format-date";
import UseChatContext from "../../../context/chat/useChatContext";
import useUserContext from "../../../context/user/useUserContext";

const Conversation = () => {

  const { setMessages, chosenUser } =  UseChatContext()
  const { currentUser } = useUserContext()

  const [message, setMessage] = useState({
    fileName: "",
    content:"",
    messageBody: "",
    receiver: chosenUser.uid,
    sender: currentUser?.uid,
    date: "",
  })

  useEffect(() => {
    if(!currentUser) return
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

  const sendMessage = async (messageData, isFileMessage, selectedFile = null) => {
    let newMessage;

    if (isFileMessage && selectedFile) {
      const fileData = messageData;

      newMessage = {
        ...message,
        fileName: selectedFile?.name,
        fileSize: selectedFile?.size,
        content: fileData,
        sender: currentUser?.uid,
        receiver: chosenUser.uid,
        date: formatDateForBackend(new Date())
      };
    } else if(messageData) {
      newMessage = {
        ...message,
        messageBody: messageData,
        sender: currentUser?.uid,
        receiver: chosenUser.uid,
        date: formatDateForBackend(new Date()),
      };
    }
    try {
      const response = await fetch(`http://localhost:8080/message/save${isFileMessage ? '/file' : ''}`, {
        method: 'POST',
        mode: 'cors',
        headers: {

          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
      });

      const json = await response.json();
      setMessages((prev) => [...prev, json]);

      socket.send(`/app/private-message${isFileMessage ? '/file' : ''}`, JSON.stringify(json));
    } catch (error) {
      console.error('Error sending message:', error);

    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <ConversationHeader 
        username={chosenUser.username}
        imageUrl={chosenUser.imageByte}
      />
      <MessagesList
        user={chosenUser.uid}
        currentUser={currentUser?.uid}/>
      <ConversationInput
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
        className="p-4 w-full"


      />
    </div>
  );
};
export default Conversation;