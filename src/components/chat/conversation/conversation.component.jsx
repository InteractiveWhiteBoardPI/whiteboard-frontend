import { useEffect, useState } from "react";
import Socket from "../../../utils/Socket";
import ConversationInput from "../conversation-input/conversation-input.component";
import ConversationHeader from "../conversation-header/conversation-header.component";
import MessagesList from "../messages-list/messages-list.component";
import { formatDateForBackend } from "../../../utils/format-date";
import UseChatContext from "../../../context/chat/useChatContext";
import useUserContext from "../../../context/user/useUserContext";


const Conversation = () => {
  const { setMessages, chosenUser } =  UseChatContext()
  const { currentUser } = useUserContext()
  const [message, setMessage] = useState({
    messageBody: "",
    receiver: chosenUser.uid,
    sender: currentUser?.uid,
    date: "",
  })


  useEffect(() => {
    const messageCallback = ({ body }) => {
      const msg = JSON.parse(body);

      //console.log("recieved :", msg)

      setMessages((prev) => {
        const addedMessages = [...prev, msg];
        const filteredMessages = Array.from(
          new Set(addedMessages.map(JSON.stringify))
        ).map(JSON.parse);

        return filteredMessages;
      });
    };

    Socket.connect();
    Socket.subscribe(`/user/${currentUser?.uid}/private`, messageCallback);
  }, []);

  const sendMessage = async() => {
    const newMessage = {
      ...message,
      sender: currentUser?.uid,
      date: formatDateForBackend(new Date()),
    };

    const response = await fetch("http://localhost:8080/message/save", {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMessage)
    })

    const res = await response.json()
    console.log(res)

    setMessages((prev) => [...prev, res]);

    Socket.send("/app/private-message", JSON.stringify(res));
  };


  return (
    <div className="flex flex-col w-full h-full">
      <ConversationHeader 
        username={chosenUser.username} 

      />
      <MessagesList
        user={chosenUser.uid}
        currentUser={currentUser?.uid}/>
      <ConversationInput
        messageBody={message.messageBody}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default Conversation;
