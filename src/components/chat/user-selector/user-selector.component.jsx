import { useEffect, useState } from "react";
import UseChatContext from "../../../context/chat/useChatContext";
import useUserContext from "../../../context/user/useUserContext";
import InputField from "../../input-field/input-field.component";

const UserSelector = ({onUserSelect}) => {
    const [users, setUsers] = useState([]);
    const [newUsers, setNewUsers] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [attemptedSearch, setAttemptedSearch] = useState(false);
    const { setChosenUser } = UseChatContext()
    const {currentUser} = useUserContext();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:8080/user/all");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const jsonData = await response.json();
                setUsers(jsonData.filter((user) => (
                    user.uid!=currentUser.uid
                )));
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
        setAttemptedSearch(false);
        setSearchText(user.username);
        if(onUserSelect){
            onUserSelect(user.uid, user.username);
        }
    };
    return (
        <div className="flex dropdown justify-center ">
            <div className="gap-8 bg-gradient-to-br from-light-clr-30 to-light-clr-10 w-full">
                <InputField label={"Search a new user..."} value={searchText} onChange={handleSearch} type={"text"} className={""} />
            </div>
            <ul
                tabIndex="0"
                className="w-full mt-[33px] dropdown-content z-[1] menu p-2 shadow rounded bg-dark-clr-50"
            >
                {attemptedSearch &&
                    (newUsers?.length > 0 ? (
                        newUsers.map((user) => (
                            <div
                                className="bg-black bg-opacity-40 text-white rounded mb-2 hover:bg-opacity-70 cursor-pointer"
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
                        <div className="bg-black bg-opacity-40 text-white rounded mb-2  hover:bg-opacity-70 cursor-pointer">
                            <li className="m-2">No user found</li>
                        </div>
                    ))}
            </ul>
        </div>
    );
}

export default UserSelector;