import { useState, useEffect } from "react";
import React from "react";
import Bascet from "../img/Bascket.svg";
import Edit from "../img/Edit.svg";
import AminModalBlockMenu from "./adminModalBlock/AminModalBlockMenu";
import axios from "axios";
import AdminTariffForm from "../component/Form/AdminTariffForm";
import RedButton from "../component/Button/RedButton";
export default function AdminPanelTarif() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const tableHeadersWithKeys = [
    { label: "ID", key: "idTariff" },
    { label: "Имя", key: "name" },
    // { label: "Фамиля", key: "secondname" },
    // { label: "ЭЛЕКТРОННАЯ ПОЧТА", key: "email" },
    // { label: "ПАРОЛЬ", key: "password" },
    // { label: "НИКНЕЙМ", key: "nickname" },
    // { label: "ТЕЛЕФОН", key: "phone" },
    { label: "СТАТУС", key: "status" },
    // { label: "ДАТА СОЗДАНИЯ", key: "createdAt" },
  ];

  type Tariff = {
    idTariff: number;
    name: string;
  };
  const [selectedTariff, setSelectedUser] = useState<Tariff | null>(null);
  const [allTariff, setAllTariffs] = useState<Tariff[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/find/tariffs");
        setAllTariffs(response.data);
        console.log("Tariff:", response.data);
      } catch (error) {
        console.log("не получилось получить данные про пользователей", error);
      }
    };
    fetchUsers();
  }, []);
  // function qwe() {
  //   setIsCreate(!isCreate)
  //   console.log(isCreate)
  // }
  return (
    <div>
      <AdminTariffForm
        tableHeadersWithKeys={tableHeadersWithKeys}
        isDelete={isDelete}
        setIsDelete={setIsDelete}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        selectedTariff={selectedTariff}
        isCreate={isCreate}
        setIsCreate={setIsCreate}
      />
      <AminModalBlockMenu />
      <button onClick={() => setIsCreate(!isCreate)}>
        Создать новый тариф
      </button>
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
          {allTariff.map((tariff, key) => (
            <tr
              key={tariff.idTariff}
              className={`h-[69px] ${
                key % 2 === 1 ? "bg-white" : "bg-gray-200"
              }`}
            >
              {tableHeadersWithKeys.map((header, idx) => {
                const value = tariff[header.key as keyof Tariff];
                return <td key={idx}>{value ?? "Нет данных"}</td>;
              })}
              <td>
                <button
                  onClick={() => {
                    // console.log(tariff);
                    setIsEdit(!isEdit);
                    setSelectedUser(tariff);
                  }}
                  className="bg-custom-green hover-effect-btn-green w-[25px] h-[25px] rounded-[4px] p-[4px] mx-[10%]"
                >
                  <img src={Edit} alt="Edit" className="w-full" />
                </button>
                <button
                  onClick={() => {
                    // console.log(tariff);
                    setIsDelete(!isDelete);
                    setSelectedUser(tariff);
                  }}
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
