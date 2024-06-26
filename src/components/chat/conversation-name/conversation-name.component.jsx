import { RxAvatar } from "react-icons/rx";
import truncateString from "../../../utils/truncate-string";
import UseChatContext from "../../../context/chat/useChatContext";
import useUserContext from "../../../context/user/useUserContext";
import { useEffect, useState } from "react";

const ConversationName = ({ user, message }) => {
  const { chosenUser, setChosenUser, setMessages } = UseChatContext()
  const { currentUser } = useUserContext()
  const [fullUserData, setFullUserData] = useState({
    email: "",
    uid: "",
    username: "",
  })
  const [hide, setHide] = useState(false)

  useEffect(
    () => {
      const getUser = async () => {
        const res = await fetch("http://localhost:8080/user/get/" + user)
        if (res.status !== 200) {
          setMessages(prev => prev.filter(msg => msg.sender !== user && msg.receiver !== user))
          setHide(true)
          return
        }
        const json = await res.json()
        setFullUserData(json)
      }
      getUser();
    }, [user]
  )

  const handleChose = () => {
    setChosenUser(fullUserData)
  }
  if (!currentUser) return
  return !hide && (
    <div
      onClick={handleChose}
      className={`flex items-center w-full text-white py-2 px-2 justify-between border-b border-light-clr-6 bg-light-clr-${user === chosenUser?.uid ? "20" : "10"}`}>
      <div className="flex items-center">
        <RxAvatar className="text-5xl" />
        <div className="flex-col ml-2 font-semibold">
          <div className="text-xl">{fullUserData.username}</div>
          <div className="flex text-xs ">
            {
              currentUser?.uid === message.sender && <span className="text-light-clr-80 mr-2">you :</span>
            }
            <span className="text-light-clr-60">{truncateString(message.messageBody)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationName;
