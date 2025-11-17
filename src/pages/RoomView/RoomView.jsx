import { useEffect, useState } from "react";
import BunkerPanel from "../../components/BunkerPanel/BunkerPanel";
import { socket } from "../../socket";
import { useSearchParams } from "react-router-dom";
import s from "./RoomView.module.css";

export default function RoomView() {
  const [params] = useSearchParams();
  const roomId = params.get("room");

  const [players, setPlayers] = useState([]);
  const [host, setHost] = useState("");

  useEffect(() => {
    // Отримуємо стан кімнати при вході
    socket.emit("getRoomState", roomId);

    socket.on("roomState", ({ players, host }) => {
      setPlayers(players);
      setHost(host);
    });

    // Коли хтось заходить
    socket.on("playerJoined", ({ players }) => {
      setPlayers(players);
    });

    return () => {
      socket.off("playerJoined");
      socket.off("roomState");
    };
  }, []);

  return (
    <BunkerPanel
      title={`Кімната ${roomId}`}
      subtitle="Очікування гравців..."
    >
      <div className={s.block}>
        <h3 className={s.label}>Гравці</h3>

        <ul className={s.list}>
          {players.map((p, i) => (
            <li key={i} className={s.player}>
              {p}
              {p === host && <span className={s.hostTag}>Хост</span>}
            </li>
          ))}
        </ul>
      </div>
    </BunkerPanel>
  );
}
