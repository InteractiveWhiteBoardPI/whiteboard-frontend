import bytesToMegaBytes from "../../../utils/bytes-to-mega-bytes";
import { MdClose } from "react-icons/md";
const FilePreview = ({selectedFile,setSelectedFile,setFileData}) => {

    const handleUndo = () => {
        setSelectedFile(null)
        setFileData(null)
    }


    return(
        <div className="flex absolute bg-black rounded bottom-20 left-96 justify items-center">
            <div className="flex p-2 m-2 justify-center items-center bg-gray-900 bg-opacity-50 overflow-hidden rounded">
                <div className="ml-2 mr-2">
                    <div >
                      {selectedFile?.name}
                    </div>
                    <div>
                        {bytesToMegaBytes(selectedFile?.size)}
                    </div>
                </div>
                    <MdClose className="cursor-pointer" onClick={handleUndo}/>
            </div>
        </div>
    )
}
export default FilePreview;