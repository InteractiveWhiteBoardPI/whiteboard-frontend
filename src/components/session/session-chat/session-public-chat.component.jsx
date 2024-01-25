import useUserContext from "../../../context/user/useUserContext";
import ConversationInput from "../../chat/conversation-input/conversation-input.component";
import UseSessionContext from "../../../context/session/useSessionContext";
import {useEffect, useState} from "react";
import {formatDateForBackend} from "../../../utils/format-date";
import socket from "../../../utils/Socket";
import UseChatContext from "../../../context/chat/useChatContext";
import MessagesList from "../../chat/messages-list/messages-list.component";
import DisplaySessionMessages from "./display-session-messages.component";

const MenuBody = () => {

    const {currentUser} = useUserContext();
    const { sessionMessages,setSessionMessages} =  UseChatContext()
    const {session } = UseSessionContext()

    const [message, setMessage] = useState({
        fileName: "",
        content:"",
        messageBody: "",
        receiver: session.uid,
        sender: currentUser?.uid,
        date: "",
    })

    useEffect(() => {
        if(!currentUser) return
        const messageCallback = ({ body }) => {

            const msg = JSON.parse(body);
            setSessionMessages((prev) => {
                const addedMessages = [...prev, msg];
                return Array.from(
                    new Set(addedMessages.map(JSON.stringify))
                ).map(JSON.parse);
            });
        };

        socket.connect();
        socket.subscribe(`/user/${session?.uid}/private`, messageCallback);
    }, [session]);
    const sendMessage = async (messageData, isFileMessage, selectedFile = null) => {
        let newMessage;

        if (isFileMessage && selectedFile) {

            newMessage = {
                ...message,
                fileName: selectedFile?.name,
                fileSize: selectedFile?.size,
                content: messageData,
                sender: currentUser?.uid,
                receiver: session.uid,
                date: formatDateForBackend(new Date())
            };
        } else if(messageData) {
            newMessage = {
                ...message,
                messageBody: messageData,
                sender: currentUser?.uid,
                receiver: session.uid,
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
            setSessionMessages((prev) => [...prev, json]);

            socket.send(`/app/private-message${isFileMessage ? '/file' : ''}`, JSON.stringify(json));
        } catch (error) {
            console.error('Error sending message:', error);

        }
    };


    return (
        <div className="rounded-3xl h-[90%] w-full relative bg-dark-clr-50 py-1 px-3">


            <div className="h-full w-full flex flex-col justify-end">

                <DisplaySessionMessages currentUser={currentUser?.uid}/>

                <div className="w-full">
                    <ConversationInput
                        message={message}
                        setMessage={setMessage}
                        sendMessage={sendMessage}
                        className="w-full p-0.5"

                    />

                </div>


            </div>

        </div>
    );
}

export default MenuBody;