import React, {useRef, useState} from 'react'
import {toast} from "react-toastify";
import useSessionContext from "../../context/session/useSessionContext";
import InputField from '../input-field/input-field.component';
import { ToastContainer } from 'react-toastify';

export default function InviteMenu({sessionId,handleButtonClick}) {

    const [copySuccess, setCopySuccess] = useState(false);
    const sessionIdRef = useRef(null);
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const { session } = useSessionContext()

    const handleInputChange = (event) => {
        setUsername(event.target.value);
    };



    const handleAddMember = async (sessionId) => {
        const member = { userData };

        try {
            const response = await fetch(`http://localhost:8080/join/${sessionId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(member),
            });

            if (response.status === 201) {
                toast('Member added successfully');
            } else {
                console.error('Failed to add member');
            }
        } catch (error) {
            console.error('Error adding member:', error);
        }
    };


    const handleGetUserByUsername = async (username) => {
        try {
            const response = await fetch(`http://localhost:8080/get-user/${username}`);

            if (response.ok) {
                const user = await response.json();
                setUserData(user);
            } else {
                toast('Failed to get user');
            }
        } catch (error) {
            console.error('Error getting user:', error);
        }
    };


    const handleInviteClick = () => {
        setUserData(handleGetUserByUsername(username))
        if(userData!=null) {
            handleAddMember(session.id);
            handleButtonClick();
        }

    };

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
                  <ToastContainer />
            <div className="bg-black p-8 rounded-md shadow-md grid h-[100%] w-[100%]">
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
                                value={sessionId}
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
                    <InputField label="Username" type={"text"} onChange={handleInputChange} value={username}></InputField>
                    <button>
                        <div className="text-l font-maven-pro leading-normal font-medium tracking-widest text-white bg-light-clr-20 p-2 text-white bg-light-clr-20 w-[10vw] mt-[8vh] ml-[18vw]" onClick={handleInviteClick}>
                            Invite
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );

}