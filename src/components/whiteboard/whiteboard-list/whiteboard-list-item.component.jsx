import { FaRegCalendarAlt } from "react-icons/fa";
const WhiteboardListItem = ({selected = false,setSelected , whiteboard}) => {
    const handleSelection = () => {
        setSelected(whiteboard)
    }
    return ( 
        <div
            onClick={handleSelection}
            className={`flex-none w-[24%] ${selected ? "bg-selected" : "bg-white"} rounded-3xl p-4 pb-2 text-black flex flex-col justify-between relative overflow-hidden cursor-pointer`}>
            {
                !selected && <img src={whiteboard.displayImage} className="absolute w-full h-full top-0 left-0 z-0"/>
            }
            <p className="z-10">{whiteboard.name}</p>
            <p className="z-10 flex gap-2 text-sm items-center">
                <FaRegCalendarAlt className="text-xl"/>
                <span>{whiteboard.lastModified}</span>
            </p>
        </div>
     );
}
 
export default WhiteboardListItem;