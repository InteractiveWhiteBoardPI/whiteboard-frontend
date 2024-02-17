import ControlMenu from "../components/session/control-menu/control-menu.component";
import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import useSessionContext from "../context/session/useSessionContext";

const SessionCreated = () => {
  const {session, setSession} = useSessionContext()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(
    () => {
      if (!id) return navigate("/home")
      if (id) return
      const getSession = async () => {
        try {
          const res = await fetch(`http://localhost:8080/session/get/${id}`)
          if (!res.ok) return navigate("/home")
          const data = await res.json()
          setSession(data)
        } catch (err) {
          console.log(err)
          navigate("/home")
        }
      }
      getSession()
    }, []
  )

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 gap-10">
      <Outlet />

      <ControlMenu />
    </div>
  );
};
export default SessionCreated;
