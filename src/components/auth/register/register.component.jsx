import { useState } from "react";
import Button from "../../button/button.component"
import InputField from "../../input-field/input-field.component";
import { registerUser } from "../../../utils/firebase-utils";
import useUserContext from "../../../context/user/useUserContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const  { setCurrentUser } = useUserContext()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (field, event) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email , uid } = await registerUser(formData.email, formData.password)

        setCurrentUser({
            email, 
            uid,
            username: email.split("@")[0]
        })

        navigate("/")
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