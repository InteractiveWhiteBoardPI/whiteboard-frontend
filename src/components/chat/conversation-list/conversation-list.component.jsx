import { useEffect, useState } from "react";
import UseChatContext from "../../../context/chat/useChatContext";
import ConversationName from "../conversation-name/conversation-name.component"
import useUserContext from "../../../context/user/useUserContext";

const ConversationList = () => {
    const { groupedMessages } = UseChatContext()
    const [conversations, setConversations] = useState({})
    const { currentUser } = useUserContext()
    useEffect(
        () => {
            if (groupedMessages) {
                const keys = Object.keys(groupedMessages)
                if(keys.length) {
                    keys.forEach(user => {
                        if(user === currentUser?.uid) return
                        setConversations(prev => {
                            const userMessages = groupedMessages[user]
                            return {
                                ...prev, 
                                [user]: userMessages[userMessages.length - 1]
                            }
                        })
                    })
                } else {
                    setConversations({})
                }
            } else {
                setConversations({})
            }
        }, [groupedMessages]
    )
    return (
        <div>
            {
                Object.keys(conversations).map((user, index) => (
                    <ConversationName
                        key={index}
                        user={user}
                        message={conversations[user]}
                    />
                ))
            }
        </div>
    );
}

export default ConversationList;