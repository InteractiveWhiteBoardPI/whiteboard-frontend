import { useContext } from "react";
import { ChatContext } from "./chat.context";

const UseChatContext = () => {
    const {
        groupedMessages,
        sessionMessages,
        setSessionMessages,
        setMessages,
        chosenUser, 
        setChosenUser,
    } = useContext(ChatContext)

    return {
        groupedMessages,
        sessionMessages,
        setSessionMessages,
        setMessages,
        chosenUser, 
        setChosenUser,
    }
}
 
export default UseChatContext;