import { useContext } from "react"
import { DrawingContext } from "./drawing.context"

const useDrawingContext = () => {
    const {
        startDrawing,
        handleDrawing,
        stopDrawing,
        restorePrevious,
        movesArray,
        setLineColor,
        lineColor,
        setLineWidth,
        lineWidth,
        applyBucket,
        bucketColor,
        setBucketColor,
    } = useContext(DrawingContext)

    return {
        startDrawing,
        handleDrawing,
        stopDrawing,
        restorePrevious,
        movesArray,
        setLineColor,
        lineColor,
        setLineWidth,
        lineWidth,
        applyBucket,
        bucketColor,
        setBucketColor,
    }
}

export default useDrawingContext