import React from "react";
import { Mob } from "./types";
import { Socket } from "socket.io-client";
import MobCell from "./MobCell";

type Props = {
  x: number;
  y: number;
  selectMob: Mob | undefined;
  isSelectMob: boolean;
  socket: Socket | null;
  placedMob?: { idMob: number; tokenMob: string };
  allMobs?: Mob[];
  setIsReplaceMob: React.Dispatch<React.SetStateAction<boolean>>;
  setReplaceMob: React.Dispatch<React.SetStateAction<Mob | undefined>>;
  isReplaceMob: boolean;
  replaceMob: Mob | undefined;
};

export default function GirdCellGame({
  x,
  y,
  socket,
  selectMob,
  isSelectMob,
  placedMob,
  allMobs,
  setIsReplaceMob,
  setReplaceMob,
  isReplaceMob,
  replaceMob,
}: Props) {
  async function setMobs() {
    const token = window.location.pathname.split("/").pop();
    if (isSelectMob && selectMob) {
      socket?.emit("newMobOnTable", {
        idMob: selectMob.id,
        x,
        y,
        idSession: token,
      });
    } else if (isReplaceMob && replaceMob) {
      socket?.emit("replaceMobOnTable", {
        idMob: replaceMob.id,
        x,
        y,
        idSession: token,
        tokenMob: replaceMob.tokenMob,
      });
      console.log("replaceMob" + replaceMob.tokenMob);
    }
  }

  const mobTemplate = placedMob
    ? allMobs?.find((mob) => mob.id === placedMob.idMob)
    : null;

  const renderedMob =
    mobTemplate && placedMob
      ? { ...mobTemplate, tokenMob: placedMob.tokenMob }
      : null;

  return (
    <div
      onClick={setMobs}
      className="w-[50px] h-[50px] bg-custom-darkGray border border-zinc-900 cursor-pointer"
    >
      {renderedMob && (
        <MobCell
          setIsReplaceMob={setIsReplaceMob}
          setReplaceMob={setReplaceMob}
          renderedMob={renderedMob}
        />
      )}
    </div>
  );
}
