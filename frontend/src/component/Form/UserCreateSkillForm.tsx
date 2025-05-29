import React, { useState } from "react";
import Line from "../../img/EditLine.svg";
import Cross from "../../img/Cross.svg";
import { Mob } from "../../block/game/types";
import axios from "axios";
import AllMessages from "../messages/AllMessages";

type props = {
  setIsCreateSkill: React.Dispatch<React.SetStateAction<boolean>>;
};
type Form = {
  name: string;
  timeout: number;
  damageMin: number;
  damageMax: number;
  // issupport: boolean;
  range: number;
};

export default function UserCreateSkillForm({ setIsCreateSkill }: props) {
    const [status, setStatus] = useState<number | string>();

  const [Data, setData] = useState<Form>({
    name: "",
    timeout: 0,
    damageMin: 0,
    damageMax: 0,
    range: 0,
    // issupport: false
  });
  const headersWithKeys = [
    { label: "НАЗВАНИЕ", key: "name" },
    { label: "ХОДОВ ОЖИДАНИЯ ПОТВОРНОГО ИСПОЛЬЗОВАНИЯ", key: "timeout" },
    { label: "МИНИМАЛЬНЫЙ УРОН", key: "damageMin" },
    { label: "МАКСИМАЛЬНЫЙ УРОН ", key: "damageMax" },
    { label: "РАДИУС ИСПОЛЬЗОВАНИЯ", key: "range" },
    // { label: "ОРУЖИЕ", key: "manevr" },
    // { label: "БРОНЯ", key: "manevr" },
    // { label: "СПОСОБНОСТИ, 6шт", key: "manevr" },
  ];
  const fetchData = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: ["damageMin", "damageMax", "range", "timeout"].includes(name)
        ? Number(value)
        : value,
    }));
  };
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const host = "http://localhost:3000/construct-user";
      const responce = await axios.post(`${host}/createSkill`, Data, {
        withCredentials: true,
      });
      setStatus(responce.status)
    } catch (error) {
      setStatus(500)
    }
  };
  const header = "Введите данные для создания способности";

  return (
    <div className="w-screen h-screen bg-custom-fon-darkGray top-0 fixed z-[1000] flex items-center justify-center">
      <div className="relative bg-custom-darkGray w-fit rounded-[20px] p-8">
        <button
          onClick={() => setIsCreateSkill(false)}
          className="bg-custom-red rounded-[10px] p-[10px] absolute right-[-15px] top-[-15px]"
        >
          <img src={Cross} alt="Cross" />
        </button>
        <form className="flex flex-col items-center" onSubmit={submitForm}>
          <p className="text-[24px] text-white font-medium">{`${header}`}</p>
          <img src={Line} alt="Line" />
          {headersWithKeys.map((header, index) => {
            return (
              <div className="flex flex-col w-full mt-[16px]" key={index}>
                <label
                  className="text-[16px] font-medium text-white pl-1"
                  htmlFor=""
                >
                  {header.label}
                </label>
                <input
                  className="h-[47px] rounded-[10px] w-full pl-1"
                  type="text"
                  onChange={fetchData}
                  name={`${header.key}`}
                />
              </div>
            );
          })}
          <button
            className="bg-custom-red hover-effect-btn-red rounded-[10px] w-full h-[47px] mt-[32px]"
            type="submit"
          >
            <p className="text-white font-medium">Создать способность</p>
          </button>
        </form>
      </div>
    </div>
  );
}
