import React, { useState } from "react";
import { Mob } from "./types";
import { Socket } from "socket.io-client";
type props = {
  x: number;
  y: number;
  selectMob: Mob | undefined;
  isSelectMob: boolean;
  socket:Socket|null;
};
export default function GirdCellGame({ x,socket, y, selectMob, isSelectMob }: props) {
  const [placeMobs, setPlaceMobs] = useState<Mob>();
  async function setMobs() {
    const token = window.location.pathname.split("/").pop();
    if (isSelectMob && selectMob) {
      setPlaceMobs(selectMob);
      socket?.emit("newMobOnTable", {
        idMob: selectMob?.id,
        x: x,
        y: y,
        idSession: token,
      });
    }
  }
  return (
    <div
      onClick={() => {
        setMobs();
      }}
      content=""
      className="w-[50px] h-[50px] bg-custom-darkGray border border-zinc-900 cursor-pointer"
    >
      {placeMobs && <p className="text-white bg-black">{placeMobs.name}</p>}
    </div>
  );
}
