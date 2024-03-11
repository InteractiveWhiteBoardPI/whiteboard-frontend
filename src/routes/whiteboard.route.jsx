import { useEffect, useState } from "react";
import Canvas from "../components/whiteboard/canvas/canvas.component";
import { useLocation, useNavigate } from "react-router-dom";
import useWhiteboardContext from "../context/whiteboard/whiteboard/useWhiteboardContext";
import WhiteboardHeader from "../components/whiteboard/whiteboard-header/whiteboard-header.component";
const Whiteboard = () => {
    const { whiteboardData, setWhiteboardData, isExpanded, canvas, setMovesArray } = useWhiteboardContext()
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const save = async () => {
            try {
                if(!canvas) return
                if (whiteboardData) {
                    await fetch("http://localhost:8080/whiteboard/save", {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ...whiteboardData,
                            displayImage : canvas.toDataURL()
                        }),
                    });
                }
            } catch (error) {
                console.error("Error saving whiteboard data:", error);
            }
        };
        save();
    }, [whiteboardData]);

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

    return whiteboardData && (
        <div className={`w-screen h-screen  flex flex-col ${!isExpanded && "p-6"}`}>
            <WhiteboardHeader isWhiteboardExpanded={isExpanded}/>
            <Canvas
            />
        </div>
    );
}

export default Whiteboard;