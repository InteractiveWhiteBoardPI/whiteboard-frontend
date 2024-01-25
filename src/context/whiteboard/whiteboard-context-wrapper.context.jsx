import {WhiteboardProvider} from "./whiteboard/whiteboard.context";
import {PanningProvider} from "./panning/panning.context";
import {DrawingProvider} from "./drawing/drawing.context";

const WhiteboardContextWrapper = ({children}) => (
    <WhiteboardProvider>
        <PanningProvider>
            <DrawingProvider>
                {children}
            </DrawingProvider>
        </PanningProvider>
    </WhiteboardProvider>
)
export default WhiteboardContextWrapper