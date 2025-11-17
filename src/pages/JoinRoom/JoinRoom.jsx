import { useState, useEffect } from "react";
import BunkerPanel from "../../components/BunkerPanel/BunkerPanel";
import { socket } from "../../socket";
import { useNavigate, useSearchParams } from "react-router-dom";
import s from "./JoinRoom.module.css";

export default function JoinRoom() {
  const [nickname, setNickname] = useState("");
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const [params] = useSearchParams();

  // Автопідставлення коду з запрошення
  useEffect(() => {
    const code = params.get("room");
    if (code) setRoomId(code.toUpperCase());
  }, []);

  const joinRoom = () => {
    if (!nickname.trim()) {
      setError("Введи свій нік.");
      return;
    }
    if (!roomId.trim()) {
      setError("Введи код кімнати.");
      return;
    }

    socket.emit("joinRoom", { roomId, nickname });

    socket.on("roomNotFound", () => {
      setError("Такої кімнати не існує.");
    });

    socket.on("roomJoined", () => {
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("roomId", roomId);
      navigate(`/room?room=${roomId}`);
    });
  };

  return (
    <BunkerPanel
      title="Приєднання"
      subtitle="Введи код і займи місце в бункері."
    >
      <div className={s.form}>
        <input
          className={s.input}
          placeholder="Нік"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <input
          className={s.input}
          placeholder="Код кімнати"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value.toUpperCase())}
        />

        <button className={s.btn} onClick={joinRoom}>
          Увійти
        </button>

        {error && <p className={s.error}>{error}</p>}
      </div>
    </BunkerPanel>
  );
}
