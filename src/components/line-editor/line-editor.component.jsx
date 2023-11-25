import useDrawingContext from "../../context/whiteboard/drawing/useDrawingContext";
import ColorPicker from "../color-picker/color-picker.component";
import { useState } from "react";
const ColorButton = ({ color, setColor }) => {
    const onClick = () => setColor(color)
    return <span 
        className="w-6 h-6 rounded-full cursor-pointer"
        style={{backgroundColor : color}} 
        onClick={onClick}></span>
}

const LineEditor = () => {
    const [ showColorPicker, setShowColorPicker ] = useState(false)
    const { 
        lineWidth,
        lineColor,
        setLineWidth, 
        setLineColor 
    } = useDrawingContext()

    const toggleShowColorPicker = () => setShowColorPicker(prev => !prev)

    const handleChange = (e) => {
        setLineWidth(parseInt(e.target.value))
    }

    return (
        <div className="absolute top-0 translate-x-6 -translate-y-5 bg-primary-dark rounded-full px-3 py-1 flex items-center">
            <div className="flex gap-2">
                <ColorButton color={"#000000"} setColor={setLineColor} />
                <ColorButton color="#0057FF" setColor={setLineColor} />
                <ColorButton color="#FF0000" setColor={setLineColor} />
                <ColorButton color="#FFE500" setColor={setLineColor} />
            </div>
            <div className="relative mx-2">
                {
                    showColorPicker && (
                        <ColorPicker 
                            className="absolute -translate-y-[120%]" 
                            color={lineColor} 
                            setColor={setLineColor}
                        />
                    )
                }
                <div 
                    onClick={toggleShowColorPicker}
                    className="w-6 h-6 cursor-pointer rounded-full bg-gradient-to-br from-yellow-500 to-sky-500"
                    ></div>
            </div>
            <div className="flex items-center">
                <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2">
                    <span 
                        className="rounded-full"
                        style={{
                            width: lineWidth,
                            height: lineWidth,
                            backgroundColor : lineColor
                        }}
                        ></span>
                </div>
                <input 
                    value={lineWidth}
                    className="w-24 accent-selected color-white caret-white" 
                    type="range" 
                    min="1" 
                    max="24"
                    onChange={handleChange}/>
            </div>
        </div>
    );
}

export default LineEditor;