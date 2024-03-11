import { createContext, useEffect, useState } from "react";

export const WhiteboardContext = createContext({})

export const CURSOR_MODES = {
    crosshair: "cursor-crosshair",
    hand: "cursor-grab",
    grabing: "cursor-grabbing",
}

export const WhiteboardProvider = ({ children }) => {
    const [whiteboardData, setWhiteboardData] = useState(null)
    const [isExpanded, setIsExpanded] = useState(false)
    const [canvas, setCanvas] = useState(null)
    const [context, setContext] = useState(null)
    const [boundaries, setBoundaries] = useState(null)
    const [movesArray, setMovesArray] = useState([]);
    const [currentMode, setCurrentMode] = useState(CURSOR_MODES.crosshair)
    const [currentZoom, setCurrentZoom] = useState(1)
    const [isBucket, setIsBucket] = useState(false)
    const [bucketColor, setBucketColor] = useState("#FFFFFF")
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const toggleExpansion = () => {
        setIsExpanded(prev => !prev)
    }

    useEffect(
        () => {
            if (whiteboardData) {
                const data = whiteboardData.data
                if (data === "") {
                    setMovesArray([])
                    return
                }
                const decodedData = JSON.parse(atob(data))
                if (decodedData.length !== movesArray.length) {
                    setMovesArray([...decodedData])
                }
            } else {
                setMovesArray([])
            }
        }, [whiteboardData]
    )
    useEffect(
        () => {
            if (!canvas) return
            const data = new TextEncoder().encode(JSON.stringify(movesArray))

            setWhiteboardData(prev => ({
                ...prev,
                data: btoa(String.fromCharCode.apply(null, data)),
                lastModified: new Date().toISOString().split("T")[0],
            }));

            drawCanvas()
        }, [movesArray]
    )

    useEffect(
        () => {
            if (!context) return
            drawCanvas()
        }, [movesArray, context]
    )

    useEffect(
        () => {
            setContext(canvas?.getContext('2d'))
            setBoundaries(canvas?.getBoundingClientRect())
            window.addEventListener("resize",
                () => setBoundaries(canvas?.getBoundingClientRect()))
        }, [canvas]
    )

    const clearCanvas = () => {
        if (context) {
            context.fillStyle = bucketColor
            context.fillRect(0, 0, boundaries.width, boundaries.height)
        }
    }

    const drawCanvas = () => {
        clearCanvas()
        if (!context) return
        for (let i = 0; i < movesArray.length; i++) {
            const { positions, color, width, isBucket, bkColor } = movesArray[i]
            if (isBucket) {
                context.fillStyle = bkColor
                context.fillRect(0, 0, boundaries.width, boundaries.height)
                setBucketColor(bkColor)
            } else {
                if (movesArray[i + 1] && bkColor !== movesArray[i + 1].bkColor) {
                    context.fillStyle = bkColor
                    context.fillRect(0, 0, boundaries.width, boundaries.height)
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
    }

    const setToDrawing = () => {
        setIsBucket(false)
        setCurrentMode(CURSOR_MODES.crosshair)
    }
    const setToGrab = () => {
        setIsBucket(false)
        setCurrentMode(CURSOR_MODES.hand)
    }
    const setToGrabbing = () => {
        setIsBucket(false)
        setCurrentMode(CURSOR_MODES.grabing)
    }
    const setToBucket = () => {
        setIsBucket(true)
        setCurrentMode(CURSOR_MODES.crosshair)
    }

    const setWhiteboardName = (name) => {
        setWhiteboardData(prev => ({
            ...prev,
            name
        }))
    }

    const value = {
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
        setWhiteboardName,
        drawCanvas,
        offset,
        setOffset,
        isExpanded,
        setWhiteboardData,
    }

    return <WhiteboardContext.Provider value={value}>{children}</WhiteboardContext.Provider>
}
