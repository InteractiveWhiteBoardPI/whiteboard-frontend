import { Route, Routes } from "react-router-dom";
import Whiteboard from "./routes/whiteboard.route";

const App = () => {
  return (
    <Routes>
      <Route path="/whiteboard" element={<Whiteboard/>}/>
    </Routes>
  );
};

export default App;