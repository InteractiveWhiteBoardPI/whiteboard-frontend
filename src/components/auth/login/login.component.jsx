import { useState } from "react";
import Button from "../../button/button.component"
import InputField from "../../input-field/input-field.component";
import { loginUser } from "../../../utils/firebase-utils";
import useUserContext from "../../../context/user/useUserContext";
import { useNavigate } from "react-router-dom";


const Login = ({handleReset}) => {

    const { currentUser, setCurrentUser } = useUserContext()
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
        localStorage.setItem("uid", uid);
        setCurrentUser({
            email, 
            uid,
            username: email.split("@")[0]
        })
        const response = await fetch(`http://localhost:8080/user/exist/${uid}`);

        if (!response.ok) {
            console.error('Failed to check if user exists');
            return;
        }

        const exists = await response.json();



        if(!exists){
            await fetch("http://localhost:8080/user/save", {
                method: 'POST',
                mode:'cors',
                body: JSON.stringify(currentUser),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {
            const response = await fetch(`http://localhost:8080/user/get/${uid}`, {
                method: 'GET',
                mode:'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        
    
            if (!response.ok) {
                console.error('Failed to fetch user');
                return;
            }
    
            const user = await response.json();

        }
        navigate("/home")
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
                <div className="font-maven-pro font-semibold text-white text-sm ml-auto mr-4 cursor-pointer hover:text-blue-800" onClick={handleReset}>Forget password?</div>
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