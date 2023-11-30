import { HexColorPicker } from "react-colorful";
import "./color-picker.styles.css"

const ColorPicker = ({className,color,setColor}) => {
    return ( 
        <div className={`color-picker ${className}`}>
            <HexColorPicker color={color} onChange={setColor}/>
        </div>
     );
}
 
export default ColorPicker;