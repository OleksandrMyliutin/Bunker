import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { socket } from "../../socket";

import BunkerPanel from "../../components/BunkerPanel/BunkerPanel";
import BunkerInput from "../../components/BunkerInput/BunkerInput";
import BunkerButton from "../../components/BunkerButton/BunkerButton";

import styles from "./JoinRoom.module.css";

export default function JoinRoom() {
  const [nickname, setNickname] = useState("");
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");

  const [params] = useSearchParams();
  const navigate = useNavigate();

  // автопідставлення коду з URL
  useEffect(() => {
    const code = params.get("room");
    if (code) setRoomId(code.toUpperCase());
  }, []);

  const join = () => {
    setError("");

    if (!nickname.trim()) return setError("Введи нік.");
    if (!roomId.trim()) return setError("Введи код кімнати.");

    socket.emit("joinRoom", { roomId, nickname });

    socket.once("roomNotFound", () => setError("Кімната не знайдена."));

    socket.once("roomJoined", () => {
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("roomId", roomId);
      navigate(`/room?room=${roomId}`);
    });
  };

  return (
    <BunkerPanel title="Приєднання" subtitle="Введи нік і код, щоб увійти">
      <div className={styles.wrapper}>
        <BunkerInput
          placeholder="Твій нік"
          value={nickname}
          onChange={setNickname}
        />

        <BunkerInput
          placeholder="Код кімнати"
          value={roomId}
          onChange={(v) => setRoomId(v.toUpperCase())}
        />

        <BunkerButton onClick={join}>Увійти</BunkerButton>

        {error && <div className={styles.error}>{error}</div>}
      </div>
    </BunkerPanel>
  );
}
