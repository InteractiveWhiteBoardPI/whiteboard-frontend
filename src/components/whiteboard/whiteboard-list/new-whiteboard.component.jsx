import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useUserContext from "../../../context/user/useUserContext"
const NewWhiteboard = () => {
    const navigate = useNavigate()
    const { currentUser } = useUserContext()
    const handleClick = async  () => {
        const response = await fetch("http://localhost:8080/whiteboard/save",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                data: "",
                name: "Untitled",
                lastModified: new Date().toISOString().split("T")[0],
                owner : currentUser
            })
        })

        const json = await response.json()

        if(json.id){
            navigate("/whiteboard/" + json.id)
        }

    }
    return ( 
        <div 
            onClick={handleClick}
            className="cursor-pointer transition duration-300 hover:bg-selected flex-none w-[24%] rounded-3xl flex justify-center items-center bg-white">
            <FaPlus className="text-6xl text-black"/>
        </div>
     );
}
 
export default NewWhiteboard;