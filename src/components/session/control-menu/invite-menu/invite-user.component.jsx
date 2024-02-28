import { useEffect, useState } from "react";
import Button from "../../../button/button.component"
import useUserContext from "../../../../context/user/useUserContext";
import useSessionContext from "../../../../context/session/useSessionContext";
import { RxAvatar } from "react-icons/rx";
import socket from "../../../../utils/Socket";
const InviteUser = ({modalState}) => {
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const { currentUser } = useUserContext()
    const { session } = useSessionContext()
    const [selectedUser, setSelectedUser] = useState(null)
    const [inputValue , setInputValue] = useState("")
    const [showInvitMessage, setShowInviteMessage] = useState(false)


    useEffect(
        () => {
            if(!modalState) {
                setInputValue("")
                setSelectedUser(null)
            }
        }, [modalState]
    )
    useEffect(
        () => {
            if(!currentUser) return
            const fetchUsers = async () => {
                const response = await fetch("http://localhost:8080/user/all")
                const data = await response.json()
                setUsers(data.filter(user => user.uid !== currentUser.uid))
            }
            fetchUsers()
        }, [currentUser]
    )

    useEffect(
        () => {
            if(inputValue === "") {
                setFilteredUsers(users)
                return
            }
            setFilteredUsers(users.filter(user => user.username.toLowerCase().includes(inputValue) || user.email.includes(inputValue)))
        }, [users, inputValue]
    )

    const handleUserSelect = (user) => {
        setSelectedUser(user)
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleInvite = () => {
        if(selectedUser === null) return
        const notification = {
            from: currentUser.uid,
            to: selectedUser.uid,
            url: session.uid,
        };
        socket.send("/app/notification/notify-user", JSON.stringify(notification))
        setShowInviteMessage(true)

        setTimeout(() => {
            setShowInviteMessage(false)
        }, 2000)

    }


    return ( 
        <div className="flex flex-col items-center text-base">
            <button onClick={handleInvite} className="border border-white w-max p-2 rounded-t-lg transition duration-500 hover:bg-light-clr-40 border-b-0">Invite user</button>
            <div className="w-full border border-white rounded-lg">
                <input type="text" placeholder="Enter email or username" onChange={handleInputChange} className="w-full p-2 bg-transparent focus:outline-none focus:border-b border-white"/>
                {
                    showInvitMessage && (
                        <div className="text-green-400 text-sm text-center">Invitation sent</div>
                    )
                }
                <div className="w-full px-2">
                    <label className="text-light-clr-60 text-sm mb-2">Suggestions</label>
                    <div className="overflow-scroll max-h-[300px]">
                        {
                            filteredUsers.map(user => (
                                <div 
                                    key={user.uid} 
                                    onClick={handleUserSelect.bind(this,user)} 
                                    className={`flex p-2 border-b transition duration-300 border-light-clr-40 cursor-pointer ${selectedUser?.uid === user.uid ? 'bg-selected' : 'hover:bg-light-clr-30'}`}>
                                    <div className="pr-3">
                                        {
                                            user.imageByte ? (
                                                <img src={`data:image/png;base64,${user.imageByte}`} className="w-12 h-12 rounded-full" alt="user"/>
                                            ) : (
                                                <RxAvatar className="text-5xl"/>
                                            )
                                        }
                                    </div>
                                    <div>
                                        <div>{user.username}</div>
                                        <div>{user.email}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default InviteUser