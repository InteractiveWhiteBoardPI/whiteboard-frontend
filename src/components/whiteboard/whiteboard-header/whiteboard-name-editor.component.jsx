import { FaPen } from "react-icons/fa";
import { useState } from "react";
import useWhiteboardContext from "../../../context/whiteboard/whiteboard/useWhiteboardContext";
const WhiteboardNameEditor = () => {
    const { setWhiteboardName } = useWhiteboardContext()
    const [name, setName] = useState("Untitled")
    const [showEditNameInput, setShowEditNameInput] = useState(false)

    const handleChange = (e) => {
        setName(e.target.value)
    }

    const showEditInput = () => setShowEditNameInput(true)

    const submitChange = () => {
        if (name === "") {
            setName("Untitled")
        }

        setWhiteboardName(name)
        setShowEditNameInput(false)
    }

    return (
        <div className="flex ml-6 text-white">
        {
            showEditNameInput ? (
                <div>
                    <input
                        className="bg-transparent border-white border-b focus:outline-none px-2"
                        value={name}
                        onChange={handleChange} />
                    <button
                        onClick={submitChange}
                        className="text-xs mx-2 px-2 py-1 border rounded-lg cursor-pointer">SAVE</button>
                </div>
            ) : (
                <div className="flex items-center">
                    <p className="mr-3">{name}</p>
                    <FaPen
                        onClick={showEditInput}
                        className="text-sm cursor-pointer" />
                </div>
            )
        }
    </div>
    );
}

export default WhiteboardNameEditor;