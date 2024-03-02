
import { IoPerson } from "react-icons/io5";
import useUserContext from "../../context/user/useUserContext";
import { TbLogout2 } from "react-icons/tb";
import NotificationComponent from "../button/Notification";
import { useState, useEffect } from "react";
import socket from "../../utils/Socket";
import { useNavigate } from "react-router-dom";
import { signOutUser } from "../../utils/firebase-utils";

const Navbar = () => {
    const { currentUser } = useUserContext();
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(currentUser){
            socket.subscribe(`/user/${currentUser.uid}/notifications`, (message) => {
                const notification = JSON.parse(message.body);
                setNotifications(prevNotifications => [...prevNotifications, notification]);
            });
        }
    }, [currentUser]);

    const handleLogout = async () => {
        await signOutUser();
        navigate("/auth");
    }
    
    return (
        <div className="h-2/12 w-full flex justify-between items-center px-6 pt-4 pb-2">
            <h2 className="font-bold text-2xl  text-center text-white cursor-pointer" onClick={navigate.bind(null,"/home")}>
                Team Board
            </h2>
            <div className="flex items-center gap-4">
                <NotificationComponent notifications={notifications}/>
                
                <TbLogout2 className="text-3xl hover:cursor-pointer hover:opacity-75" onClick={handleLogout}/>
                <div onClick={navigate.bind(null,"/home/profile")} className="cursor-pointer">
                    {
                        currentUser?.imageByte ? (
                            <img 
                                src={currentUser.imageByte}
                                className="w-12 h-12 rounded-full"
                            />
                        ) : (
                            <IoPerson className="text-4xl"/>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Navbar;