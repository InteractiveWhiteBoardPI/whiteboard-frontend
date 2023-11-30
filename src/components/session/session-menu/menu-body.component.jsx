import {
    FaPaperPlane,
    FaPaperclip,
} from "react-icons/fa";
import { SlCursor } from "react-icons/sl";

const MenuBody = () => {
    return (
        <div className="rounded-3xl h-[90%] relative bg-dark-clr-50 py-1 px-3">
            <div className="flex gap-3 justify-end items-center text-white h-[15%]">
                <div>You</div>
                <div>Yasmine</div>
                <div className="h-12 w-12 rounded-full border border-white"/>
            </div>

            <div className="h-[80%] flex flex-col justify-end">

                <div className="flex justify-between rounded-3xl items-center">
                    <div className="flex gap-1 items-center">
                        <FaPaperclip className="text-2xl"/>
                        <input
                            type="text"
                            placeholder="Type something..."
                            className="placeholder-white bg-transparent focus:outline-none pl-2"
                        />
                    </div>

                    <SlCursor className="text-xl"/>
                </div>
            </div>

        </div>
    );
}

export default MenuBody;