import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { socket } from "../../socket";

import BunkerPanel from "../../components/BunkerPanel/BunkerPanel";
import PlayerList from "../../components/PlayerList/PlayerList";
import InviteLink from "../../components/InviteLink/InviteLink";
import BunkerButton from "../../components/BunkerButton/BunkerButton";

import s from "./RoomView.module.css";

export default function RoomView() {
  const [params] = useSearchParams();
  const roomId = params.get("room");

  const [players, setPlayers] = useState([]);
  const [host, setHost] = useState("");
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    socket.emit("getRoomState", roomId);

    socket.once("roomState", ({ players, host, name }) => {
      setPlayers(players);
      setHost(host);
      setRoomName(name);
      setLoading(false);
    });

    socket.on("playerJoined", ({ players, host, name }) => {
      setPlayers(players);
      setHost(host);
      setRoomName(name);
    });

    return () => {
      socket.off("playerJoined");
    };
  }, []);

  const isHost = host === localStorage.getItem("nickname");
  const canStart = players.length >= 4;

  if (loading) {
    return <BunkerPanel title="Завантаження..." subtitle="Зачекай трохи" />;
  }

  return (
    <BunkerPanel
      title={`Кімната: ${roomName}`}
      subtitle={`Очікування гравців… (${players.length}/10)`}
      secondSubtitle={`Індетифікатор кімнати (${roomId})`}
    >
      <InviteLink roomId={roomId} />

      <div className={s.playersBlock}>
        <h3 className={s.label}>Гравці</h3>
        <PlayerList players={players} host={host} />
      </div>

      {isHost && (
        <BunkerButton disabled={!canStart}>
          Почати гру
        </BunkerButton>
      )}
    </BunkerPanel>
  );
}
