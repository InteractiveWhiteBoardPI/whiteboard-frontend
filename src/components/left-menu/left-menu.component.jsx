import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { CiFolderOn, CiStar, CiVideoOn } from "react-icons/ci";
import { useLocation, useNavigate, useRouteError, useRoutes } from "react-router-dom";
import MenuItem from "./menu-item";
import { SlCursor } from "react-icons/sl";
import { BsChatDots } from "react-icons/bs";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoPerson } from "react-icons/io5";

const LeftMenu = () => {
  const [currentRoute, setCurrentRoute] = useState("")
  const [showSessionMenu, setShowSessionMenu] = useState(false)
  const route = useLocation()
  const navigate = useNavigate()

  const toggleSessionMenu = () => setShowSessionMenu(prev => !prev)

  useEffect(
    () => {
      const path = route.pathname.split("/home")
      setCurrentRoute(path[1])
    }, [route.pathname]
  )
  return (
    <div className="w-1/5 h-full pr-2 pl-4 pb-4 text-white flex flex-col justify-between ">
      <div className="flex flex-col gap-2">
        <MenuItem
          onClick={navigate.bind(this, "")}
          icon={<CiFolderOn />}
          content="All Boards"
          selected={currentRoute === ""}
        />

        <MenuItem
          onClick={toggleSessionMenu}
          icon={<CiVideoOn />}
          content="Sessions"
        />
        {
          showSessionMenu && (

            <div className="pl-9 gap-2 flex flex-col">
              <MenuItem
                onClick={navigate.bind(this, "create-session/new")}
                icon={<FaPlus />}
                content="Create"
                small
                selected={currentRoute === "/create-session/new"}
              />
              <MenuItem
                onClick={navigate.bind(this, "join-session")}
                icon={<SlCursor />}
                content="Join"
                small
                selected={currentRoute === "/join-session"}
              />
            </div>
            
          )
        }
        <MenuItem
          onClick={navigate.bind(this, "chat")}
          icon={<BsChatDots />}
          content="Chat"
          selected={currentRoute === "/chat"}
        />

      </div>
    </div>
  );
};
export default LeftMenu;
