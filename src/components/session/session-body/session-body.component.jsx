import CallSection from "../call-section/call-section.component"
import SessionMenu from "../session-menu/session-menu.component";
import useUserContext from "../../../context/user/useUserContext";
import useSessionContext from "../../../context/session/useSessionContext";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";


const SessionBody = () => {
    let navigate = useNavigate();
    const { currentUser } = useUserContext();
    const { currentSession } = useSessionContext();

    const handleAddMember = async (sessionId) => {
        const member = { currentUser };

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

    if (currentSession && currentSession.members && !currentSession.members.includes(currentUser)) {
        handleAddMember(currentSession.id);
    }

    return (
        <div className="h-5/6 w-[90%] rounded-2xl flex bg-dark-clr-70 justify-between">
            <CallSection />
            <SessionMenu />
        </div>
    );
}

export default SessionBody;
