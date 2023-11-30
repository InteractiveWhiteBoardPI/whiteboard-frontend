import { useContext } from "react"
import { PanningContext } from "./panning.context"

const usePanningContext = () => {
    const {
        startDragging,
        handleDragging,
        stopDragging,
        offset
    } = useContext(PanningContext)

    return {
        startDragging,
        handleDragging,
        stopDragging,
        offset
    }
}

export default usePanningContext