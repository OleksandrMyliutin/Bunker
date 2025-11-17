import React, { useEffect, useState } from "react";
import s from "./RoomLobby.module.css";
import { socket } from "../../socket";

function generateRoomCode() {
    return Math.random().toString(36).substring(2, 7).toUpperCase();
    }

    const RoomLobby = ({ onStartGame }) => {
    const [nickname, setNickname] = useState("");
    const [currentRoom, setCurrentRoom] = useState(null);
    const [roomName, setRoomName] = useState("");
    const [joinCode, setJoinCode] = useState("");
    const [error, setError] = useState("");


    useEffect(() => {
        socket.on("roomCreated", ({ roomId }) => {
        setCurrentRoom({
            code: roomId,
            name: roomName,
            players: [{ nickname, isHost: true }],
            maxPlayers: 10
        });
        });

        socket.on("roomNotFound", () => {
        setError("Кімнату за таким кодом не знайдено.");
        });

        socket.on("roomJoined", ({ roomId }) => {
        setCurrentRoom(prev => ({
            ...prev,
            code: roomId,
            maxPlayers: 10
        }));
        });

        socket.on("playerJoined", ({ players }) => {
        setCurrentRoom(prev => ({ ...prev, players }));
        });

        return () => {
        socket.off("roomCreated");
        socket.off("roomNotFound");
        socket.off("roomJoined");
        socket.off("playerJoined");
        };
    }, [roomName, nickname]);

    const handleCreateRoom = () => {
        setError("");

        if (!nickname.trim()) {
        setError("Введіть нікнейм, сталкере.");
        return;
        }

        if (!roomName.trim()) {
        setError("Дай своїй кімнаті назву.");
        return;
        }

        const code = generateRoomCode();

        socket.emit("createRoom", {
        roomId: code,
        nickname
        });
    };

    const handleJoinRoom = () => {
        setError("");

        if (!nickname.trim()) {
        setError("Введіть нікнейм, сталкере.");
        return;
        }

        if (!joinCode.trim()) {
        setError("Введіть код кімнати.");
        return;
        }

        socket.emit("joinRoom", {
        roomId: joinCode.trim(),
        nickname
        });
    };

    // Запуск гри
    const handleStartGame = () => {
        if (!currentRoom) return;

        if (currentRoom.players.length < 4) {
        setError("Потрібно мінімум 4 гравці, щоб почати гру.");
        return;
        }

        onStartGame?.(currentRoom);
    };

    if (!currentRoom) {
        return (
        <div className={s.lobbyWrapper}>
            <h2>Лобі Бункера</h2>

            <label>
            Нікнейм
            <input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Сталкер_1337"
            />
            </label>

            <div>
            <h3>Створити кімнату</h3>
            <input
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Наприклад: Бункер друзів"
            />
            <button onClick={handleCreateRoom}>Створити кімнату</button>
            </div>

            <div>
            <h3>Приєднатися до кімнати</h3>
            <input
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                placeholder="Введи код кімнати"
            />
            <button onClick={handleJoinRoom}>Приєднатися</button>
            </div>

            {error && <p style={{ color: "salmon" }}>{error}</p>}
        </div>
        );
    }

    return (
        <div className={s.roomWrapper}>
        <h2>Кімната: {currentRoom.name}</h2>
        <p>
            Код кімнати: <strong>{currentRoom.code}</strong>
        </p>

        <h3>
            Гравці ({currentRoom.players.length}/{currentRoom.maxPlayers})
        </h3>

        <ul>
            {currentRoom.players.map((p, index) => (
            <li key={index}>
                {p.nickname} {p.isHost && "(хост)"}
            </li>
            ))}
        </ul>

        {error && <p style={{ color: "salmon" }}>{error}</p>}

        <button
            onClick={handleStartGame}
            disabled={currentRoom.players.length < 4}
        >
            Почати гру
        </button>
        </div>
    );
};

export default RoomLobby;
