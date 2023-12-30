import ControlMenu from "../components/session/control-menu/control-menu.component";
import SessionBody from "../components/session/session-body/session-body.component";
import {useEffect} from "react";
import useSessionContext from "../context/session/useSessionContext";
import {useLocation} from "react-router-dom";

const SessionCreated = () => {
    const location = useLocation()
  useEffect(
      () => {
          fetch("http://localhost:8080/session/get-members/"+location.pathname.split("/session/")[1])
              .then(response => response.json())
              .then(json => console.log(json))
      }, [location.pathname]
  )

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 gap-10">
      <SessionBody />

      <ControlMenu />
    </div>
  );
};
export default SessionCreated;
