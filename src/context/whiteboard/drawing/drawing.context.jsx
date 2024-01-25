import { createContext, useEffect, useState } from "react";
import useWhiteboardContext from "../whiteboard/useWhiteboardContext";
import useUserContext from "../../user/useUserContext";
import useSessionContext from "../../session/useSessionContext";
import { v4 as UUID } from "uuid";
import socket from "../../../utils/Socket";
export const DrawingContext = createContext({})

export const DrawingProvider = ({ children }) => {
    const {
        context,
        boundaries,
        movesArray,
        setMovesArray,
        currentZoom,
        bucketColor,
        setBucketColor,
        offset,
    } = useWhiteboardContext()
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [lineColor, setLineColor] = useState("#000000")
    const [lineWidth, setLineWidth] = useState(1)
    const { currentUser } = useUserContext()
    const { session } = useSessionContext()


    useEffect(
        () => {
            socket.connect()
        }, [socket.connected]
    )

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
            context.fillRect(0, 0, boundaries.width, boundaries.height)
        }
    }

    const applyBucket = (isInteractive) => {
        if (context) {
            const lineId = UUID()
            setMovesArray([...movesArray, {
                id : lineId,
                isBucket: true,
                bkColor: bucketColor,
                color: null,
                positions: null,
                width: null
            }])
            if(isInteractive) {
                socket.send("/app/whiteboard/draw", JSON.stringify(
                    {
                        bucket: true,
                        bkColor: bucketColor,
                        color: "",
                        positions: [],
                        width: 0,
                        session,
                        lineOffset: offset,
                        id: lineId
                    }
                ))
            }
            clearCanvas()
        }
    }

    const restorePrevious = (isInteractive) => {
        if(movesArray.length === 0) return
        if(isInteractive) {
            socket.send("/app/whiteboard/prev", JSON.stringify({
                ...movesArray[movesArray.length - 1],
                session,
                user: currentUser,
            }))
        } else {
            setMovesArray(prev => prev.filter((_, i) => i !== prev.length - 1))
        }
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

    const stopDrawing = (isInteractive) => {
        setIsMouseDown(false)
        context.closePath();
        const lineId = UUID()
        setMovesArray([...movesArray, {
            id: lineId,
            positions: currentArray,
            color: lineColor,
            width: lineWidth,
            bkColor: bucketColor,
            isBucket: false
        }])
        if (isInteractive) {
            socket.send("/app/whiteboard/draw", JSON.stringify(
                {
                    positions: currentArray,
                    color: lineColor,
                    width: lineWidth,
                    bkColor: bucketColor,
                    bucket: false,
                    session,
                    lineOffset: offset,
                    id: lineId
                }
            ))
        }
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