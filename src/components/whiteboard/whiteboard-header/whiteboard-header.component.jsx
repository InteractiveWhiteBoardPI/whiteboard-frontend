import { FaHome } from "react-icons/fa";
import WhiteboardNameEditor from "./whiteboard-name-editor.component";
import { Link } from "react-router-dom";

const WhiteboardHeader = ({ isWhiteboardExpanded }) => {

    return (
        <div className={`bg-dark-clr-50 flex items-center justify-between z-50 p-4 ${!isWhiteboardExpanded ? "rounded-full" : "shadow-2xl"}`}>
            <div className="flex items-center">
                <h1 className="text-white text-xl font-semibold">TeamBoard</h1>
                <WhiteboardNameEditor />
            </div>
            <div className="text-2xl text-white mr-4">
                <Link to="/home">
                    <FaHome />
                </Link>
            </div>
        </div>
    );
}

export default WhiteboardHeader;