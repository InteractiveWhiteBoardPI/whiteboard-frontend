import { useContext } from "react"
import { WhiteboardContext } from "./whiteboard.context"

const useWhiteboardContext = () => {
    const {
        canvas,
        setCanvas,
        context,
        boundaries,
        isExpanded,
        toggleExpansion,
        currentMode,
        setToDrawing,
        setToGrab,
        setToGrabbing,
        movesArray, 
        setMovesArray,
        currentZoom, 
        setCurrentZoom,
        setToBucket,
        isBucket,
        bucketColor, 
        setBucketColor,
        whiteboardData,
        setWhiteboardData,
        setWhiteboardName,
        drawCanvas,
        offset, 
        setOffset,

    } = useContext(WhiteboardContext)

    return {
        canvas,
        setCanvas,
        context,
        boundaries,
        isExpanded,
        toggleExpansion,
        currentMode,
        setToDrawing,
        setToGrab,
        setToGrabbing,
        movesArray, 
        setMovesArray,
        currentZoom, 
        setCurrentZoom,
        setToBucket,
        isBucket,
        bucketColor,
        setBucketColor,
        whiteboardData,
        setWhiteboardData,
        setWhiteboardName,
        drawCanvas,
        offset, 
        setOffset,
    }
}

export default useWhiteboardContext