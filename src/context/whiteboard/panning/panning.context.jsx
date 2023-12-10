import { createContext, useEffect, useState } from "react";
import useWhiteboardContext from "../whiteboard/useWhiteboardContext";

export const PanningContext = createContext({})

export const PanningProvider = ({ children }) => {
    const {
        context,
        boundaries,
        setToGrab,
        setToGrabbing,
        bucketColor,
        whiteboardData
    } = useWhiteboardContext()
    const [isDragging, setIsDragging,] = useState(false)
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const clearCanvas = () => {
        if (context) {
            context.fillStyle = bucketColor
            context.fillRect(0,0, boundaries.width,boundaries.height)
        }
    }
    useEffect(() => {
        if (context) {
            clearCanvas()
            const drawCanvas = () => {
                const image = new Image()
                image.src = whiteboardData.data
                image.onload = () => {
                    context.drawImage(image,-offset.x, -offset.y)
                }
            }
            drawCanvas()
        }
    }, [offset]);

    const getMousePosition = (event) => {
        return {
            x: event.clientX - boundaries?.left,
            y: event.clientY - boundaries?.top
        }
    }

    const startDragging = (e) => {
        const { x, y } = getMousePosition(e)
        setIsDragging(true)
        setToGrabbing()
        setStartPosition({ x, y })
    }

    const handleDragging = (e) => {
        if (isDragging) {
            const { x, y } = getMousePosition(e)
            const deltaX = x - startPosition.x;
            const deltaY = y - startPosition.y;
            setOffset({ x: offset.x - deltaX, y: offset.y - deltaY });
            setStartPosition({ x, y });
        }
    }

    const stopDragging = () => {
        setIsDragging(false);
        setToGrab()
    };

    const value = {
        startDragging,
        handleDragging,
        stopDragging,
        offset,
    }
    return <PanningContext.Provider value={value}>{children}</PanningContext.Provider>
}