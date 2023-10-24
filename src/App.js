import { useState } from "react";
import Socket from "./utils/Socket";

const App = () => {
  const [message, setMessage] = useState("")
  const socket = new Socket()
  socket.listen(
    event => {
      setMessage(event.data)
    }
  )
  const sendMessage = () => {
    socket.send("hello there")
  }
  
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <button 
        className="btn btn-secondary"
        onClick={sendMessage}>send</button>
      <h1>Message : {message}</h1>
    </div>
  ); 
}
 
export default App;