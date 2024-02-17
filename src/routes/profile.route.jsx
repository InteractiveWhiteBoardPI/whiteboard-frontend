import { useEffect, useRef, useState } from "react";
import InputField from "../components/input-field/input-field.component";
import { IoCloudUploadSharp } from "react-icons/io5";
import useUserContext from "../context/user/useUserContext";
import { IoClose } from "react-icons/io5";

const Profile = () => {
    const { currentUser,setCurrentUser, setImageByte } = useUserContext();
    const fileInputRef = useRef();
    const [image, setImage] = useState();
    const [username, setUsername] = useState(currentUser.username);
    const [imageUrl, setImageUrl] = useState();
    const [loading, setLoading] = useState(true);

    


    const handleChange = (event) => {
      setUsername(event.target.value);
      currentUser.username=username;
    };

    const handleDivClick = () => {
      fileInputRef.current.click();
    };

    const update = async () => {
      if (currentUser) {
        console.log(image);
        currentUser.username=username;
        if (image) {
          const formData = new FormData();
          formData.append('image', image);
      
          try {
          
            await fetch(`http://localhost:8080/user/update-photo/${currentUser.uid}/${username}`, {
              method: 'POST',
              body: formData,
            });
          } catch (error) {
            console.error("Error updating photo:", error);
          }
        } else {
          try {
            await fetch(`http://localhost:8080/user/update-photo/${currentUser.uid}/${username}`, {
              method: 'DELETE', 
            });
          } catch (error) {
            console.error("Error deleting photo:", error);
          }
        }
      }
    };

    useEffect(() => {
      const getUser = async () => {
        const response = await fetch(`http://localhost:8080/user/get/${localStorage.uid}`, {
          method: 'GET',
          mode:'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        if (response.ok) {
          const userData = await response.json();
          setLoading(false);
          setImageByte(userData.imageByte);
          currentUser.username=userData.username;
          setUsername(userData.username);
          setCurrentUser(currentUser);
          console.log(currentUser);
          console.log("user : ",localStorage);
        }
      };

      
    
      getUser();
    }, []);

    useEffect(() => {
      console.log("currentUser : ",currentUser)
      if (currentUser && currentUser.imageByte) {
        setImageUrl(`data:image/png;base64, ${currentUser.imageByte}`);
        console.log("profile : ",currentUser)
      }
    }, [currentUser]);


    const handleXClick = async () => {
      setImageByte(null);

      setImage(null);
    };

    const handleFileChange = async (event) => {
      const selectedFile = event.target.files[0];
      setImage(selectedFile);

      if (selectedFile) {
        const reader = new FileReader();

        reader.onloadend = async () => {
          const fileContent = reader.result;
          const byteArray = new Uint8Array(fileContent);
          let binary = '';
          var len = byteArray.byteLength;
          for (var i = 0; i < len; i++) {
              binary += String.fromCharCode( byteArray[ i ] );
          }
          binary = window.btoa(binary);
          console.log("binary : ",binary);
          setImageByte(binary);
        }

        reader.readAsArrayBuffer(selectedFile);
      }
    };
    

    return (
        <div className="h-[85%] w-[70%] rounded-2xl border border-solid border-white bg-gradient-to-r from-white/65 to-white/8 backdrop-blur-12 ml-auto mr-auto mt-auto mb-auto flex">
            <div className="mt-auto mr-auto mb-auto ml-auto">
                <div className="flex w-[18vw] h-[32vh] rounded-full border-2 border-white">
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    
                    {currentUser.imageByte!=null && <img 
                            src={imageUrl}
                            className="w-[18vw] h-[32vh] rounded-full absolute"
                        />
                    }
                    <div className="relative w-64 h-64 group">
                      <IoCloudUploadSharp   className={currentUser.imageByte != null ? "icon upload-icon text-6xl cursor-pointer text-white absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" : "icon upload-icon text-6xl cursor-pointer text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"} onClick={handleDivClick}/>
                      {currentUser.imageByte!=null && <IoClose className="icon close-icon text-6xl text-white cursor-pointer absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" onClick={handleXClick}/> }
                    </div>
                </div>
                <div className="mt-[6%]">
                    <InputField 
                        label="Username"
                        type="username"
                        value={username}
                        onChange={handleChange}
                    />
                </div>
                <button className="w-[5vw] h-[5vh] bg-black rounded-[4px] text-white ml-[6vw] mt-[2vh]" onClick={update}>
                    Update
                </button>
            </div>
        </div>
    );
}

export default Profile;
