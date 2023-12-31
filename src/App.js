import { Route, Routes, useNavigate } from "react-router-dom";
import Auth from "./routes/auth.route";
import Home from "./routes/home.route";
import Whiteboard from "./routes/whiteboard.route";
import { useEffect } from "react";
import { getCurrentUser } from "./utils/firebase-utils";
import useUserContext from "./context/user/useUserContext";
import Chat from "./routes/chat.route";
import CreateSession from "./routes/create-session.route";
import WhiteboardViewer from "./routes/whiteboard-viewer.route";
import Session from "./routes/session.route";
import StarredWhiteboards from "./routes/starred-whiteboards.route";
import JoinSession from "./routes/join-session.route";
import InteractiveWhiteboard from "./routes/intercative-whiteboard.route";
import SessionBody from "./routes/session-body.route";

const App = () => {
  const { setCurrentUser } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    const sub = async () => {
      const user = await getCurrentUser();
      if (!user) return;
      const { email, uid, displayName } = user;
      setCurrentUser({
        email,
        uid,
        username: displayName || email.split("@")[0],
      });
      //navigate("/home")
    };
    sub();
  }, []);
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/home" element={<Home />}>
        <Route index element={<WhiteboardViewer />} />
        <Route path="starred" element={<StarredWhiteboards />} />
        <Route path="join-session" element={<JoinSession />} />
        <Route path="create-session/*" element={<CreateSession />} />
        <Route path="chat" element={<Chat />} />
      </Route>
      <Route path="session/:id" element={<Session />}>
        <Route index element={<SessionBody />} />
        <Route path="whiteboard" element={<InteractiveWhiteboard />} />
      </Route>
      <Route path="/whiteboard/*" element={<Whiteboard />} />
    </Routes>
  );
};

export default App;
