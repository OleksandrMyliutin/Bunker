import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import CreateRoom from "./pages/CreateRoom/CreateRoom";
import JoinRoom from "./pages/JoinRoom/JoinRoom";
import RoomView from "./pages/RoomView/RoomView";
import LiveApocalypseBackground from "./pages/LiveApocalypseBackground/LiveApocalypseBackground";


export default function App() {
  return (

      <Routes>
        <Route path="/" element={<LiveApocalypseBackground />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/create" element={<CreateRoom />} />
        <Route path="/join" element={<JoinRoom />} />
        <Route path="/room" element={<RoomView />} />
      </Routes>
  );
}