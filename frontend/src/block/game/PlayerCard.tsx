import React from "react";
import { MobsOnTable } from "./types";
import { Socket } from "socket.io-client";

type props = {
  MobIsNowTurn?: MobsOnTable;
  setIsYourTurn: React.Dispatch<React.SetStateAction<boolean>>;
  soket: Socket | null;
  setIsReplaceMob: React.Dispatch<React.SetStateAction<boolean>>;
  setReplaceMob: React.Dispatch<React.SetStateAction<MobsOnTable | undefined>>;
  isReplaceMob: boolean;
  replaceMob: MobsOnTable | undefined;
  setIsModAtack: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function PlayerCard({
  setIsYourTurn,
  MobIsNowTurn,
  setIsReplaceMob,
  setReplaceMob,
  soket,
  setIsModAtack,
}: props) {
  const endTurn = function () {
    setIsYourTurn(false);
    const token = window.location.pathname.split("/").pop();

    soket?.emit("endTurn", {
      MobIsNowTurn: MobIsNowTurn,
      idSession: token,
    });
  };
  const currentHealth = MobIsNowTurn?.healthNow ?? 0;
  const maxHealth = MobIsNowTurn?.healthMax ?? 100;
  const percentage = (currentHealth / maxHealth) * 100;
  return (
    <div className="absolute left-[50%] p-2 rounded-[20px] shadow-md translate-x-[-50%] bottom-0 w-[500px] h-[300px] bg-white">
      <p className="text-[24px] font-medium">Лист персонажа: {MobIsNowTurn?.name}</p> 
      <span className="flex items-center justify-center text-white text-sm font-bold">
        Здоровье: {MobIsNowTurn?.healthNow} / {MobIsNowTurn?.healthMax}
      </span>
      {MobIsNowTurn ? (
        <>
          {/* Отображаем значения здоровья над баром */}
          <p>Здоровье: {MobIsNowTurn.healthNow} / {MobIsNowTurn.healthMax}</p>

          <div className="relative w-full h-10 bg-gray-300 rounded-md overflow-hidden">
            {/* Красный фон для текущего здоровья */}
            <div
              className="absolute top-0 left-0 h-full bg-custom-red transition-all duration-300"
              style={{ width: `${percentage}%` }}
            >
            </div>
          </div>
        </>
      ) : (
        <p>Информация о мобе недоступна</p>
      )}
      <div>
        <button
          onClick={() => {
            setIsReplaceMob(true);
            setReplaceMob(MobIsNowTurn);
          }}
          className="bg-custom-red text-white p-2 rounded-[20px] m-2"
        >
          двигаться
        </button>
        <button
          onClick={() => {
            setIsModAtack(true);
            setReplaceMob(MobIsNowTurn);
          }}
          className="bg-custom-red text-white p-2 rounded-[20px]"
        >
          атаковать
        </button>
        <button
          onClick={endTurn}
          className="bg-custom-red text-white p-2 rounded-[20px]"
        >
          закончить ход
        </button>
      </div>
    </div>
  );
}
