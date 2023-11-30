import { Outlet } from "react-router-dom";

import LeftMenu from "../components/left-menu/left-menu.component";
import Navbar from "../components/navbar/navbar.component";


const Home = () => {
    return (
        <div className="flex h-screen justify-center items-center">
            <div className="relative w-4/5 h-4/5 bg-dark-clr-70 rounded-3xl">
                <Navbar />
                <div className="flex w-full h-[85%] pt-5">
                    <LeftMenu />
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}

export default Home;