import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../../../utils/firebase-utils"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Button from "../../button/button.component";
import InputField from "../../input-field/input-field.component";
import ToastDisplayer from "../../toast-displayer/toast-displayer.component";

export default function ForgetPassword({ handleReset }) {
    const [email, setEmail] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
            .then(() => toast.success("Your reset request has sent to your email"))
            .catch(() => toast.error("Invalid email"))
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    return (
        <div className="w-full relative mt-10 flex flex-col items-center">
            <div className="w-full mb-10">
                <div className="text-white text-md bg-black font-bold
                w-fit py-2 px-4 rounded-lg cursor-pointer hover:opacity-50"
                    onClick={handleReset}>
                    Back
                </div>
            </div>
            <div className="bg-black w-1/2 p-10 rounded-3xl">
                <h1 className="font-bold text-white text-3xl mb-4">Reset your password</h1>
                    <div className="text-light-clr-60">
                        Write your email :
                    </div>
                    <form onSubmit={handleSubmit}>
                        <InputField 
                            className="my-2"
                            label="Email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <ToastDisplayer />
                        
                        <Button content="Reset" onClick={handleSubmit} className="mt-6" />
                    </form>
            </div>
        </div>
    )
}