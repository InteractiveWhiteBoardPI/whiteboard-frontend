import { Outlet } from "react-router-dom";

const CreationWrapper = () => {
    return (
        <div className="w-4/5 h-full pr-4 pb-4">
            <h1 className="h-[10%] text-2xl font-bold">Create a new session</h1>
            <div className="flex justify-center items-center w-full h-4/5">
                <Outlet />
            </div>
        </div>
    );
}

export default CreationWrapper;