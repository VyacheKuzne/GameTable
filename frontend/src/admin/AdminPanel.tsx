import { useState, useEffect } from "react";
import React from "react";
import Bascet from "../img/Bascket.svg";
import Edit from "../img/Edit.svg";
import AminModalBlockMenu from "./adminModalBlock/AminModalBlockMenu";
import axios from "axios";
import AdminUserForm from "../component/Form/AdminUserForm";
export default function AdminPanel() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const tableHeadersWithKeys = [
    { label: "ID", key: "id" },
    { label: "Имя", key: "name" },
    { label: "Фамиля", key: "secondname" },
    { label: "ЭЛЕКТРОННАЯ ПОЧТА", key: "email" },
    { label: "ПАРОЛЬ", key: "password" },
    { label: "НИКНЕЙМ", key: "nickname" },
    { label: "ТЕЛЕФОН", key: "phone" },
    // { label: "ТАРИФ", key: "tariff" },
    { label: "СТАТУС", key: "status" },
    { label: "ДАТА СОЗДАНИЯ", key: "createdAt" },
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
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/find/allUser");
        setAllUsers(response.data);
        console.log("Users:", response.data);
      } catch (error) {
        console.log("не получилось получить данные про пользователей", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <AdminUserForm
        tableHeadersWithKeys={tableHeadersWithKeys}
        isDelete={isDelete}
        setIsDelete={setIsDelete}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        selectedUser = {selectedUser}
      />
      <AminModalBlockMenu />
      <table className={`text-center  top-[3%] left-[calc(40%-280px)]`}>
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
              className={`h-[69px] ${
                key % 2 === 1 ? "bg-white" : "bg-gray-200"
              }`}
            >
              {tableHeadersWithKeys.map((header, idx) => {
                const value = user[header.key as keyof User];
                return <td key={idx}>{value ?? "Нет данных"}</td>;
              })}
              <td>
                <button
                  onClick={() => {
                    setIsEdit(!isEdit);
                    setSelectedUser(user);
                    // console.log(user)
                  }}
                  className="bg-custom-green w-[25px] h-[25px] rounded-[4px] p-[4px] mx-[10%]"
                >
                  <img src={Edit} alt="Edit" className="w-full" />
                </button>
                <button
                  onClick={() => setIsDelete(!isDelete)}
                  className="bg-custom-red w-[25px] h-[25px] rounded-[4px] p-[4px] mx-[10%]"
                >
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
