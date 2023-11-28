import { RxAvatar } from "react-icons/rx";
import truncateString from "../../utils/truncate-string";
import UseChatContext from "../../context/chat/useChatContext";
import useUserContext from "../../context/user/useUserContext";
import { useEffect, useState } from "react";

const ConversationName = ({ user, message }) => {
  const { chosenUser, setChosenUser } = UseChatContext()
  const { currentUser } = useUserContext()
  const [fullUserData,setFullUserData] = useState({
    email : "",
    uid: "",
    username: "",
  })

  useEffect(
    () => {
      const getUser = async () => {
        const res = await fetch("http://localhost:8080/users/get/"+user)

        const user = await res.json()

        setFullUserData(user)
      }
      getUser()
    }, [ user ]
  )

  const handleChose = () => {
    setChosenUser(fullUserData)
  }
  return (
    <div
      onClick={handleChose}
      className={`flex items-center w-full text-white py-2 px-2 justify-between border-b border-light-clr-6 bg-light-clr-${user === chosenUser.uid ? "20" : "10"}`}>
      <div className="flex items-center">
        <RxAvatar className="text-5xl" />
        <div className="flex-col ml-2 font-semibold">
          <div className="text-xl">{fullUserData.username}</div>
          <div className="flex text-xs ">
            {
              currentUser.uid === message.sender && <span className="text-light-clr-80 mr-2">you :</span>
            }
            <span className="text-light-clr-60">{truncateString(message.messageBody)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationName;

