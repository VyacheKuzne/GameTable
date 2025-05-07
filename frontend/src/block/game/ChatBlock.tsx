import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import ChatButton from "../../img/ChatButton.svg";
import axios from "axios";
import chatSvg from '../../img/chatSvg.svg'
type Props = {
  socket: Socket | null;
};

type Message = {
  id: number;
  text: string;
  idSession: string;
};

export default function ChatBlock({ socket }: Props) {
  const [messages, setMessage] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isChatVisible, setIsChatVisible] = useState(true);

  const token = window.location.pathname.split("/").pop();

  useEffect(() => {
    if (!token) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/gamePage/${token}/getMessage`
        );
        setMessage(response.data);
      } catch (error) {
        console.error("Ошибка загрузки сообщений:", error);
      }
    };

    fetchMessages();

    // Подписка на новые сообщения
    socket?.on("messages", (data: Message[]) => {
      setMessage(data); // ✅ заменяем список целиком, без дублирования
    });

    return () => {
      socket?.off("messages");
    };
  }, [socket, token]);

  const sendMessage = () => {
    if (!newMessage.trim() || !token) return;

    socket?.emit("messages", { text: newMessage, idSession: token });
    setNewMessage(""); // только сброс поля, без локального setMessage
  };

  const toggleChat = () => {
    setIsChatVisible((prev) => !prev);
  };

  return (
    <div
      className={`bg-white shadow-md border w-[500px]  rounded-l-[20px] relative flex flex-col justify-between ${
        isChatVisible ? "h-[500px]" : "h-[70px]"
      } transition-all duration-300`}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex m-auto items-center w-1/6  h-[10%]justify-around">
          <p className="text-[24px] font-medium">Чат</p>
          <button onClick={toggleChat}>
            <img src={ChatButton} alt="ChatButton" />
          </button>
        </div>
        <div
          className={`h-[80%] items-start overflow-y-auto ps-4 max-h-[calc(90vh-7.5rem)] ${
            isChatVisible ? "" : "hidden"
          }`}
        >
          {messages.map((msg) => (
            <div key={msg.id}>🗨️ {msg.text}</div>
          ))}
        </div>
        {isChatVisible && (
          <div className="flex items-center w-full px-2 h-[10%]">
            <input
              type="text"
              placeholder="Сообщение..."
              className="flex w-full h-full pl-2 bg-custom-darkGray rounded-3xl text-white"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />
            <button onClick={sendMessage} className="h-full">
              <img className="h-full" src={chatSvg} alt="chatSvg" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
