import {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";

const Button = ({outlined = false, onClick, content}) => (
    <button className={`py-1 px-3 rounded-xl z-20 border transition duration-500 cursor-pointer ${
        !outlined ? 
        "text-white border-black bg-black hover:text-black hover:bg-white" : 
        "text-black border-black bg-white hover:text-white hover:bg-black"}`}
    >{content}</button>
)

const ViewSelectedWhiteboard = ({whiteboard}) => {
    const [showOpenButton, setShowOpenButton] = useState(false);
    const navigate = useNavigate()

    const handleMouseEnter = useCallback(( ) => {
        setShowOpenButton(true)
    },[])

    const handleMouseLeave = useCallback(() => {
        setShowOpenButton(false)
    }, [])

    const openWhiteboard = () => {
        navigate("/whiteboard/"+whiteboard.id)
    }

    return whiteboard && (
        <div className="w-full h-[70%] bg-white rounded-2xl relative overflow-hidden">
            <img src={whiteboard.displayImage} className="absolute w-full h-full top-0 left-0 z-0"/>
            <div
                onClick={openWhiteboard}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`z-10 w-full h-full absolute transition cursor-pointer duration-300 flex items-center justify-center ${showOpenButton && "bg-dark-clr-40 backdrop-blur"}`}>
                {showOpenButton && <Button content="Open"/>}
            </div>
        </div>
    )
}

export default ViewSelectedWhiteboard