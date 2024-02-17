import React, { useState } from "react";
import { FaCheck, FaPaperclip } from "react-icons/fa";
import Button from "../../button/button.component";
import { useNavigate } from "react-router-dom";
import useSessionContext from "../../../context/session/useSessionContext";

const UrlSession = ({ sessionId }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const { session } = useSessionContext()
  const navigate = useNavigate("")

  const handleCopyClick = () => {
    navigator
      .clipboard
      .writeText(`http://localhost:3000/session/${session.uid}`)
      .then(() => setCopySuccess(true))


    setTimeout(() => {
      setCopySuccess(false);
    }, 2000)
  }

  const openSession = () => {
    navigate("/session/"+session.uid)
  }
  

  return (
    <div className="flex flex-col justify-center items-center w-3/4 h-full rounded-3xl gap-8 bg-gradient-to-br from-light-clr-30 to-light-clr-10">
      <div className="text-white text-2xl">
        Copy link for fast join
      </div>
      <div 
        className="flex border-b pb-2 w-2/3 items-center justify-between cursor-pointer" 
        onClick={handleCopyClick}>
        <label className="cursor-pointer text-transparent gradient-label bg-clip-text">
          {
            copySuccess ? "Copied into your clipboard" : `localhost:3000/session/${session.uid}`
          }</label>
        <button>
          {copySuccess ? (
            <FaCheck />
          ) : (
            <FaPaperclip />
          )}
        </button>
      </div>
      <div className="w-1/2" onClick={openSession}>
        <Button>c o n f i r m</Button>
      </div>
    </div>

  );
};

export default UrlSession;