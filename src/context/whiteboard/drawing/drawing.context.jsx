import { createContext, useEffect, useState } from "react";
import useWhiteboardContext from "../whiteboard/useWhiteboardContext";
import usePanningContext from "../panning/usePanningContext";

export const DrawingContext = createContext({})

export const DrawingProvider = ({ children }) => {
    const { context, boundaries, movesArray, setMovesArray, currentZoom, bucketColor, setBucketColor } = useWhiteboardContext()
    const { offset } = usePanningContext();
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [lineColor, setLineColor] = useState("#000000")
    const [lineWidth, setLineWidth] = useState(1)

    let currentArray = [];

    const getMousePosition = (event) => {
        return {
            x: (event.clientX - boundaries?.left) / currentZoom,
            y: (event.clientY - boundaries?.top) / currentZoom
        }
    }

    const clearCanvas = () => {
        if (context) {
            context.fillStyle = bucketColor
            context.fillRect(0,0, boundaries.width,boundaries.height)
        }
    }

    const applyBucket = () => {
        if(context) {
            setMovesArray([...movesArray, {
                isBucket : true,
                bkColor: bucketColor,
                color : null,
                positions : null , 
                width : null
            }])
            clearCanvas()
        }
    }

    const restorePrevious = () => {
        clearCanvas()
        for (let i = 0; i < movesArray.length - 1; i++) {
            const { positions, color, width, isBucket, bkColor } = movesArray[i]
            if(isBucket) {
                context.fillStyle = bkColor
                context.fillRect(0,0, boundaries.width,boundaries.height)
                setBucketColor(bkColor)
            } else {
                
                if(bkColor !== movesArray[i+1].bkColor){
                    
                    context.fillStyle = bkColor
                    context.fillRect(0,0, boundaries.width,boundaries.height)
                    setBucketColor(bkColor)
                }
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
        setMovesArray(prev => prev.filter((_, i) => i !== prev.length - 1))
    }

    const startDrawing = (e) => {
        setIsMouseDown(true)
        const { x, y } = getMousePosition(e)
        context.moveTo(x, y);
        context.beginPath();
        context.strokeStyle = lineColor
        context.lineWidth = lineWidth
        context.lineCap = 'round'
    }

    const handleDrawing = (e) => {
        if (isMouseDown) {
            const { x, y } = getMousePosition(e);
            context.lineTo(x, y);
            context.stroke();
            currentArray.push({ x: x + offset.x, y: y + offset.y });
        }
    }

    useEffect(() => {
        
    },[movesArray])

    const stopDrawing = () => {
        setIsMouseDown(false)
        context.closePath();
        setMovesArray([...movesArray, 
            { 
                positions: currentArray, 
                color: lineColor, 
                width : lineWidth, 
                bkColor: bucketColor,
                isBucket : false 
            }])
        currentArray = [];
    }

    const value = {
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
    return <DrawingContext.Provider value={value}>{children}</DrawingContext.Provider>
}