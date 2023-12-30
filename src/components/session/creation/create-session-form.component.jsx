import React, { useState } from "react";
import UrlSession from "./copy-session-link.component";
import InputField from "../../input-field/input-field.component";
import Button from "../../button/button.component";
import useUserContext from "../../../context/user/useUserContext";
import useSessionContext from "../../../context/session/useSessionContext";
import { useNavigate } from "react-router-dom";

const CreationSessionForm = () => {
  const [sessionFields, setSessionFields] = useState({
    name: "",
    password: "",
  })
<<<<<<< HEAD

=======
  const [errorMessage, setErrorMessage] = useState(null);
>>>>>>> d9668a5f7740115011857a65b471d4791b1942ba
  const { currentUser } = useUserContext()
  const { setSession } = useSessionContext()
  const navigate = useNavigate()

  const handleChange = (field, event) => {
    setErrorMessage("")
    setSessionFields({
      ...sessionFields,
      [field]: event.target.value
    })
  }
  const handleCreateButtonClick = async () => {
    try {
      const response = await fetch(`http://localhost:8080/session/createSession`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...sessionFields,
          host: currentUser
        }),
      });
      if(response.status === 201) {
        const json = await response.json()
        if(json){
          setSession(json)

<<<<<<< HEAD
      const json = await response.json()

      setSession(json)
      console.log(json)
=======
          navigate("/home/create-session/copy-link")
        }
      } else {
        setErrorMessage("Could not create session")
      }
>>>>>>> d9668a5f7740115011857a65b471d4791b1942ba
    } catch (error) {
      console.error("Error:", error);
    }

  };

  return (
    <div className="flex flex-col justify-center items-center w-3/4 h-full rounded-3xl gap-8 bg-gradient-to-br from-light-clr-30 to-light-clr-10">
      <InputField
        label="Session ID"
        className="w-1/2"
        value={sessionFields.name}
        onChange={handleChange.bind(this, "name")}
      />
      <InputField
        label="Session Password"
        className="w-1/2"
        value={sessionFields.password}
        onChange={handleChange.bind(this, "password")}
      />
      {
        errorMessage && (
            <div className="text-error">
              {errorMessage}
            </div>
          )
      }
      <div className="w-1/2">
        <Button
          onClick={handleCreateButtonClick}
        >
          Create
        </Button>
      </div>
    </div>
  )
};

export default CreationSessionForm;
