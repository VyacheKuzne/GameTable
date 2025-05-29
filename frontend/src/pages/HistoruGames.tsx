import React, { useEffect, useState } from "react";
import Header from "../block/Header";
import axios from "axios";
export default function HistoruGames() {
  const headersTable = [
    "Дата",
    "Продолжительность",
    "Количество игроков",
    "Статус",
    "Ключ",
    "Оставшееся время по вашему тарифу",
  ];
  type GameHub = {
    idSession: number;
    token: string;
    status: string;
    createdAt: Date;
    updateAT: Date;
  };
  const [historyGame, setHistoryGame] = useState<GameHub[]>([]);
//   useEffect(() => {
//     try {
//       const host = "http://localhost:3000";
//       const responce = axios.get("");
//     } catch (error) {}
//   });
  return (
    <div>
      <Header />
      <div className="w-[80%] m-auto rounded-[20px] p-[45px] bg-white">
        <table className="w-full">
          <tr className="felx justify-between items-center">
            {headersTable.map((key, index) => (
              <td className="text-center text-[24px] font-medium" key={index}>
                {key}
              </td>
            ))}
          </tr>
        </table>
      </div>
    </div>
  );
}
