import React, { useEffect, useState } from "react";
import { Mob } from "../game/types";
import axios from "axios";
type props = {
  setSelectMob: React.Dispatch<React.SetStateAction<Mob|undefined>>;
  setiISelectMob: React.Dispatch<React.SetStateAction<boolean>>;
  isSelectMob: boolean;
};
export default function MobList({
  setSelectMob,
  isSelectMob,
  setiISelectMob,
}: props) {
  const [mobsData, setMobsData] = React.useState<Mob[]>([]);
  async function getMobs() {
    const url = process.env.REACT_APP_API_BASE_URL;
    const response = await axios.get(`${url}/moblist/mob`, {
      withCredentials:true
    });
    await setMobsData(response.data);
  }
  useEffect(() => {
    try {
      getMobs();
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <div className="grid grid-cols-3">
      {mobsData.map((mob, index) => (
        <button
          className="border-custom-red border-2 transition-colors duration-100 p-2 hover:bg-custom-red hover:text-white"
          key={index}
          onClick={() => {
            setSelectMob(mob);
            setiISelectMob(true);
          }}
        >
          <p>имя: {mob.name}</p>
          <p>скорость: {mob.speed}</p>
        </button>
      ))}
    </div>
  );
}
