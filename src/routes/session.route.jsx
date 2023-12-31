import ControlMenu from "../components/session/control-menu/control-menu.component";
import {useEffect} from "react";
import {Outlet, useParams} from "react-router-dom";

const SessionCreated = () => {
  const { id} = useParams()
  useEffect(
      () => {
          fetch("http://localhost:8080/session/get-members/"+id)
              .then(response => response.json())
              .then(json => console.log(json))
      }, [id]
  )

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 gap-10">
      <Outlet />

      <ControlMenu />
    </div>
  );
};
export default SessionCreated;
