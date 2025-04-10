// frontend/src/components/ChatBlock.tsx
import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import ChatButton from "../../img/ChatButton.svg";
import axios from "axios";

export default function ChatBlock() {
  const [messages, setMessage] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
   async function viewMessage() {
    try {
      const response = await axios.get('http://localhost:3000/api/chat')
      console.log("а вот и данные", response.data)
      setMessage(response.data)
    } catch (error) {
      console.log("есть ошибка", error)
    }
  }
  const socket = io("http://localhost:3000");
  type Message = {
    id: number;
    text: string;
  };

  useEffect(() => {
    console.log('запустился')
    viewMessage()
    socket.on("messages", (data: Message[]) => {
      setMessage(data);
      console.log(messages)
    });
    return () => {
      socket.off("messages");
    };
  }, []);
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    socket.emit("messages", { text: newMessage });
    setNewMessage('');
  };
 
  return (
    <div className="border-2 border-black w-[500px] h-[500px] my-[10%] rounded-l-[20px] p-[1.5%] relative flex flex-col justify-between">
      <div className="flex flex-col justify-between h-full">
        <div className="flex m-auto items-center w-1/6 justify-around">
          <p className="text-[24px] font-medium">Чат</p>
          <button>
            <img src={ChatButton} alt="ChatButton" />
          </button>
        </div>
        {/* чат-сообщения */}
        <div className="h-full overflow-y-auto ps-4 max-h-[calc(100vh-7.5rem)]">
          {messages.map((msg)=>(
            <div key={msg.id}>
              🗨️ {msg.text}
            </div>
          ))}
        </div>
      </div>

      {/* поле ввода */}
      <div className="flex w-full h-[10%] absolute bottom-[-55px]">
        <input
          type="text"
          placeholder="Сообщение..."
          className="flex w-full h-full pl-2 bg-custom-darkGray rounded-3xl text-white"
          value={newMessage}
          onChange={(e)=> setNewMessage(e.target.value)}
        />
             <button onClick={sendMessage}>Отправить</button>
      </div>
    </div>
  );
}
