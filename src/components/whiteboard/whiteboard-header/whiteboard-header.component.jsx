import { FaHome, FaPen } from "react-icons/fa";
import { useState } from "react";

const WhiteboardHeader = ({isWhiteboardExpanded}) => {
    const [ whiteboardName , setWhiteBoardName ] = useState("Untitled")
    const [ showEditNameInput, setShowEditNameInput ] = useState(false)
    const handleChange = (e) => {
        setWhiteBoardName(e.target.value)
    }
    

    const showEditInput = () => setShowEditNameInput(true)

    const submitChange = () => {
        if(whiteboardName === ""){
            setWhiteBoardName("Untitled")
        }
        setShowEditNameInput(false)
    }
    return (
        <div className={`bg-dark-clr-50 flex items-center justify-between z-50 p-4 ${!isWhiteboardExpanded ? "rounded-full" : "shadow-2xl"}`}>
            <div className="flex items-center">
                <h1 className="text-white text-xl font-semibold">TeamBoard</h1>
                <div className="flex ml-6 text-white">
                    {
                        showEditNameInput ? (
                            <div>
                                <input
                                    className="bg-transparent border-white border-b focus:outline-none px-2"
                                    value={whiteboardName}
                                    onChange={handleChange} />
                                <button
                                    onClick={submitChange}
                                    className="text-xs mx-2 px-2 py-1 border rounded-lg cursor-pointer">SAVE</button>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <p className="mr-3">{whiteboardName}</p>
                                <FaPen
                                    onClick={showEditInput}
                                    className="text-sm cursor-pointer" />
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="text-2xl text-white mr-4">
                <FaHome />
            </div>
        </div>
    );
}

export default WhiteboardHeader;