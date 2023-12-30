import {IoIosArrowDown} from "react-icons/io";
import UseChatContext from "../../../context/chat/useChatContext";
import UseUserContext from "../../../context/user/useUserContext";
import {useState} from "react";

const DeleteSingleMessageModal = ({messageId, className}) => {
    const {setMessages} = UseChatContext();
    const [closeModal, setCloseModal] = useState("off")
    const {currentUser} = UseUserContext()

    const handleDelete = async () => {
        const requestBody = {
            messageId: messageId,
            userId: currentUser.uid,
        };
        await fetch("http://localhost:8080/message/delete", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({key: requestBody})
        })

        setMessages(prev => prev.filter((msg) => (
            msg.id !== messageId
        )))
        setCloseModal("off")
    }

    const closeModalFunc = (event) => {
        setCloseModal(event.target.value)
    }

    return (
        <div className={className}>
            <label htmlFor="my_modal_1" className="cursor-pointer">
                <IoIosArrowDown/>
            </label>
            <input type="checkbox" id="my_modal_1" className="modal-toggle" value={closeModal}
                   onChange={closeModalFunc}/>
            <div className="modal bg-dark-clr-40" role="dialog">
                <div className="modal-box bg-gradient-to-br from-light-clr-10 to-dark-clr-50">
                    <p className="py-4">Delete this message permanently ?</p>
                    <button className="btn btn-error bg-rose-950 text-white border-none hover:bg-rose-900"
                            onClick={handleDelete}>Delete
                    </button>
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_1">
                    Close
                </label>
            </div>
        </div>
    );
};
export default DeleteSingleMessageModal;
