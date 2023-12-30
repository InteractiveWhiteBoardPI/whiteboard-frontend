import { createContext, useEffect, useState } from "react";
import useUserContext from "../../user/useUserContext";

export const WhiteboardContext = createContext({})

export const CURSOR_MODES = {
    crosshair : "cursor-crosshair",
    hand : "cursor-grab",
    grabing: "cursor-grabbing",
}

export const WhiteboardProvider = ({ toggleExpansion, whiteboardData, setWhiteboardData ,children }) => {
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
            if(context && whiteboardData){
                const image = new Image()
                image.src = whiteboardData.data

                image.onload = () => {
                    context.drawImage(image, 0, 0)
                }
            }
        }, [whiteboardData, context]
    )

    useEffect(
        () => {
            if(canvas){
                const data = canvas?.toDataURL()
                setWhiteboardData(prev => ({
                    ...prev,
                    data,
                    lastModified:  new Date().toISOString().split("T")[0],
    
                }))
            }
        } , [ movesArray ]
    )

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
    }

    return <WhiteboardContext.Provider value={value}>{children}</WhiteboardContext.Provider>
}
