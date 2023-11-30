import { useEffect, useRef } from "react";
import WhiteboardToolbar from "../whiteboard-toolbar/whiteboard-toolbar.component"
import useDrawingContext from "../../../context/whiteboard/drawing/useDrawingContext";
import useWhiteboardContext from "../../../context/whiteboard/whiteboard/useWhiteboardContext";
import usePanningContext from "../../../context/whiteboard/panning/usePanningContext";
import { CURSOR_MODES } from "../../../context/whiteboard/whiteboard/whiteboard.context";

const Canvas = ({ toggleExpansion, isExpanded }) => {
    const canvas = useRef()
    const { 
        setCanvas,
        boundaries,
        currentMode,
        isBucket
    } = useWhiteboardContext()
    const { 
        startDrawing, 
        handleDrawing, 
        stopDrawing,
        applyBucket
    } = useDrawingContext()
    const {
        startDragging,
        handleDragging,
        stopDragging,
    } = usePanningContext()
    useEffect(() => {
        if(canvas?.current){
            setCanvas(canvas.current)
        }
    }, [])
    
    const handleMouseDown = (e) => {
        if(isBucket) {
            applyBucket()
            return
        }
        if(currentMode === CURSOR_MODES.crosshair) {
            startDrawing(e)
        } else {
            startDragging(e)
        }
    };

    const handleMouseMove = (e) => {
        if(isBucket) return
        if(currentMode === CURSOR_MODES.crosshair) {
            handleDrawing(e)  
        } else {
            handleDragging(e)
        }
    };

    const handleMouseUp = () => {
        if(isBucket) return
        if(currentMode === CURSOR_MODES.crosshair) {
            stopDrawing() 
        } else {
            stopDragging()
        }
    };

    return (
        <div className={`relative border w-full h-full overflow-hidden origin-top-right ${!isExpanded && "my-4 rounded-2xl"} ${currentMode}`}>
            <WhiteboardToolbar
                toggleExpansion={toggleExpansion}
            />
            <canvas
                width={boundaries?.width}
                height={boundaries?.height}
                ref={canvas}
                className={`absolute w-full h-full bg-white`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            ></canvas>
        </div>
    );
}

export default Canvas;