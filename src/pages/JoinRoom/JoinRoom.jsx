import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { socket } from "../../socket";

import BunkerPanel from "../../components/BunkerPanel/BunkerPanel";
import BunkerButton from "../../components/BunkerButton/BunkerButton";

import s from "./JoinRoom.module.css";

export default function JoinRoom() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const autoRoom = params.get("room");

  const [nickname, setNickname] = useState(localStorage.getItem("nickname") || "");
  const [roomCode, setRoomCode] = useState(autoRoom || "");
  const [error, setError] = useState("");

  // Auto-fill if joined via link
  useEffect(() => {
    if (autoRoom) setRoomCode(autoRoom.toUpperCase());
  }, [autoRoom]);

  // Listeners
  socket.on("roomError", (msg) => setError(msg));

  socket.on("roomJoined", ({ roomId }) => {
    navigate(`/room?room=${roomId}`);
  });

  const handleJoin = () => {
    setError("");

    if (!nickname.trim()) return setError("Введи нікнейм.");
    if (!roomCode.trim()) return setError("Введи код кімнати.");

    localStorage.setItem("nickname", nickname.trim());

    socket.emit("joinRoom", {
      nickname: nickname.trim(),
      roomId: roomCode.trim().toUpperCase(),
    });
  };

  return (
    <BunkerPanel title="Вхід у кімнату" subtitle="Сталкере, введи код">
      
      <div className={s.block}>
        <label>Нікнейм</label>
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Shurik"
        />
      </div>

      <div className={s.block}>
        <label>Код кімнати</label>
        <input
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          placeholder="Наприклад: UOW6E"
        />
      </div>

      <BunkerButton onClick={handleJoin}>
        Приєднатися
      </BunkerButton>

      {error && <p className={s.error}>{error}</p>}
    </BunkerPanel>
  );
}
