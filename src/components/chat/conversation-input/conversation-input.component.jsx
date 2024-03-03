import { RiSendPlaneLine } from "react-icons/ri";
import useUserContext from "../../../context/user/useUserContext";
import UploadFile from "../upload-file/upload-file.component";
import {useEffect, useState} from "react";
import EmojiPicker from 'emoji-picker-react';
import { MdEmojiEmotions } from "react-icons/md";

const ConversationInput = ({sendMessage,message,setMessage,className}) => {
    const {currentUser} = useUserContext()
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileData,setFileData] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedEmojis, setSelectedEmojis] = useState([]);


    const handleToggleEmojiPicker = () => {
        setShowEmojiPicker(prevState => !prevState);
    };
    const handleFileChange = async(event) => {
        setSelectedFile(event.target.files[0]);
    };

    useEffect(() => {
        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = () => {
                const buffer = reader.result;
                const bytes = new Uint8Array(buffer);

                setFileData(Array.from(bytes))

            };

            reader.readAsArrayBuffer(selectedFile);
        }
    }, [selectedFile]);

    const handleSendMessage = () => {

        if (fileData) {
            sendMessage(fileData, true, selectedFile);
        } else {
            let messageText = message.messageBody;

            selectedEmojis.forEach(emoji => {
                messageText += emoji;
            });

            sendMessage(messageText, false);

        }
        setMessage({
                fileName: "",
                content: "",
                messageBody: "",
                sender: currentUser?.uid,
                date: "",
        })
        setFileData(null)
        setSelectedFile(null);
        setSelectedEmojis([]);
        setShowEmojiPicker(false);
    }

    const setMsg = (event) => {
        setMessage(prev => ({...prev, messageBody : event.target.value}));
    };

    const handleEmojiClick = (emojiSelected) => {
        setSelectedEmojis(prev => [...prev, emojiSelected.emoji]);
    }

    return (
        <div className={className}>
            <div className="bg-dark-clr-80 rounded-full p-0.5 flex w-full">
                {
                    showEmojiPicker && (
                        <div className="absolute w-1/4 h-1/4">
                            <EmojiPicker onEmojiClick={handleEmojiClick}/>
                        </div>
                    )
                }
                <div
                    className="hover:bg-light-clr-10 cursor-pointer border-none hover:bg-opacity-40 rounded-full p-3.5 flex justify-center items-center ">
                    <MdEmojiEmotions className="text-white w-5 h-5 " onClick={handleToggleEmojiPicker}/>
                </div>

                <UploadFile selectedFile={selectedFile} handleFileChange={handleFileChange}
                            setSelectedFile={setSelectedFile} setFileData={setFileData}/>
                <input
                    value={message.messageBody}
                    onChange={setMsg}
                    className="input mt-0.5 focus:outline-none
                     border-none bg-transparent text-white flex-grow w-full"
                    placeholder={selectedEmojis.length > 0 ? selectedEmojis : (selectedFile ? "You can't send text message" : "Type something...")}
                    disabled={!!selectedFile}
                />
                <div
                    className="hover:bg-light-clr-10 cursor-pointer border-none hover:bg-opacity-40 rounded-full p-3.5 flex justify-center items-center ">
                    <RiSendPlaneLine
                        className="text-white w-5 h-5 "
                        onClick={handleSendMessage}
                    />
                </div>
            </div>
        </div>
    )
}

export default ConversationInput