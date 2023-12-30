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
        sessionIdRef.current.setSelectionRange(0, 99999);

        document.execCommand('copy');

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
                <InviteButton></InviteButton>
            )}
        </div>
    );
};

