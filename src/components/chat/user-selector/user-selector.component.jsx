import { useEffect, useState } from "react";
import UseChatContext from "../../../context/chat/useChatContext";

const UserSelector = () => {
    const [users, setUsers] = useState([]);
    const [newUsers, setNewUsers] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [attemptedSearch, setAttemptedSearch] = useState(false);
    const { setChosenUser } = UseChatContext()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:8080/user/all");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const jsonData = await response.json();
                setUsers(jsonData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const filterUsers = () => {
            const filteredUsers = users.filter(
                (user) =>
                    user?.username?.toLowerCase().includes(searchText?.toLowerCase()) ||
                    user?.email?.toLowerCase().includes(searchText?.toLowerCase())
            );
            setNewUsers(filteredUsers);
        };

        filterUsers();
    }, [searchText, users]);

    const handleSearch = (event) => {
        setAttemptedSearch(true);
        setSearchText(event.target.value);
    };
    const handleChosenUser = (user) => {
        setChosenUser(user);
    };
    return (
        <div className="dropdown">
            <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={handleSearch}
                className="input input-bordered w-full max-w-xs"
            />
            <ul
                tabIndex="0"
                className="w-full ml-2 mr-2 mt-1 dropdown-content z-[1] menu p-2 shadow rounded-box bg-dark-clr-50"
            >
                {attemptedSearch &&
                    (newUsers?.length > 0 ? (
                        newUsers.map((user) => (
                            <div
                                className="bg-black bg-opacity-40 text-white rounded-xl mb-2 hover:bg-opacity-70 cursor-pointer"
                                key={user.uid}
                                onClick={handleChosenUser.bind(this, user)}
                            >
                                <li className="m-2">
                                    {user.username}
                                    <br />
                                    {user.email}
                                </li>
                            </div>
                        ))
                    ) : (
                        <div className="bg-black bg-opacity-40 text-white rounded-xl mb-2 hover:bg-opacity-70 cursor-pointer">
                            <li className="m-2">No user found</li>
                        </div>
                    ))}
            </ul>
        </div>
    );
}

export default UserSelector;