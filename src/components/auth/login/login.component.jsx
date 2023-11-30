import { useState } from "react";
import Button from "../../button/button.component"
import InputField from "../../input-field/input-field.component";
import { loginUser } from "../../../utils/firebase-utils";
import useUserContext from "../../../context/user/useUserContext";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const { setCurrentUser } = useUserContext()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (field, event) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {user : { email , uid} } = await loginUser(formData.email, formData.password)
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
                    onChange={handleChange.bind(this, "password")}
                />
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