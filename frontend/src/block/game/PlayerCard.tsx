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
};
export default function PlayerCard({
  setIsYourTurn,
  MobIsNowTurn,
  setIsReplaceMob,
  setReplaceMob,
  soket,
}: props) {
  const endTurn = function () {
    setIsYourTurn(false);
    const token = window.location.pathname.split("/").pop();

    soket?.emit("endTurn", {
      MobIsNowTurn: MobIsNowTurn,
      idSession: token,
    });
  };
  return (
    <div className="absolute left-[50%] translate-x-[-50%] bottom-0 w-[500px] h-[300px] bg-white">
      ваш персонаж
      {MobIsNowTurn?.name}
      {MobIsNowTurn?.health}
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
        <button className="bg-custom-red text-white p-2 rounded-[20px]">
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
