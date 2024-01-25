import { FaRegFile } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import bytesToMegaBytes from "../../../utils/bytes-to-mega-bytes";

const FileBubble = ({message}) => {

        const handleDownload = () => {
            const byteCharacters = atob(message.content);

            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/octet-stream' });

            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = message.fileName;
            link.click();

            URL.revokeObjectURL(url);
    }

    return(
        <div className="flex items-center">
            <div className="flex p-2 justify-center items-center bg-gray-900 bg-opacity-50 overflow-hidden rounded">
                    <FaRegFile className="text-selected w-5 h-5"/>
                <div className="flex flex-col ml-2 mr-2">
                    <div className="whitespace-nowrap">
                        {message.fileName}
                    </div>
                    <div className="text-xs">
                        {bytesToMegaBytes(message.fileSize)}
                    </div>
                </div>
                    <MdOutlineFileDownload className="cursor-pointer w-5 h-5" onClick={handleDownload}/>
            </div>
        </div>
    )
}

export default FileBubble;