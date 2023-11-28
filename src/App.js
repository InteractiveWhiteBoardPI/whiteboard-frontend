import { Route, Routes, useNavigate } from "react-router-dom";
import Auth from "./routes/auth.route";
import Home from "./routes/home.route";
import { useEffect } from "react";
import { getCurrentUser } from "./utils/firebase-utils";
import useUserContext from "./context/user/useUserContext";
import Chat from "./routes/chat.route";

const App = () => {
  const { setCurrentUser } = useUserContext()
  const navigate = useNavigate()
 
  useEffect(
    () => {
      const sub = async () => {
        const user = await getCurrentUser()
        console.log(user)
        if(!user) return
        const { email , uid , displayName } = user
        setCurrentUser({
          email,
          uid,
          username: displayName
        })
        //navigate("/")
      }
      sub()
    }, []
  )
  return (
    <Routes>
      <Route path="/auth" element={<Auth />}/>
      <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<Chat/>}/>
    </Routes>
  );
};

export default App;
