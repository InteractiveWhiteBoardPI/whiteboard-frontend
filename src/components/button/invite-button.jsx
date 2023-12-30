import React, {useRef} from "react";
import {useState} from "react";
import { toast } from 'react-toastify';

export default function InviteButton({ sessionId }) {
    const [showOptions, setShowOptions] = useState(false);
    const [session,setSession] = useState({sessionId})
    const [copySuccess, setCopySuccess] = useState(false);
    const sessionIdRef = useRef(null);
    const handleButtonClick = () => {
        setShowOptions(!showOptions);
    };


    const handleInviteClick = () => {
        toast("Hello!");
        setShowOptions(false);
    };

    const handleCopyLinkClick = () => {
        sessionIdRef.current.select();
        sessionIdRef.current.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text to the clipboard
        document.execCommand('copy');

        // Set the copy success state and reset it after a short delay
        setCopySuccess(true);
        setTimeout(() => {
            setCopySuccess(false);
        }, 1500);
    };

    return (
        <div>
            <button className="rounded-xl bg-black bg-opacity-50 h-[5vh] w-[6vw]" onClick={handleButtonClick}>
                <div className="text-l">
                    Invite
                </div>
            </button>

            {showOptions && (
                <div className="rounded-[8px] fixed left-[25vw] top-[15vh] mr-auto w-[50vw] h-[70vh] z-20 bg-black bg-opacity-50 flex justify-center items-center;">
                    <div className="bg-black p-8 rounded-md shadow-md grid h-[100%] w-[100%]">
                        <button className="bg-red-500 text-black border-none p-2 cursor-pointer absolute top-2 right-2" onClick={() => setShowOptions(false)}>
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
                                        className="border-none outline-none bg-transparent w-[25vw] no-selection"
                                        ref={sessionIdRef}
                                    />
                                </div>
                                <button
                                    className="rounded-2xl border-white text-white border font-maven-pro mt-[-0.5vh] bg-opacity-85 h-[5.5vh] w-[11vw] ml-auto"
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
                            <div className="flex-col w-[100%]">
                                <div className="font-maven-pro text-[18px] text-white font-medium leading-normal">
                                    Username
                                </div>
                                <input className="pl-2 border border-white rounded-l bg-black mt-[2vh]"/>
                            </div>
                            <button>
                                <div className="text-l font-maven-pro leading-normal font-medium border border-white w-[10vw] mt-[8vh] ml-[18vw]" onClick={handleInviteClick}>
                                    Invite
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

