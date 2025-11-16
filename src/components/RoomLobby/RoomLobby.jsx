import React, { useState } from 'react'

function generateRoomCode() {
    return Math.random().toString(36).substring(2, 7).toUpperCase();
}

const RoomLobby = () => {
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
    };

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
            (r) => r.code.toUpperCase() === joinCode.trim.toUpperCase()
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
    
    
    

    return (
        <div>
        
        </div>
    )
}

export default RoomLobby
