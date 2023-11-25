import { createContext, useEffect, useState } from "react";

export const WhiteboardContext = createContext({})

export const CURSOR_MODES = {
    crosshair : "cursor-crosshair",
    hand : "cursor-grab",
    grabing: "cursor-grabbing",
}

export const WhiteboardProvider = ({toggleExpansion, children }) => {
    const [canvas, setCanvas] = useState(null)
    const [context, setContext] = useState(null)
    const [boundaries, setBoundaries] = useState(null)
    const [movesArray, setMovesArray] = useState([]);
    const [currentMode, setCurrentMode] = useState(CURSOR_MODES.crosshair)
    const [currentZoom , setCurrentZoom ] = useState(1)
    const [isBucket, setIsBucket ] = useState(false)
    const [bucketColor, setBucketColor ] = useState("#FFFFFF")
    
    useEffect(
        () => {
            setContext(canvas?.getContext('2d'))
            setBoundaries(canvas?.getBoundingClientRect())
            window.addEventListener("resize",
                () => setBoundaries(canvas?.getBoundingClientRect()))
        }, [canvas]
    )
    
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
        setBucketColor
    }

    return <WhiteboardContext.Provider value={value}>{children}</WhiteboardContext.Provider>
}
