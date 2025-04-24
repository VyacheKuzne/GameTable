import React, { useState } from "react";
import { Mob } from "./types";
type MobWithToken = Mob & { tokenMob: string };
type props = {
  renderedMob: MobWithToken;
  setIsReplaceMob: React.Dispatch<React.SetStateAction<boolean>>;
  setReplaceMob: React.Dispatch<React.SetStateAction<Mob | undefined>>;
};
export default function MobCell({
  renderedMob,
  setReplaceMob,
  setIsReplaceMob,
}: props) {
  return (
    <div
      onClick={() => {
        setIsReplaceMob(true);
        setReplaceMob(renderedMob);
      }}
      className="bg-black text-white h-full flex items-center justify-center"
    >
      <p>{renderedMob.name}</p>
    </div>
  );
}
