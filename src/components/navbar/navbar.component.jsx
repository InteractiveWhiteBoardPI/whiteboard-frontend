import { FaBell, FaRegBell } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import useUserContext from "../../context/user/useUserContext";
import { TbLogout2 } from "react-icons/tb";


const Navbar = () => {
    const { currentUser } = useUserContext();
    let imageUrl;
    if (currentUser && currentUser.imageByte) {
        imageUrl = `data:image/png;base64, ${currentUser.imageByte}`
        console.log("navbar : ",imageUrl)
    }

    const handleLogout = () => {
        localStorage.removeItem("uid");
        window.location.href = "/auth";
    }
    
    return (
        <div className="h-2/12 w-full flex justify-between items-center px-6 pt-4 pb-2">
            <h2 className="font-bold text-2xl  text-center text-white">
                Team Board
            </h2>
            <div className="flex items-center gap-4">
                <FaRegBell className="text-2xl"/>
                <TbLogout2 className="text-3xl hover:cursor-pointer hover:opacity-75" onClick={handleLogout}/>
                {currentUser.imageByte==null &&<IoPerson className="text-4xl"/>}
                {currentUser.imageByte!=null && <img 
                            src={imageUrl}
                            className="w-[3vw] h-[5.2vh] rounded-full"
                        />
                    }
            </div>
        </div>
    );
}

export default Navbar;