import { useContext } from "react"
import { WhiteboardContext } from "./whiteboard.context"

const useWhiteboardContext = () => {
    const {
        canvas,
        setCanvas,
        context,
        boundaries,
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
        setWhiteboardName
    } = useContext(WhiteboardContext)

    return {
        canvas,
        setCanvas,
        context,
        boundaries,
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
        setWhiteboardName
    }
}

export default useWhiteboardContext