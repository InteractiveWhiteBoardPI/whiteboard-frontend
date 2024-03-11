import {MdOutlineAttachFile} from "react-icons/md";
import FilePreview from "../file-preview/file-preview.component";

const UploadFile = ({selectedFile,handleFileChange,setSelectedFile, setFileData}) => {

  return (
      <div>
        <div className="border-none hover:hover:bg-light-clr-10 cursor-pointer rounded-full items-center p-3">
            <label htmlFor="file">
              <MdOutlineAttachFile className="text-white w-7 h-7 transform rotate-45 cursor-pointer"/>
            </label>
          <input id="file"  type="file" onChange={handleFileChange} hidden/>
        </div>
          {
            selectedFile &&  <FilePreview selectedFile={selectedFile} setSelectedFile={setSelectedFile} setFileData={setFileData}/>
          }
      </div>
  );
};

export default UploadFile;