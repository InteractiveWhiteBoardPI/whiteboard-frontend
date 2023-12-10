import React  from "react";
import {useState} from "react";

export default function InviteButton({ sessionId }) {
    const [showOptions, setShowOptions] = useState(false);

    const handleButtonClick = () => {
        setShowOptions(!showOptions);
    };

    const handleInviteClick = () => {
        console.log('Invite someone');
        setShowOptions(false);
    };

    const handleCopyLinkClick = () => {
        console.log('Copy link');
        setShowOptions(false);
    };

    return (
        <div>
            <button className="rounded-2xl bg-black bg-opacity-50 h-[5vh] w-[8vw]" onClick={handleButtonClick}>
                Invite
            </button>

            {showOptions && (
                <div className="fixed left-[40%] top-[35%] mr-auto w-[30vw] h-[30vh] bg-black bg-opacity-50 flex justify-center items-center;">
                    <div className="bg-white p-8 rounded-md shadow-md">
                        <button className="bg-red-500 text-white border-none p-2 cursor-pointer absolute top-2 right-2" onClick={() => setShowOptions(false)}>
                            X
                        </button>
                        <div>
                            <button className="mr-auto ml-auto rounded-2xl bg-black bg-opacity-85 h-[5vh] w-[8vw] mt-10" onClick={handleInviteClick}>
                                Invite
                            </button>
                            <div className="flex mt-5">
                                <div className="text-white rounded-2xl bg-black border-2 b-red">
                                    {sessionId}
                                </div>
                                <button className="rounded-2xl bg-black bg-opacity-85 h-[5vh] w-[8vw]" onClick={handleCopyLinkClick}>
                                    Copy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

