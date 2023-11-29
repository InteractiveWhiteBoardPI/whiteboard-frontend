import { useContext } from "react";
import { ChatContext } from "./chat.context";

const UseChatContext = () => {
    const {
        groupedMessages,
        setMessages,
        chosenUser, 
        setChosenUser
    } = useContext(ChatContext)

    return {
        groupedMessages,
        setMessages,
        chosenUser, 
        setChosenUser
    }
}
 
export default UseChatContext;