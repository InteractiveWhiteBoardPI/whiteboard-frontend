import { loginInWithGoogle } from "../../../utils/firebase-utils";
import Button from "../../button/button.component";
import { FaGoogle } from "react-icons/fa";

const GoogleSignIn = () => {

    const handleClick = async () => {
        await loginInWithGoogle()
    }
    return (
        <div className="w-full mt-6">
            <div className="w-full flex justify-center items-center">
                <div class="w-[45%] h-[1px] bg-white" />
                <div>
                    <div class="bg-light-clr-20 border border-white rounded-full w-8 h-8 text-white flex items-center justify-center">
                        Or
                    </div>
                </div>
                <div class="w-[45%] h-[1px] bg-white" />
            </div>
            <div className="w-full px-5 mt-4">
                <Button 
                    onClick={handleClick}
                    className="flex items-center justify-center">
                    <FaGoogle />
                    <span className="text-sm w-56">Sign with google</span>
                </Button>
            </div>
        </div>
    );
}

export default GoogleSignIn;