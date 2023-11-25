import { useState } from "react";
import Canvas from "../components/canvas/canvas.component";
import { DrawingProvider } from "../context/whiteboard/drawing/drawing.context";
import { PanningProvider } from "../context/whiteboard/panning/panning.context";
import { WhiteboardProvider } from "../context/whiteboard/whiteboard/whiteboard.context";
import { FaHome, FaPen } from "react-icons/fa";

const Whiteboard = () => {
    const [ whiteboardName , setWhiteBoardName ] = useState("Untitled")
    const [ showEditNameInput, setShowEditNameInput ] = useState(true)

    const [ isWhiteboardExpanded, setIsWhiteboardExpanded ] = useState(false)

    const toggleWhiteboardSize = () => setIsWhiteboardExpanded(prev => !prev)

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
        <div className={`bg-background-color w-screen h-screen  flex flex-col ${!isWhiteboardExpanded && "p-6"}`}>
            <div className={`bg-primary-dark flex items-center justify-between z-50 p-4 ${!isWhiteboardExpanded ? "rounded-full" : "shadow-2xl"}`}>
                <div className="flex items-center">
                    <h1 className="text-white text-xl font-semibold">TeamBoard</h1>
                    <div className="flex ml-6 text-white">
                        {
                            showEditNameInput ? (
                                <div>
                                    <input 
                                        className="border-b px-2" 
                                        value={whiteboardName}
                                        onChange={handleChange}/>
                                    <button 
                                        onClick={submitChange}
                                        className="text-xs mx-2 px-2 py-1 border rounded-lg cursor-pointer">SAVE</button>
                                </div>
                            ) : (
                                <div className="flex">
                                    <p className="mr-3">{whiteboardName}</p>
                                    <FaPen 
                                        onClick={showEditInput}
                                        className="text-sm cursor-pointer"/>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="text-2xl text-white mr-4">
                    <FaHome/>
                </div>
            </div>
            <WhiteboardProvider toggleExpansion={toggleWhiteboardSize}>
                <PanningProvider>
                    <DrawingProvider>
                        <Canvas
                            isExpanded={isWhiteboardExpanded}
                        />
                    </DrawingProvider>
                </PanningProvider>
            </WhiteboardProvider>
        </div>
    );
}

export default Whiteboard;