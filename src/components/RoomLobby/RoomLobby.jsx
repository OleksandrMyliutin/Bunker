import React, { useState } from 'react'
import s from "./RoomLobby.module.css"  
function generateRoomCode() {
    return Math.random().toString(36).substring(2, 7).toUpperCase();
}

const RoomLobby = ({onStartGame }) => {
    const [nickname, setNickname] = useState("");
    const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [roomName, setRoomName] = useState("");
    const [joinCode, setJoinCode] = useState("");
    const [error, setError] = useState("");
    
    //Створення лобі
    const handleCreateRoom = () =>{
        setError("");
        if(!nickname.trim()){
            setError("Введіть нікнейм, сталкере.");
            return;
        }
        if(!roomName.trim()){
            setError("Дай своїй кімнаті назву.");
            return;
        }
            const code = generateRoomCode();
        //Колекція хоста
        const host = { 
            id:crypto.randomUUID(),
            nickname: nickname.trim(),
            isHost: true,
        };
        //Колекція кімнати
        const room = {
            id: crypto.randomUUID(),
            code: code,
            name: roomName.trim(),
            maxPlayers: 10,
            players: [host],
            status: "waiting..",
        };

        setRooms((prev) => [...prev, room]);
        setCurrentRoom(room);
    };

    const handleJoinRoom = () => {
        setError("");
        if(!nickname.trim()){
            setError("Введіть нікнейм, сталкере.");
            return;
        }
        if(!joinCode.trim()){
            setError("Дай своїй кімнаті назву.");
            return;
        }

        const room = rooms.find(
            (r) => r.code.toUpperCase() === joinCode.trim().toUpperCase()
        );

        if(!room){
            setError("Кімнату за таким кодом не знайдено")
            return;
        };
        if(room.players.length >= room.maxPlayers){
            setError("Ця кімната вже заповнена. 10/10");
            return;
        }

        const newPlayer = {
            id: crypto.randomUUID(),
            nickname: nickname.trim(),
            host: false,
        };

        const updateRoom = {
            ...room,
            players: [...room.players, newPlayer]
        };

        setRooms((prev) => {
            prev.map((r) => (r.id === room.id ? updateRoom : r));
        });
        setCurrentRoom(updateRoom);
    };
    
    const handleStartGame = () => {
        if(!currentRoom) return;
        if(currentRoom.players.length < 4){
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
  // Якщо вже в кімнаті — показуємо саму кімнату
    return (
        <div className={s.roomWrapper}>
        <h2>Кімната: {currentRoom.name}</h2>
        <p>Код кімнати: <strong>{currentRoom.code}</strong></p>

        <h3>Гравці ({currentRoom.players.length}/{currentRoom.maxPlayers})</h3>
        <ul>
            {currentRoom.players.map((p) => (
            <li key={p.id}>
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
        )
}

export default RoomLobby



