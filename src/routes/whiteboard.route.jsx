import { useState } from "react";
import Canvas from "../components/whiteboard/canvas/canvas.component";
import { DrawingProvider } from "../context/whiteboard/drawing/drawing.context";
import { PanningProvider } from "../context/whiteboard/panning/panning.context";
import { WhiteboardProvider } from "../context/whiteboard/whiteboard/whiteboard.context";
import WhiteboardHeader from "../components/whiteboard/whiteboard-header/whiteboard-header.component";


const Whiteboard = () => {


    const [isWhiteboardExpanded, setIsWhiteboardExpanded] = useState(false)

    const toggleWhiteboardSize = () => setIsWhiteboardExpanded(prev => !prev)



    return (
        <div className={`w-screen h-screen  flex flex-col ${!isWhiteboardExpanded && "p-6"}`}>
            <WhiteboardHeader isWhiteboardExpanded={isWhiteboardExpanded}/>
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