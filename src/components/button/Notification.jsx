import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useUserContext from "../../context/user/useUserContext";

export default function NotificationComponent(props) {
    const [usernames, setUsernames] = useState({});
    const navigate = useNavigate();
    const { currentUser } = useUserContext()

    const getUser = async (uid) => {
        const response = await fetch(`http://localhost:8080/user/get/${uid}`, {
        method: 'GET',
        mode:'cors',
        headers: {
            'Content-Type': 'application/json'
        }
        });

        if (response.ok) {
            const userData = await response.json();
            return userData.username;
        } else{
            return "not found"
        }
    };

    const handleRedirect = async(url) => {
        const response = await fetch(`http://localhost:8080/session/join/${url}`,{
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(currentUser)
        })
        if(response.status === 201) {
            navigate("/session/"+url)
        } else {
            console.log("Could not join session")
        }
    }

    useEffect(() => {
        const fetchUsernames = async () => {
            const newNames = {};
            for (const notification of props.notifications) {
                newNames[notification.from] = await getUser(notification.from);
            }
            setUsernames(newNames);
        };

        fetchUsernames();
    }, [props.notifications]);

    return(
        <div className="rounded-[8px] fixed left-[75vw] top-[13vh] mr-auto w-[20vw] h-[40vh] z-20 bg-black bg-opacity-50 flex justify-center items-center overflow-x-hidden overflow-y-scroll">        
            <div className="bg-black p-8 rounded-md shadow-md grid h-[100%] w-[100%]">
                <button className="bg-red-500 text-black border-none p-2 cursor-pointer absolute top-2 right-2" onClick={props.handleButtonClick}>
                    X
                </button>
                <div >
                {props.notifications.map((notification, index) => (
                    <div key={index} className="inline-block mt-5 ml-[-1.5vw] w-[20vw]">
                        <div className="bg-gray-800 border-t-b border-gray-500 p-2 inline-block cursor-pointer" onClick={() => handleRedirect(notification.url)}>you have invitation to a session from: <p className="text-semi text-blue-700">{usernames[notification.from]}</p></div>
                    </div>
                ))}
            </div>
            </div>
            
        </div>
    )
}