import ControlMenu from "../components/session/control-menu/control-menu.component";
import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import useSessionContext from "../context/session/useSessionContext";
import useCallContext from "../context/call/useCallContext";
import useUserContext from "../context/user/useUserContext";
import UseChatContext from "../context/chat/useChatContext";
import socket from "../utils/Socket";
const SessionCreated = () => {
  const {session, setSession} = useSessionContext()
  const {currentUser} = useUserContext()
  const {initializeCall, pinUser} = useCallContext()
  const { id } = useParams()
  const navigate = useNavigate()
  const { setSessionMessages } = UseChatContext()

  useEffect(() => {
    if(!currentUser) return
    const messageCallback = ({ body }) => {
        const msg = JSON.parse(body);
        setSessionMessages((prev) => {
            const addedMessages = [...prev, msg];
            return Array.from(
                new Set(addedMessages.map(JSON.stringify))
            ).map(JSON.parse);
        });
    };

    socket.subscribe(`/user/${id}/private`, messageCallback);
}, [id]);

  useEffect(
    () => {
      if (!id) return navigate("/home")
      const getSession = async () => {
        try {
          const res = await fetch(`http://localhost:8080/session/get/${id}`)
          if (!res.ok) return navigate("/home")
          const data = await res.json()
          setSession(data)
        } catch (err) {
          navigate("/home")
        }
      }
      getSession()
    }, []
  )

  useEffect(
    () => {
      if (!session.uid || !currentUser) return
      initializeCall(session.uid, currentUser.uid)
      pinUser(currentUser.uid)
    }, [session, currentUser]
  )

  return (
    <div className="flex flex-col items-center justify-center h-screen py-6 gap-10">
      <Outlet />

      <ControlMenu />
    </div>
  );
};
export default SessionCreated;
