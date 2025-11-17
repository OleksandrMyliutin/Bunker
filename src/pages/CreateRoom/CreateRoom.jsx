import { useState } from "react";
import BunkerPanel from "../../components/BunkerPanel/BunkerPanel";
import { socket } from "../../socket";
import { useNavigate } from "react-router-dom";
import s from "./CreateRoom.module.css";

export default function CreateRoom() {
  const [nick, setNick] = useState("");
  const [roomName, setRoomName] = useState("");
  const navigate = useNavigate();

  const create = () => {
    const roomId = Math.random().toString(36).substring(2, 7).toUpperCase();

    socket.emit("createRoom", { roomId, nickname: nick });

    socket.on("roomCreated", () => {
      localStorage.setItem("nickname", nick);
      localStorage.setItem("roomId", roomId);
      navigate(`/room?room=${roomId}`);
    });
  };

  return (
    <BunkerPanel title="Створення кімнати" subtitle="Підготуй бункер до виживання.">
      <div className={s.form}>
        <input className={s.input} placeholder="Нік" value={nick} onChange={e => setNick(e.target.value)} />
        <input className={s.input} placeholder="Назва кімнати" value={roomName} onChange={e => setRoomName(e.target.value)} />

        <button className={s.btn} onClick={create}>Створити</button>
      </div>
    </BunkerPanel>
  );
}
