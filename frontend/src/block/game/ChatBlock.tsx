// frontend/src/components/ChatBlock.tsx
import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import ChatButton from '../../img/ChatButton.svg';

const socket: Socket = io('http://localhost:3000'); // укажи нужный порт

export default function ChatBlock() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on('newMessage', (msg) => {
      setMessages((prev) => [...prev, msg.text]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('sendMessage', { text: message });
      setMessage('');
    }
  };
  useEffect(() => {
    socket.emit('getMessages');
    socket.on('messageHistory', (msgs) => {
      setMessages(msgs.map((m: any) => m.text));
    });
  }, []);
  return (
    <div className="border-2 border-black w-[500px] h-[500px] rounded-l-[20px] p-[1.5%] relative flex flex-col justify-between">
      <div className="flex flex-col justify-between h-full">
        <div className="flex m-auto items-center w-1/6 justify-around">
          <p className="text-[24px] font-medium">Чат</p>
          <button>
            <img src={ChatButton} alt="ChatButton" />
          </button>
        </div>

        {/* чат-сообщения */}
        <div className="flex-1 overflow-y-auto my-4 px-2">
          {messages.map((msg, i) => (
            <div key={i} className="mb-2 bg-gray-200 p-2 rounded-lg">
              {msg}
            </div>
          ))}
        </div>
      </div>

      {/* поле ввода */}
      <div className="flex w-full h-[10%] mt-2">
        <input
          type="text"
          placeholder="Сообщение..."
          className="flex w-full h-full pl-2 bg-custom-darkGray rounded-3xl text-white"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
      </div>
    </div>
  );
}
