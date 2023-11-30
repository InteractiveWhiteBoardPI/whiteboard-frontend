import {
    FaMicrophone,
    FaThumbtack,
    FaUsers,
} from "react-icons/fa";
import SessionHeader from "../session-header/session-header.component";
const CallSection = () => {
    return (
        <div className="flex flex-col h-full w-3/4 p-4 justify-evenly">
            <SessionHeader />

            <div
                className="h-[55%]  bg-cover bg-no-repeat rounded-3xl p-3 "
                style={{
                    backgroundImage:
                        "url(https://anglotopia.net/wp-content/uploads/2019/07/shaun-the-sheep-paradise-country-post.jpg)",
                }}
            >
                <div className=" flex justify-between ">
                    <div className="text-white p-1 bg-gray-400  w-28 flex items-center justify-center rounded-full font-bold   ">
                        Shaun
                    </div>
                    <button className="bg-gray-400 rounded-full h-8 w-10 flex items-center justify-center">
                        <FaThumbtack style={{ color: "#3792d7" }} />
                    </button>
                </div>
            </div>

            <div className="flex h-32 mt-4 rounded-3xl gap-7 ">
                <div className=" flex  flex-col w-1/3 bg-slate-200 rounded-3xl pt-1 pb-1 pl-2 pr-2 ">
                    <button className="bg-gray-400 rounded-full h-8 w-10 flex items-center justify-center ">
                        <FaThumbtack style={{ color: "#ffffff" }} />
                    </button>

                    <img
                        className="h-14 w-14 rounded-full ml-24 "
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqrwXfuGTN059UjTXRHrkig0YZxKE2Wm2_mR0ppaPfVDG4hruRfhVhby4xpRLzgz2YE8w&usqp=CAU"
                    />

                    <div className="flex justify-between ">
                        <div className="text-white p-1 bg-gray-400  w-16 flex items-center justify-center rounded-full font-bold   ">
                            You
                        </div>
                        <button className=" bg-gray-400  w-9 flex items-center justify-center rounded-full ">
                            <FaMicrophone style={{ color: "#ffffff" }} />
                        </button>
                    </div>
                </div>

                <div
                    className="w-1/3 bg-cover bg-no-repeat  rounded-3xl p-1 "
                    style={{
                        backgroundImage:
                            "url(https://media.graphassets.com/CqNntlMDRgKm9mYPIRNC)",
                    }}
                >
                    <button className="bg-gray-400 rounded-full h-8 w-10 mb-13 flex items-center justify-center p-1 ">
                        <FaThumbtack style={{ color: "#ffffff" }} />
                    </button>
                    <div className="flex justify-between mt-12 pd-2">
                        <div className="text-white p-1 bg-gray-400  w-16 flex items-center justify-center rounded-full font-bold   ">
                            You
                        </div>
                        <button className=" bg-gray-400  w-9 flex items-center justify-center rounded-full ">
                            <FaMicrophone style={{ color: "#ffffff" }} />
                        </button>
                    </div>
                </div>
                
                <div className="w-1/3 bg-slate-700 rounded-3xl flex items-center justify-center">
                    <div className=" flex gap-3 bg-dark bg-opacity-50 p-2 rounded-xl">
                        <FaUsers style={{ color: "#ffffff" }} />
                        <div className="text-white"> X other Participants</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CallSection;