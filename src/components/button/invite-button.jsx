import React, {useRef} from "react";
import {useState} from "react";
import { toast } from 'react-toastify';
import InviteMenu from "./InviteMenu";
import useUserContext from "../../context/user/useUserContext";
import useSessionContext from "../../context/session/useSessionContext";

export default function InviteButton({ sessionId }) {
    const [showOptions, setShowOptions] = useState(false);

    const handleButtonClick = () => {
        setShowOptions(!showOptions);
    };


    return (
        <div>
            <button className="rounded-xl bg-black bg-opacity-50 h-[5vh] w-[6vw]" onClick={handleButtonClick}>
                <div className="text-l">
                    Invite
                </div>
            </button>

            {showOptions && (
                <InviteMenu sessionId={sessionId} handleButtonClick={handleButtonClick}></InviteMenu>
            )}
        </div>
    );
};

