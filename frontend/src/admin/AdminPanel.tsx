import { useState, useEffect } from "react";
import React from "react";
import Bascet from "../img/Bascket.svg";
import Edit from "../img/Edit.svg";
import AminModalBlockMenu from "./adminModalBlock/AminModalBlockMenu";
import axios from "axios";
import EditLine from "../img/EditLine.svg";
import RedButton from "../component/Button/RedButton";
import Cross from "../img/Cross.svg";
export default function AdminPanel() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
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
      <div
        className={`bg-custom-fon-darkGray fixed w-screen h-screen z-40 content-center ${
          isDelete || isEdit ? "block" : "hidden"
        }`}
      >
        <div
          className={`bg-custom-darkGray relative rounded-[20px] p-[1.8%] w-1/4 m-auto ${
            isEdit ? "block" : "hidden"
          }`}
        >
          <button
            onClick={() => {
              setIsEdit(false);
              setIsDelete(false);
            }}
            className="absolute right-[-10px] top-[-10px] bg-custom-red flex items-center justify-center w-[33px] h-[33px] rounded-[10px]"
          >
            <img src={Cross} alt="Cross" />
          </button>
          <div className="flex flex-col items-center">
            <p className="text-[22px] font-medium text-white">
              Изменить данные пользователя
            </p>
            <img src={EditLine} alt="EditLine" />
          </div>
          <div>
            <div className="flex flex-col">
              {tableHeadersWithKeys.map((tableHeaders) => {
                return (
                  <div className="flex flex-col my-[7.5px]">
                    <label
                      className="pl-2 text-white font-medium"
                      htmlFor={`${tableHeaders.key}`}
                    >
                      {tableHeaders.label}
                    </label>
                    <input
                      type="text"
                      placeholder={`${tableHeaders.label}`}
                      className="h-[47px] rounded-[10px] pl-2"
                    />
                  </div>
                );
              })}
              <RedButton
                text="Подтверждаю изменения"
                h="47px"
                type="submit"
                size="700"
              />
            </div>
          </div>
        </div>
        <div
          className={`bg-custom-darkGray relative rounded-[20px] p-[1.8%] w-1/4 m-auto ${
            isDelete ? "block" : "hidden"
          }`}
        >
          <button
            onClick={() => {
              setIsEdit(false);
              setIsDelete(false);
            }}
            className="absolute right-[-10px] top-[-10px] bg-custom-red flex items-center justify-center w-[33px] h-[33px] rounded-[10px]"
          >
            <img src={Cross} alt="Cross" />
          </button>
          <div className="flex flex-col items-center">
            <p className="text-[22px] font-medium text-white">
              Подтвердить удаление
            </p>
            <img src={EditLine} alt="EditLine" />
            <p className="text-center text-white font-bold my-[3%]">Вы действительно хотите удалить пользователя  №12312 ?</p>
          </div>
          <div>
            <div className="flex justify-around">
              <button className="w-[50px] h-[50px] bg-custom-red rounded-[10px]">
                <p className="text-white font-bold">ДА</p>
              </button>
              <button className="w-[50px] h-[50px] bg-custom-green rounded-[10px]">
                <p className="text-white font-bold">НЕТ</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <AminModalBlockMenu />
      <table className="w-1/2 text-center  top-[3%] left-[calc(40%-280px)]">
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
                  onClick={() => setIsEdit(!isEdit)}
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
