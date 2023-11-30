import { FaBell, FaRegBell } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
const Navbar = () => {
    return (
        <div className="h-2/12 w-full flex justify-between items-center px-6 pt-4 pb-2">
            <h2 className="font-bold text-2xl  text-center text-white">
                Team Board
            </h2>
            <div className="flex items-center gap-4">
                <FaRegBell className="text-2xl"/>
                <IoPerson className="text-4xl"/>
            </div>
        </div>
    );
}

export default Navbar;