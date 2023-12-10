
import WhiteboardList from "../components/whiteboard/whiteboard-list/whiteboard-list.component"
import ViewSelectedWhiteboard from "../components/whiteboard/view-selected-whiteboard/view-selected-whiteboard.component";
import {useState} from "react";

const WhiteboardViewer = () => {
    const [whiteboard, setWhiteboard] = useState(null);
    return (
        <div className="relative w-4/5 h-full pr-4 pb-4 flex flex-col gap-4">
            <h1 className="font-semibold text-xl h[10%]">Recent Boards</h1>
            <WhiteboardList  selected={whiteboard} setSelected={setWhiteboard}/>
            <ViewSelectedWhiteboard whiteboard={whiteboard}/>
        </div>
    );
}

export default WhiteboardViewer;