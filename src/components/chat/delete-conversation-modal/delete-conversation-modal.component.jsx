import useUserContext from "../../../context/user/useUserContext";
import UseChatContext from "../../../context/chat/useChatContext";
import { HiOutlineTrash } from "react-icons/hi2";
import {useState} from "react";

const DeleteConversationModal = () => {


    const { currentUser } = useUserContext();
    const { setMessages, chosenUser } = UseChatContext();
    const [closeModal, setCloseModal] = useState(false)

    const handleDelete = async () => {
        await fetch(
            `http://localhost:8080/message/delete/all/${currentUser.uid}/${chosenUser.uid}`,
            {
                method: "POST",
                mode: "cors",
            }
        );
        setMessages(prev => prev
            .filter(message => message.sender===currentUser.uid && message.receiver=== chosenUser.uid)
            .filter(message => message.receiver===currentUser.uid && message.sender=== chosenUser.uid)
        )
    };

    const closeModalFunc = (event) =>{
        setCloseModal(event.target.value)
    }

  return(
      <div className="">
          <label htmlFor="conversation-deletion-modal" className="cursor-pointer flex items-center hover:bg-black hover:bg-opacity-60 bg-opacity-60 overflow-hidden">
              <HiOutlineTrash className="mr-2"/>
             <div>Clear conversation</div>
          </label>
          <input type="checkbox" id="conversation-deletion-modal" className="modal-toggle" value={closeModal} onChange={closeModalFunc} />
          <div className="modal bg-dark-clr-40" role="dialog">
              <div className="modal-box bg-gradient-to-br from-light-clr-10 to-dark-clr-50">
                  <p className="py-4">Delete this conversation permanently ?</p>
                  <button className="btn btn-error bg-rose-950 text-white border-none hover:bg-rose-900" onClick={handleDelete} >Delete</button>
              </div>
              <label className="modal-backdrop" htmlFor="conversation-deletion-modal">
                  Close
              </label>
          </div>
      </div>
  )
}

export default DeleteConversationModal;