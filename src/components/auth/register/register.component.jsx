import { useState } from "react";
import Button from "../../button/button.component"
import InputField from "../../input-field/input-field.component";
import { registerUser } from "../../../utils/firebase-utils";
import useUserContext from "../../../context/user/useUserContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { currentUser, setCurrentUser } = useUserContext()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [errorMessage, setErrorMessage] = useState(null)
    const handleChange = (field, event) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.email === "" || formData.password === "" || formData.confirmPassword === "") {
            setErrorMessage("Please fill in all fields")
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Passwords do not match")
            return;
        }
        try {
            const { user: { email, uid } } = await registerUser(formData.email, formData.password)
            const response = await fetch("http://localhost:8080/user/save", {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    email,
                    uid,
                    username: email.split("@")[0]
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.status === 200) {
                const user = await response.json();
                setCurrentUser({
                    ...user,
                    imageByte: user.imageByte ? `data:image/png;base64,${user.imageByte}` : null
                });
                navigate("/home")
                return;
            }
        } catch (error) {
            if (error.code === "auth/weak-password") {
                setErrorMessage("Password should be at least 6 characters")
                return;
            }
            if (error.code === "auth/email-already-in-use") {
                setErrorMessage("Email already in use")
                return;
            }
        }
    }

    return (
        <div className="w-full">
            <div className="text-white text-center text-xl font-extrabold tracking-widest mb-3">
                Create a new account
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
                    onChange={handleChange.bind(this, "password")}
                />
                <InputField
                    label="Confirm password"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange.bind(this, "confirmPassword")}
                />
                {
                    errorMessage && <div className="text-red-500 text-sm text-center">{errorMessage}</div>
                }
                <Button
                    content="register"
                    onClick={handleSubmit}
                    className="mt-3"
                />
            </form>
        </div>
    );
}

export default Register;