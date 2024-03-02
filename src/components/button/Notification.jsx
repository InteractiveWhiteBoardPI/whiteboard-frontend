import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useUserContext from "../../context/user/useUserContext";
import { FaBell, FaRegBell } from "react-icons/fa";

export default function NotificationComponent({ notifications }) {
    const [usernames, setUsernames] = useState({});
    const navigate = useNavigate();
    const { currentUser } = useUserContext()

    const getUser = async (uid) => {
        const response = await fetch(`http://localhost:8080/user/get/${uid}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const userData = await response.json();
            return userData.username;
        } else {
            return "not found"
        }
    };

    const handleRedirect = async (url) => {
        const response = await fetch(`http://localhost:8080/session/join/${url}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentUser)
        })
        if (response.status === 201) {
            navigate("/session/" + url)
        } else {
            console.log("Could not join session")
        }
    }

    useEffect(() => {
        const fetchUsernames = async () => {
            const newNames = {};
            for (const notification of notifications) {
                newNames[notification.from] = await getUser(notification.from);
            }
            setUsernames(newNames);
        };

        fetchUsernames();
    }, [notifications]);

    return (
        <div className="dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0} role="button">
                <FaRegBell className="text-2xl hover:cursor-pointer hover:opacity-75" />
            </div>
            <div tabIndex={0} className="dropdown-content z-[1] rounded-lg bg-dark-clr-50 overflow-y-scroll w-max">
                {
                    notifications.length === 0 ? <div className="text-center text-white p-2">No new notifications</div> :
                    notifications.map((notification, index) => (
                        <div key={index} className="flex">
                            <div
                                className="p-2 cursor-pointer"
                                onClick={handleRedirect.bind(null,notification.url)}
                            >
                                You have invitation to a session from:
                                <span className="text-semi text-selected ml-2">{usernames[notification.from]}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}