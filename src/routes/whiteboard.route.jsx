import { useEffect, useState } from "react";
import Canvas from "../components/whiteboard/canvas/canvas.component";
import { DrawingProvider } from "../context/whiteboard/drawing/drawing.context";
import { PanningProvider } from "../context/whiteboard/panning/panning.context";
import { WhiteboardProvider } from "../context/whiteboard/whiteboard/whiteboard.context";
import WhiteboardHeader from "../components/whiteboard/whiteboard-header/whiteboard-header.component";
import { useLocation, useNavigate } from "react-router-dom";

const Whiteboard = () => {
    const [isWhiteboardExpanded, setIsWhiteboardExpanded] = useState(false)
    const [whiteboardData, setWhiteboardData] = useState(null)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(
        () => {
            if (whiteboardData) {
                const save = async () => {
                    await fetch("http://localhost:8080/whiteboard/save", {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(whiteboardData)
                    })
                }
                save()
            }
        }, [whiteboardData]
    )
    useEffect(
        () => {
            const id = location.pathname.split("/whiteboard/")[1]

            const getWhiteboardData = async () => {
                const response = await fetch("http://localhost:8080/whiteboard/get/" + id)
                if (response.status === 204) {
                    navigate("/home")
                } else {
                    const json = await response.json()
                    setWhiteboardData(json)
                }
            }

            getWhiteboardData()

        }, [location.pathname]
    )

    const toggleWhiteboardSize = () => setIsWhiteboardExpanded(prev => !prev)
    return whiteboardData && (
        <div className={`w-screen h-screen  flex flex-col ${!isWhiteboardExpanded && "p-6"}`}>
            <WhiteboardProvider
                whiteboardData={whiteboardData}
                toggleExpansion={toggleWhiteboardSize}
                setWhiteboardData={setWhiteboardData}
            >
                <WhiteboardHeader isWhiteboardExpanded={isWhiteboardExpanded} />
                <PanningProvider>
                    <DrawingProvider>
                        <Canvas
                            isExpanded={isWhiteboardExpanded}
                        />
                    </DrawingProvider>
                </PanningProvider>
            </WhiteboardProvider>
        </div>
    );
}

export default Whiteboard;