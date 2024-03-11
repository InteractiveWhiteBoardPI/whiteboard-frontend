import { useState } from "react";
import Button from "../../button/button.component"
import InputField from "../../input-field/input-field.component";
import { loginUser } from "../../../utils/firebase-utils";
import useUserContext from "../../../context/user/useUserContext";
import { useNavigate } from "react-router-dom";


const Login = ({ handleReset }) => {

    const { setCurrentUser } = useUserContext()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [errorMessage, setErrorMessage] = useState(null)

    const handleChange = (field, event) => {
        setErrorMessage(null)
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if(formData.email === "" || formData.password === "") {
                setErrorMessage("Please fill in all fields")
                return;
            }
            const { user: { email, uid } } = await loginUser(formData.email, formData.password)
            setCurrentUser({
                email,
                uid,
                username: email.split("@")[0]
            })
            const response = await fetch(`http://localhost:8080/user/get/${uid}`);

            if(response.status === 200) {
                const user = await response.json();
                setCurrentUser({
                    ...user,
                    imageByte: user.imageByte ? `data:image/png;base64,${user.imageByte}` : null
                });
                navigate("/home")
                return;
            }
            const res = await fetch("http://localhost:8080/user/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    uid,
                    username: email.split("@")[0],
                }),
            })
            if(res.status === 200) {
                const user = await res.json()
                setCurrentUser({...user})
                navigate("/home")
            } else {
                setErrorMessage("Something went wrong")
            }
        } catch (error) {
            if(error.code === "auth/invalid-credential") {
                setErrorMessage("Invalid credentials!")
                return;
            }
            if(error.code === "auth/invalid-email") {
                setErrorMessage("Invalid email!")
                return;
            }
            setErrorMessage("Something Went Wrong")
        }
    }


    return (
        <div className="w-full">
            <div className="text-white text-center text-xl font-extrabold tracking-widest mb-3">
                Login to your account
            </div>
            <form className="flex flex-col gap-6 px-5">
                <InputField
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange.bind(this, "email")}
                />
                <InputField
                    label="Password"
                    type="password"
                    value={formData.password}
                    autoComplete="on"
                    onChange={handleChange.bind(this, "password")}
                />
                <div className="font-maven-pro font-semibold text-white text-sm ml-auto mr-4 cursor-pointer hover:text-blue-800" onClick={handleReset}>Forget password?</div>
                {
                    errorMessage && <div className="text-red-500 text-sm text-center">{errorMessage}</div>
                }
                <Button
                    content="login"
                    onClick={handleSubmit}
                    className="mt-3"
                />
            </form>
        </div>
    );
}

export default Login;