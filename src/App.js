import { Route, Routes, useNavigate } from "react-router-dom";
import Auth from "./routes/auth.route";
import Home from "./routes/home.route";
import { useEffect } from "react";
import { getCurrentUser } from "./utils/firebase-utils";
import useUserContext from "./context/user/useUserContext";

const App = () => {
  const { setCurrentUser } = useUserContext()
  const navigate = useNavigate()
 
  useEffect(
    () => {
      const sub = async () => {
        const { displayName , email , uid} = await getCurrentUser()
        setCurrentUser({
          email,
          uid,
          username: displayName
        })
        navigate("/")
      }
      sub()
    }, []
  )
  return (
    <Routes>
      <Route path="/auth" element={<Auth />}/>
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default App;
