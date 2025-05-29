import React, { useState } from "react";
import Line from "../../img/EditLine.svg";
import Cross from "../../img/Cross.svg";
import { Mob } from "../../block/game/types";
import axios from "axios";

type props = {
  setIsCreateEffect: React.Dispatch<React.SetStateAction<boolean>>;
};
type Form = {
  name: string;
  health: number;
  // psih: number;
  speed: number;
  manevr: number;
};

export default function UserCreateEffectForm({ setIsCreateEffect }: props) {
  const [Data, setData] = useState<Form>({
    name: "",
    health: 0,
    // psih: 0,
    speed: 0,
    manevr: 0,
  });
  const headersWithKeys = [
    { label: "ИМЯ", key: "name" },
    { label: "МАКС-ЗДОРОВЬЕ", key: "health" },
    // { label: "МАКС-ПСИХИКА", key: "psih" },
    { label: "CКОРОСТЬ", key: "speed" },
    { label: "МАНЕВР", key: "manevr" },
    // { label: "ОРУЖИЕ", key: "manevr" },
    // { label: "БРОНЯ", key: "manevr" },
    // { label: "СПОСОБНОСТИ, 6шт", key: "manevr" },
  ];
  const fetchData = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: ["health", "psih", "speed", "manevr"].includes(name)
        ? Number(value)
        : value,
    }));
  };
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const host = "http://localhost:3000/construct-user";
      const responce = await axios.post(`${host}/createMob`, Data, {
        withCredentials: true,
      });
    } catch (error) {}
  };
  const header = "Введите данные для создания оружия";

  return (
    <div className="w-screen h-screen bg-custom-fon-darkGray top-0 fixed z-[1000] flex items-center justify-center ">
      <div className="relative bg-custom-darkGray w-fit rounded-[20px] p-8">
        <button
          onClick={() => setIsCreateEffect(false)}
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
            <p className="text-white font-medium">Создать моба</p>
          </button>
        </form>
      </div>
    </div>
  );
}
