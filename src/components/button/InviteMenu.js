import React, {useRef, useState} from 'react'
import {toast} from "react-toastify";
import useSessionContext from "../../context/session/useSessionContext";
import { ToastContainer } from 'react-toastify';
import UserSelector from '../chat/user-selector/user-selector.component';
import socket from "../../utils/Socket";
import useUserContext from '../../context/user/useUserContext';


export default function InviteMenu({sessionId,handleButtonClick}) {

    const [copySuccess, setCopySuccess] = useState(false);
    const sessionIdRef = useRef(null);
    const { session } = useSessionContext()
    const [uid, setUid] = useState();
    const { currentUser } = useUserContext()


    


    function handleUserSelect(uid,username) {
        console.log("Selected user ID: ", uid,username);
        setUid(uid);
        console.log("Selected user ID: ", uid,username);
    }

    const handleAddMember = async () => {
        console.log("User ID: ", uid);
        
        const notification = {
            from: currentUser.uid,
            to: uid,
            url: sessionId, 
        };
    
        socket.send("/app/notification/notify-user/" + notification.from + "/" + notification.to, JSON.stringify(notification));        
        toast.success("User added to session");
        handleButtonClick();
    }


    const handleCopyLinkClick = () => {
        sessionIdRef.current.select();
        sessionIdRef.current.setSelectionRange(0, 99999);

        document.execCommand('copy');

        setCopySuccess(true);
        setTimeout(() => {
            setCopySuccess(false);
        }, 1500);
    };
    return(
        <div className="rounded-[8px] fixed left-[25vw] top-[15vh] mr-auto w-[50vw] h-[70vh] z-20 bg-black bg-opacity-50 flex justify-center items-center;">
                        <ToastContainer
                            hideProgressBar={false}
                            autoClose={5000}
                            position={"top-center"}
                            theme={"dark"}
                        />            <div className="bg-black p-8 rounded-md shadow-md grid h-[100%] w-[100%]">
                <button className="bg-red-500 text-black border-none p-2 cursor-pointer absolute top-2 right-2" onClick={handleButtonClick}>
                    X
                </button>
                <div className="text-white text-3xl font-maven-pro font-bold leading-normal">
                    Invite People to your session
                </div>
                <div>
                    <div className="font-maven-pro text-[18px] text-white font-thin leading-normal">
                        Invite Share Link
                    </div>
                    <div className="flex mt-5">
                        <div className="text-gray-600 rounded-2xl text-xl">
                            <input
                                type="text"
                                value={"localhost:3000/session/"+sessionId}
                                readOnly
                                className="border-none outline-none bg-transparent w-[33vw]"
                                ref={sessionIdRef}
                            />
                        </div>
                        <button
                            className="rounded-2xl tracking-widest text-white bg-light-clr-20 p-2 text-white bg-light-clr-20 font-maven-pro mt-[-0.5vh] h-[5.5vh] w-[11vw] ml-auto"
                            onClick={handleCopyLinkClick}
                        >
                            Copy Link
                        </button>

                        {copySuccess && (
                            <div className="ml-2 text-green-500 fixed mt-[5vh]">Link copied to clipboard!</div>
                        )}
                    </div>
                    <div className="font-maven-pro text-[18px] text-white font-medium leading-normal pt-[10vh] mb-[3vh] ml-[48%]">
                        OR
                    </div>
                    <UserSelector onUserSelect={handleUserSelect}/>
                    <button onClick={handleAddMember} className='hover:opacity-75'>
                        <div className="text-l font-maven-pro leading-normal font-medium tracking-widest text-white bg-light-clr-20 p-2 text-white bg-light-clr-20 w-[10vw] mt-[8vh] ml-[18vw]">
                            Invite
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );

}