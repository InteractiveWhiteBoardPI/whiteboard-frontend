import { useState } from "react";
import Socket from "./utils/Socket";

const App = () => {
  const [send, setSend] = useState("");
  const [messages, setMessages] = useState([]);


  const socket = new Socket();
  socket.subscribe("/topic/messages", ({ body }) => {
    setMessages([...messages, body]);
  })

  const sendMessage = () => {
    socket.send("/app/chat",send);
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <input
        value={send}
        onChange={(e) => setSend(e.target.value)}
        className="input input-secondary mb-3"
      />
      <button className="btn btn-secondary" onClick={sendMessage}>
        send
      </button>
      {messages.map((msg) => (
        <h1 key={msg}>Message: {msg}</h1>
      ))}
    </div>
  );
};

export default App;
