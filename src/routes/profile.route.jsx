import { useEffect, useRef, useState } from "react";
import InputField from "../components/input-field/input-field.component";
import { IoCloudUploadSharp } from "react-icons/io5";
import useUserContext from "../context/user/useUserContext";
import { IoClose } from "react-icons/io5";
import Button from "../components/button/button.component";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { currentUser, setCurrentUser } = useUserContext();
  const fileInputRef = useRef();
  const [image, setImage] = useState();
  const [username, setUsername] = useState("");
  const [imageByte, setImageByte] = useState();
  const [errorMessage, setErrorMessage] = useState();
  useEffect(
    () => {
      if (!currentUser) return
      setUsername(currentUser.username);
      setImageByte(currentUser.imageByte);
    }, [currentUser]
  )

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const update = async () => {
    if (!currentUser) return;
    if (!username) {
      setErrorMessage("Username cannot be empty");
      return;
    }
    if (imageByte) {
      const formData = new FormData();
      formData.append('image', image);
      try {
        const res = await fetch(`http://localhost:8080/user/update-photo/${currentUser.uid}/${username}`, {
          method: 'POST',
          body: formData,
        });
        if (res.status === 200) {
          const user = await res.json();
          setCurrentUser({
            ...user,
            imageByte: `data:image/png;base64,${user.imageByte}`
          });
        }
      } catch (error) {
        setErrorMessage("Error updating photo");
        console.error("Error updating photo:", error);
      }
    } else {
      try {
        const res = await fetch(`http://localhost:8080/user/update-photo/${currentUser.uid}/${username}`, {
          method: 'DELETE',
        });
        if (res.status === 200) {
          const user = await res.json();
          setCurrentUser({
            ...user

          })
        }
      } catch (error) {
        setErrorMessage("Error deleting photo");
        console.error("Error deleting photo:", error);
      }
    }
  };

  const handleXClick = async () => {
    setImageByte(null);
    setImage(null);
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const fileContent = reader.result;
        const byteArray = new Uint8Array(fileContent);
        setImageByte(`data:image/png;base64,${btoa(String.fromCharCode.apply(null, byteArray))}`);
        setImage(selectedFile);
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
          {!!imageByte && <img
            src={imageByte}
            className="w-[18vw] h-[32vh] rounded-full absolute"
          />
          }
          <div className="relative w-64 h-64 group">
            <IoCloudUploadSharp
              className={`icon upload-icon text-6xl cursor-pointer text-white absolute top-1/2  transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${!!imageByte ? "left-1/3" : "left-1/2"}`} onClick={handleDivClick} />
            {!!imageByte && <IoClose className="icon close-icon text-6xl text-white cursor-pointer absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" onClick={handleXClick} />}
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
        <div className="text-red-500 w-full text-center">{errorMessage}</div>
        <Button onClick={update} content="Update" className="mt-4" />
      </div>
    </div>
  );
}

export default Profile;
