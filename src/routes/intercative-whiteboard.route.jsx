import { useEffect } from 'react'
import Canvas from '../components/whiteboard/canvas/canvas.component'
import socket from '../utils/Socket'
import { useParams } from 'react-router-dom'
import useWhiteboardContext from '../context/whiteboard/whiteboard/useWhiteboardContext'

const InteractiveWhiteboard = () => {
    const { id } = useParams()
    const { setMovesArray } = useWhiteboardContext()
    useEffect(
        () => {
            const handleMessageRecieved = ({body}) => {
                const lineData = JSON.parse(body)
                setMovesArray(prev => prev.map(line => line.id).includes(lineData.id) ? prev : [...prev, {...lineData, isBucket: lineData.bucket}])
            }
            const handlePrevRequest = ({body}) => {
                const message = JSON.parse(body)
                console.log("prev request", message)
                setMovesArray(prev => prev.filter(line => line.id !== message.id))
            }
            const fetchWhiteboardData = async () => {
                const data = await fetch("http://localhost:8080/whiteboard/session/" + id)
                const json = await data.json()
                setMovesArray(json)
            }
            fetchWhiteboardData()
            socket.connect()
            socket.subscribe(`/user/${id}/draw`, handleMessageRecieved)
            socket.subscribe(`/user/${id}/prev`, handlePrevRequest)
        }, [id]
    )

    return (
        <Canvas isInteractive/>
    )
}

export default InteractiveWhiteboard