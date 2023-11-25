import { createContext, useEffect, useState } from "react";
import useWhiteboardContext from "../whiteboard/useWhiteboardContext";

export const PanningContext = createContext({})

export const PanningProvider = ({ children }) => {
    const {
        context,
        boundaries,
        setToGrab,
        setToGrabbing,
        movesArray,
        setBucketColor
    } = useWhiteboardContext()
    const [isDragging, setIsDragging,] = useState(false)
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const clearCanvas = () => {
        if (context) {
            context.fillRect(0, 0, boundaries.width, boundaries.height)
        }
    }
    
    useEffect(() => {
        if (context) {
            const drawCanvas = () => {
                clearCanvas()
                for (let i = 0; i < movesArray.length; i++) {
                    const {positions, color, width, isBucket } = movesArray[i]
                    if(isBucket){
                        setBucketColor(color)
                        context.fillStyle = color
                        context.fillRect(0, 0, boundaries.width, boundaries.height)
                    } else {
                        for (let j = 1; j < positions.length; j++) {
                            context.beginPath();
                            context.moveTo(positions[j - 1].x - offset.x, positions[j - 1].y - offset.y)
                            context.lineWidth = width
                            context.strokeStyle = color
                            context.lineCap = 'round'
    
                            context.lineTo(positions[j].x - offset.x, positions[j].y - offset.y)
                            context.stroke();
                        }
                    }
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