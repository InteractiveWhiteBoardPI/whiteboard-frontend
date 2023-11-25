import { BiZoomIn } from "react-icons/bi";
import { BiZoomOut } from "react-icons/bi";
import useDrawingContext from "../../context/whiteboard/drawing/useDrawingContext";
import { useEffect, useState } from "react";
import useWhiteboardContext from "../../context/whiteboard/whiteboard/useWhiteboardContext";

const ZOOM_LEVELS = [
    1,
    1.25,
    1.5,
    1.75,
    2
]

const ZoomSelector = () => {
    const {
        currentZoom,
        setCurrentZoom
    } = useWhiteboardContext()
    const [zoomLevel, setZoomLevel] = useState(0)
    const { canvas } = useWhiteboardContext()
    

    useEffect(
        () => {
            setCurrentZoom(ZOOM_LEVELS[zoomLevel])
        }, [zoomLevel]
    )

    const zoomIn = () => {
        if (zoomLevel !== 4) {
            const zoomFactor = ZOOM_LEVELS[zoomLevel + 1];
            canvas.style.scale = zoomFactor;
            canvas.style.transformOrigin = "top left"
            setZoomLevel(prev => prev + 1);
        }
    }
    const zoomOut = () => {
        if (zoomLevel !== 0) {
            const zoomFactor = ZOOM_LEVELS[zoomLevel - 1];
            canvas.style.scale = zoomFactor;
            setZoomLevel(prev => prev - 1)
        }
    }
    return (
        <div className="flex items-center bg-primary-dark rounded-full px-3 z-50 select-none">
            <BiZoomOut
                onClick={zoomOut}
                className="text-3xl hover:cursor-zoom-out" />
            <p className="px-4 text-base">{currentZoom*100}%</p>
            <BiZoomIn
                className="text-3xl hover:cursor-zoom-in"
                onClick={zoomIn} />
        </div>
    );
}

export default ZoomSelector;