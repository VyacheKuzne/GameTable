import React, { useState } from "react";
import { Mob } from "./types";
import {MobsOnTable} from './types'

type MobWithToken = Mob & { tokenMob: string };
type props = {
  renderedMob: MobWithToken;
  setIsReplaceMob: React.Dispatch<React.SetStateAction<boolean>>;
  setReplaceMob: React.Dispatch<React.SetStateAction<MobsOnTable | undefined>>;

  setIsViewMobsStat: React.Dispatch<React.SetStateAction<boolean>>;
  setViewMobsStat: React.Dispatch<React.SetStateAction<Mob | undefined>>;
  isViewMobsStat: boolean;
  viewMobsStat: Mob | undefined;
};
export default function MobCell({
  renderedMob,
  setReplaceMob,
  
  setIsViewMobsStat,
  setViewMobsStat,
  isViewMobsStat,
  viewMobsStat,
}: // setIsReplaceMob,
props) {
  return (
    <div
      onClick={() => {
        // setIsReplaceMob(true);
        setIsViewMobsStat(true);
        setViewMobsStat(renderedMob);
      }}
      className="bg-black text-white h-full flex items-center justify-center"
    >
      <p>{renderedMob.name}</p>
    </div>
  );
}
