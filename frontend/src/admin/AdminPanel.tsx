import { table } from "console";
import React from "react";
import Bascet from '../img/Bascket.svg'
import Edit from '../img/Edit.svg'
import AminModalBlockMenu from "../component/ModalBlock/AminModalBlockMenu";
export default function AdminPanel() {

  const tableHeaders: (keyof User)[] = [
    "ID",
    "ФИО",
    "ЭЛЕКТРОННАЯ ПОЧТА",
    "ТЕЛЕФОН",
    "СТАТУС",
    "ТАРИФ",
  ];
  type User = {
    ID: number;
    ФИО: string;
    "ЭЛЕКТРОННАЯ ПОЧТА": string;
    ТЕЛЕФОН: string;
    СТАТУС: string;
    ТАРИФ: string;
  };
  const allUsers: Record<number, User> = {
    1: {
      ID: 1,
      ФИО: "Иванов Иван Иванович",
      "ЭЛЕКТРОННАЯ ПОЧТА": "ivanov@example.com",
      ТЕЛЕФОН: "+7 900 123-45-67",
      СТАТУС: "Активен",
      ТАРИФ: "Премиум",
    },
    2: {
      ID: 2,
      ФИО: "Петрова Мария Сергеевна",
      "ЭЛЕКТРОННАЯ ПОЧТА": "petrova@example.com",
      ТЕЛЕФОН: "+7 901 234-56-78",
      СТАТУС: "Активен",
      ТАРИФ: "Базовый",
    },
    3: {
      ID: 3,
      ФИО: "Сидоров Алексей Николаевич",
      "ЭЛЕКТРОННАЯ ПОЧТА": "sidorov@example.com",
      ТЕЛЕФОН: "+7 902 345-67-89",
      СТАТУС: "Активен",
      ТАРИФ: "Стандарт",
    },
  };
  // const tableLenth = (tableHeaders.length)
  return (
    <div>
      <AminModalBlockMenu/>
      <table className="m-auto text-center my-[5%]">
        <tr className="bg-white h-[69px]  rounded-tr-[20px] rounded-tl-[20px]">
          {tableHeaders.map((index, key) => (
            <td key={key}>{index}</td>
          ))}
          <td className="rounded-tr-[20px]">ДЕЙСТВИЕ</td>
        </tr>
        {Object.values(allUsers).map((user, key) => (
          <tr key={user.ID} className={`h-[69px] ${key % 2 === 1 ? 'bg-white' : 'bg-gray-200'}`}>
            {tableHeaders.map((header, idx) => (
              <td key={idx}>{user[header]}</td>
            ))}
            <td>
              <button className="bg-custom-green w-[25px] h-[25px] rounded-[4px] p-[4px] mx-[10%]">
                <img src={Edit} alt="Bascet" className="w-full"/>
              </button>
              <button className="bg-custom-red w-[25px] h-[25px] rounded-[4px] p-[4px] mx-[10%]">
                <img src={Bascet} alt="Bascet" className="w-full"/>
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
