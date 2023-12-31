import {useState} from "react";
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../../../utils/firebase-utils"
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function ForgetPassword({handleReset}) {

    const [email, setEmail] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth,email).then(data=>
            toast.success("Your reset request has sent to your email")
        ).catch(err=>
        toast.error("invalid email"))
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    return(
        <div className="h-[80%] w-full">
            <div className="text-white text-md bg-black font-maven-pro font-semibold text-center
            pt-[1vh] w-[5vw] h-[5vh] rounded-[6px] cursor-pointer hover:opacity-50"
            onClick={handleReset}>
                back
            </div>
            <div className="bg-black w-[40vw] h-[40vh] ml-[19vw] mt-[4vh] grid p-4 rounded-2xl grid-cols-1">
                <h1 className="font-maven-pro font-bold text-white text-3xl ml-auto mr-auto">Reset your password</h1>
                <div className="flex flex-wrap">
                    <div className="font-maven-pro font-semibold text-white text-xl">
                        Write your email :
                    </div>
                    <form className="inline-block" onSubmit={handleSubmit}>
                        <input
                            placeholder="mohammed.amine203@gmail.com"
                            type="email"
                            value={email}
                            className="text-white bg-transparent border-b-[1px] outline-none w-[16vw]
                            h-[5vh] border-gray-400 p-2 ml-[5%]"
                            onChange={handleEmailChange}
                        />
                        <ToastContainer
                            hideProgressBar={false}
                            autoClose={5000}
                            position={"top-center"}
                            theme={"dark"}
                        />
                        <button className="text-white text-md bg-gray-900 font-maven-pro font-semibold text-center pt-[1vh]
                        w-[5vw] h-[5vh] rounded-[6px] ml-[6vw] mt-[4vh]">
                            R E S E T
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}