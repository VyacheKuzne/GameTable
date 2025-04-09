import { useState, useEffect } from 'react';
import React from "react";
import Bascet from '../img/Bascket.svg';
import Edit from '../img/Edit.svg';
import AminModalBlockMenu from "./adminModalBlock/AminModalBlockMenu";
import axios from 'axios';

export default function AdminPanel() {

  const tableHeadersWithKeys = [
    { label: "ID", key: "id" },
    { label: "ФИО", key: "name" },
    { label: "ЭЛЕКТРОННАЯ ПОЧТА", key: "email" },
    { label: "ТЕЛЕФОН", key: "phone" },
    { label: "ТАРИФ", key: "tariff" },
  ];

  type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
    password: string;
    status?: string;
    tariff?: string;
  };

  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/find/allUser');
        setAllUsers(response.data);
        console.log('Users:', response.data);
      } catch (error) {
        console.log('не получилось получить данные про пользователей', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <AminModalBlockMenu />
      <table className="m-auto text-center absolute top-[3%] left-1/3">
        <thead>
          <tr className="bg-white h-[69px] rounded-tr-[20px] rounded-tl-[20px]">
            {tableHeadersWithKeys.map((header, key) => (
              <td key={key}>{header.label}</td>
            ))}
            <td className="rounded-tr-[20px]">ДЕЙСТВИЕ</td>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, key) => (
            <tr
              key={user.id}
              className={`h-[69px] ${key % 2 === 1 ? 'bg-white' : 'bg-gray-200'}`}
            >
              {tableHeadersWithKeys.map((header, idx) => {
                const value = user[header.key as keyof User]; 
                return (
                  <td key={idx}>
                    {value ?? 'Нет данных'}
                  </td>
                );
              })}
              <td>
                <button className="bg-custom-green w-[25px] h-[25px] rounded-[4px] p-[4px] mx-[10%]">
                  <img src={Edit} alt="Edit" className="w-full" />
                </button>
                <button className="bg-custom-red w-[25px] h-[25px] rounded-[4px] p-[4px] mx-[10%]">
                  <img src={Bascet} alt="Basket" className="w-full" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
