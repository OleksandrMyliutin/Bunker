import { Route, Routes, useNavigate } from "react-router-dom"
import LiveApocalypseBackground from "./components/LiveApocalypseBackground/LiveApocalypseBackground"
import RoomLobby from "./components/RoomLobby/RoomLobby"

function App() {
  const navigate = useNavigate();

  const handleStartGame = (roomData) => {
    console.log("Стартуємо гру з кімнатою:", roomData);
    navigate("/game"); // або будь-який інший шлях
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<LiveApocalypseBackground/>}/>
        <Route path="/startGame" element={<RoomLobby onStartGame={handleStartGame} />} />
      </Routes>
    </>
  )
}

export default App
