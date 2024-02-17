import { RxAvatar } from "react-icons/rx";
import truncateString from "../../../utils/truncate-string";
import UseChatContext from "../../../context/chat/useChatContext";
import useUserContext from "../../../context/user/useUserContext";
import { useEffect, useState } from "react";

const ConversationName = ({ user, message }) => {
  const { chosenUser, setChosenUser } = UseChatContext()
  const { currentUser } = useUserContext()
  const [fullUserData,setFullUserData] = useState({
    email : "",
    uid: "",
    username: "",
  })

  const [imageUrl, setImageUrl] = useState();


  useEffect(
    () => {
      const getUser = async () => {

        const res = await fetch("http://localhost:8080/user/get/"+user)


        const json = await res.json()

        setFullUserData(json)
        setImageUrl(`data:image/png;base64,${chosenUser.imageByte}`);

      }
      getUser()
    }, [ user ]
  )




  const handleChose = () => {
    setChosenUser(fullUserData)
  }
  if(!currentUser) return
  return (
    <div
      onClick={handleChose}
      className={`flex items-center w-full text-white py-2 px-2 justify-between border-b border-light-clr-6 bg-light-clr-${user === chosenUser?.uid ? "20" : "10"}`}>
      <div className="flex items-center">
                {(imageUrl==='data:image/png;base64,null' || imageUrl==='data:image/png;base64,undefined')  && <RxAvatar className="text-5xl" />}
                {(imageUrl!=='data:image/png;base64,null' || imageUrl==='data:image/png;base64,undefined') && <img 
                            src={imageUrl}
                            className="w-[3vw] h-[6vh] rounded-full ml-2 mr-2"
                        />
                    }
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

