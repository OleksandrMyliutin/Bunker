import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";

import BunkerPanel from "../../components/BunkerPanel/BunkerPanel";
import BunkerInput from "../../components/BunkerInput/BunkerInput";
import BunkerButton from "../../components/BunkerButton/BunkerButton";

import styles from "./CreateRoom.module.css";

function generateRoomCode() {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
}

export default function CreateRoom() {
  const [nickname, setNickname] = useState("");
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const create = () => {
    setError("");

    if (!nickname.trim()) return setError("Введи нік.");
    if (!roomName.trim()) return setError("Введи назву кімнати.");

    const roomId = generateRoomCode();

    socket.emit("createRoom", { roomId, nickname });

    socket.once("roomCreated", () => {
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("roomId", roomId);
      navigate(`/room?room=${roomId}`);
    });
  };

  return (
    <BunkerPanel title="Створення кімнати" subtitle="Задай назву та нік">
      <div className={styles.wrapper}>
        <BunkerInput
          placeholder="Твій нік"
          value={nickname}
          onChange={setNickname}
        />

        <BunkerInput
          placeholder="Назва кімнати"
          value={roomName}
          onChange={setRoomName}
        />

        <BunkerButton onClick={create}>
          Створити кімнату
        </BunkerButton>

        {error && <div className={styles.error}>{error}</div>}
      </div>
    </BunkerPanel>
  );
}
