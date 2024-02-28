import React, { useEffect, useRef, useState } from "react";
import useSessionContext from "../../../../context/session/useSessionContext";
import { FaShare, FaCheck, FaPaperclip } from "react-icons/fa";
import InviteUser from "./invite-user.component";

export default function InviteMenu() {
    const { session } = useSessionContext()
    const ref = useRef();
    const [copySuccess, setCopySuccess] = useState(false);
    const [modalState, setModalState] = useState(false)

    const handleCopyClick = () => {
        navigator
            .clipboard
            .writeText(`http://localhost:3000/session/${session.uid}`)
            .then(() => setCopySuccess(true))


        setTimeout(() => {
            setCopySuccess(false);
        }, 2000)
    }

    const showModal = () => {
        ref.current.showModal();
        setModalState(true)
    }
    const handleUnmount = () => {
        setModalState(false)
    }
    return (
        <>
            <button className="bg-black w-14 h-14 rounded-full flex justify-center items-center" onClick={showModal}>
                <FaShare className="text-2xl" />
            </button>
            
            <dialog ref={ref} className="modal">
                <form method="dialog" className="modal-backdrop" >
                    <button onClick={handleUnmount}></button>
                </form>
                <div className="modal-box bg-gradient-to-br from-dark-clr-80 to-dark-clr-70 p-4 min-w-fit shadow">
                    <div className="text-white text-3xl font-bold">Invite People to your session</div>
                    <div className="text-[18px] text-white font-thin">
                        Session link
                    </div>
                    <div
                        className="flex border-b pb-2 gap-2 items-center justify-between cursor-pointer w-max text-sm"
                        onClick={handleCopyClick}>
                        <label className="cursor-pointer text-transparent gradient-label bg-clip-text w-max">
                            {
                                copySuccess ? "Copied into your clipboard" : `localhost:3000/session/${session.uid}`
                            }
                        </label>
                        <button>
                            {copySuccess ? (
                                <FaCheck />
                            ) : (
                                <FaPaperclip />
                            )}
                        </button>
                    </div>
                    <div className="text-sm text-center my-4">
                        OR
                    </div>
                    <InviteUser modalState={modalState}/>
                </div>
            </dialog>
        </>
    );
}
