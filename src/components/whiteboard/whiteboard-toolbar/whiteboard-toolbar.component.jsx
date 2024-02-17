import { PiArrowCounterClockwiseBold, PiRectangleLight } from "react-icons/pi";
import { FaExpand, FaChevronDown, FaChevronUp ,FaPen } from "react-icons/fa";
import { BsCursorFill } from "react-icons/bs";
import { TfiText } from "react-icons/tfi";
import { LuPaintBucket } from "react-icons/lu";
import ZoomSelector from "../zoom-selector/zoom-selector.component";
import useDrawingContext from "../../../context/whiteboard/drawing/useDrawingContext";
import useWhiteboardContext from "../../../context/whiteboard/whiteboard/useWhiteboardContext";
import { CURSOR_MODES } from "../../../context/whiteboard/whiteboard/whiteboard.context";
import LineEditor from "../line-editor/line-editor.component";
import { useState } from "react";
import ColorPicker from "../color-picker/color-picker.component";

const WhiteboardToolbar = () => {
    const [showLineEditor, setShowLineEditor] = useState(false)
    const [showBucket, setShowBucket] = useState(false)

    const { restorePrevious , bucketColor, setBucketColor } = useDrawingContext()
    const { 
        toggleExpansion, 
        currentMode,
        setToDrawing,
        setToGrab,
        setToBucket, isBucket } = useWhiteboardContext()

    const toggleShowLineEditor = () => {
        setShowBucket(false)
        setShowLineEditor(prev => !prev)
    }
    const togggleShowBucket = () => {
        setToBucket()
        setShowLineEditor(false)
        setShowBucket(prev => !prev)
    }

    return (
        <div className="absolute w-full p-4 bottom-0 flex justify-between text-white text-xl">
            <div className="bg-dark-clr-50 rounded-full p-3 z-50">
                <FaExpand className="cursor-pointer" onClick={toggleExpansion}/>
            </div>
            <div className="bg-dark-clr-50 rounded-full z-50 flex w-1/4 justify-between items-center px-3">
                <PiArrowCounterClockwiseBold className="cursor-pointer" onClick={restorePrevious}/>
                <BsCursorFill 
                    onClick={setToGrab}
                    className={`cursor-pointer ${!isBucket&&[CURSOR_MODES.hand,CURSOR_MODES.grabing].includes(currentMode) && "text-selected"}`}
                    />
                <div 
                    className={`flex items-center ${!isBucket&&currentMode=== CURSOR_MODES.crosshair && "text-selected"}`} 
                    onClick={setToDrawing}>
                    <FaPen className="cursor-pointer" onClick={toggleShowLineEditor}/>
                    {
                        showLineEditor ? (
                            <>
                                <FaChevronDown className="text-sm cursor-pointer"/>
                                <LineEditor />
                            </>
                        ) : (
                            <FaChevronUp className="text-sm cursor-pointer"/>
                        )
                    }
                </div>
                <div className="relative">
                    <LuPaintBucket 
                        onClick={togggleShowBucket} 
                        className={`cursor-pointer ${isBucket && "text-selected"}`}/>
                    {
                        showBucket && (
                            <ColorPicker 
                                color={bucketColor}
                                setColor={setBucketColor}
                                className="absolute top-0 -translate-y-[120%] translate-x-5"/>
                        )
                    }
                </div>
                <TfiText />
                <div className="flex items-center">
                    <PiRectangleLight className="text-2xl cursor-pointer" />
                    <FaChevronDown className="text-sm cursor-pointer" />
                </div>
            </div>
            <ZoomSelector
            />
        </div>
    );
}

export default WhiteboardToolbar;