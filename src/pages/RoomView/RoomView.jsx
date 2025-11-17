import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { socket } from "../../socket";

import BunkerPanel from "../../components/BunkerPanel/BunkerPanel";
import PlayerList from "../../components/PlayerList/PlayerList";
import InviteLink from "../../components/InviteLink/InviteLink";
import BunkerButton from "../../components/BunkerButton/BunkerButton";

import styles from "./RoomView.module.css";

export default function RoomView() {
  const [params] = useSearchParams();
  const roomId = params.get("room");

  const [players, setPlayers] = useState([]);
  const [host, setHost] = useState("");
  const [loading, setLoading] = useState(true);

  // отримуємо стан кімнати при вході
  useEffect(() => {
    socket.emit("getRoomState", roomId);

    socket.once("roomState", ({ players, host }) => {
      setPlayers(players);
      setHost(host);
      setLoading(false);
    });

    socket.on("playerJoined", ({ players, host }) => {
      setPlayers(players);
      setHost(host);
    });

    return () => {
      socket.off("playerJoined");
    };
  }, []);

  if (loading) {
    return (
      <BunkerPanel title="Завантаження..." subtitle="Зачекай трохи" />
    );
  }

  return (
    <BunkerPanel
      title={`Кімната ${roomId}`}
      subtitle="Очікування гравців"
    >
      <InviteLink roomId={roomId} />

      <div className={styles.playersBlock}>
        <h3 className={styles.label}>Гравці</h3>

        <PlayerList players={players} host={host} />
      </div>

      {host === localStorage.getItem("nickname") && (
        <BunkerButton>Почати гру</BunkerButton>
      )}
    </BunkerPanel>
  );
}
