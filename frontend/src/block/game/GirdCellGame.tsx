import React from "react";
import { Mob } from "./types";
import { Socket } from "socket.io-client";
import MobCell from "./MobCell";
import { MobsOnTable } from "./types";

type Props = {
  x: number;
  y: number;
  selectMob: Mob | undefined;
  isSelectMob: boolean;
  socket: Socket | null;
  placedMob?: { idMob: number; tokenMob: string; status: string };
  allMobs?: Mob[];

  setIsReplaceMob: React.Dispatch<React.SetStateAction<boolean>>;
  setReplaceMob: React.Dispatch<React.SetStateAction<MobsOnTable | undefined>>;
  isReplaceMob: boolean;
  replaceMob: MobsOnTable | undefined;

  setIsViewMobsStat: React.Dispatch<React.SetStateAction<boolean>>;
  setViewMobsStat: React.Dispatch<React.SetStateAction<Mob | undefined>>;
  isViewMobsStat: boolean;
  viewMobsStat: Mob | undefined;

  setIsModAtack: React.Dispatch<React.SetStateAction<boolean>>;
  isModAtack: boolean;
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

  setIsViewMobsStat,
  setViewMobsStat,
  isViewMobsStat,
  viewMobsStat,

  setIsModAtack,
  isModAtack,
}: Props) {
  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
  }
  const token = getCookie("access_token");
  // console.log(token);
  async function setMobs() {
    const token = window.location.pathname.split("/").pop();
    const userToken = getCookie("access_token"); // или getCookie('access_token')
    // console.log('UserToken from cookie:', userToken);
    if (isSelectMob && selectMob) {
      socket?.emit("newMobOnTable", {
        idMob: selectMob.id,
        x,
        y,
        idSession: token,
        token: token,
        userToken: userToken,
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
    } else if (isModAtack && replaceMob && renderedMob) {
      socket?.emit("atackMob", {
        idMob: replaceMob.id,
        idSession: token,
        MobIsNowTurn: replaceMob,
        renderedMob: renderedMob,
      });
      console.log("replaceMob" + replaceMob.tokenMob);
    }
  }

  const mobTemplate = placedMob
    ? allMobs?.find((mob) => mob.id === placedMob.idMob)
    : null;

  const renderedMob =
    mobTemplate && placedMob?.status === "alive" && placedMob
      ? { ...mobTemplate, tokenMob: placedMob.tokenMob }
      : null;

      console.log(placedMob)
      // console.log('mobTemplate ' + mobTemplate)
      // console.log('renderedMob ' + renderedMob)
  // console.log('лог на маневры '+renderedMob?.manevr);
  return (
    <div
      onClick={setMobs}
      className="w-[100px] h-[100px] bg-custom-darkGray border border-zinc-900 cursor-pointer"
    >
      {renderedMob && (
        <MobCell
          isModAtack={isModAtack}
          setIsModAtack={setIsModAtack}
          setIsReplaceMob={setIsReplaceMob}
          setReplaceMob={setReplaceMob}
          renderedMob={renderedMob}
          setIsViewMobsStat={setIsViewMobsStat}
          setViewMobsStat={setViewMobsStat}
          isViewMobsStat={isViewMobsStat}
          viewMobsStat={viewMobsStat}
        />
      )}
    </div>
  );
}
