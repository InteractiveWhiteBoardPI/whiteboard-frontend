import {Outlet, useNavigate} from "react-router-dom";
import InputField from "../components/input-field/input-field.component";
import React, {useState} from "react";
import Button from "../components/button/button.component";
import useUserContext from "../context/user/useUserContext";
import useSessionContext from "../context/session/useSessionContext";

const JoinSession = () => {
    const [sessionFields, setSessionFields] = useState({
        name: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const { currentUser } = useUserContext();
    const {  setSession } = useSessionContext()
    const navigate = useNavigate()

    const handleChange = (field, event) => {
        setErrorMessage("")
        setSessionFields({
            ...sessionFields,
            [field]: event.target.value
        })
    }

    const handleJoin = async ( ) => {
        if(sessionFields.name==='' || sessionFields.password===''){
            setErrorMessage("Please fill all of the fields")
            return;
        }
        const sessionResponse = await fetch(`http://localhost:8080/session/get/${sessionFields.name}/${sessionFields.password}`)

        const json = await sessionResponse.json();
        if(json){
            const response = await fetch("http://localhost:8080/session/join/"+json.uid,{
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })

            if(response.status === 201) {
                setSession(json)
                navigate("/session/"+json.uid)
            } else {
                setErrorMessage("Could not join session")
            }
        } else {
            setErrorMessage("Invalid fields")
        }

    }


    return (
        <div className="w-4/5 h-full pr-4 pb-4">
            <h1 className="h-[10%] text-2xl font-bold">Join a session</h1>
            <div className="flex justify-center items-center w-full h-4/5">
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
                            onClick={handleJoin}
                        >
                            Join
                        </Button>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default JoinSession;