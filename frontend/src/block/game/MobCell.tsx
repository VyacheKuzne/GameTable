import React, { useState } from "react";
import { Mob } from "./types";
import { MobsOnTable } from "./types";
import Cursor from "../../img/cursor.svg";
type MobWithToken = Mob & { tokenMob?: string } & { status?: string };
type props = {
  renderedMob: MobWithToken;
  setIsReplaceMob: React.Dispatch<React.SetStateAction<boolean>>;
  setReplaceMob: React.Dispatch<React.SetStateAction<MobsOnTable | undefined>>;
  isModAtack: boolean;
  setIsViewMobsStat: React.Dispatch<React.SetStateAction<boolean>>;
  setViewMobsStat: React.Dispatch<React.SetStateAction<Mob | undefined>>;
  isViewMobsStat: boolean;
  viewMobsStat: Mob | undefined;
  setIsModAtack: React.Dispatch<React.SetStateAction<boolean>>
};
export default function MobCell({
  renderedMob,
  setReplaceMob,
  isModAtack,
  setIsViewMobsStat,
  setViewMobsStat,
  isViewMobsStat,
  viewMobsStat,
  setIsModAtack,
}: // setIsReplaceMob,
props) {
  return (
    <div
      onClick={() => {
        // setIsReplaceMob(true);
        setIsViewMobsStat(true);
        setViewMobsStat(renderedMob);
        setIsModAtack(false)
      }}
      className={`bg-black text-white h-full flex items-center justify-center`}
      style={isModAtack?{ cursor: `url(${Cursor}) 10 10, auto` }:{cursor: "auto"}}
    >
      <p>{renderedMob.name}</p>
    </div>
  );
}
