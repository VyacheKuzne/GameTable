import React from "react";
import { Mob } from "./types";
type props = {
  placedMobs?: {
    x: number;
    y: number;
    idMob: number;
    tokenMob: string;
    isOverMove: number;
    mob?: Mob;
  }[];
};
export default function TurnList({ placedMobs }: props) {
  // Создаем копию массива, чтобы не изменять исходный массив
  const sortedPlacedMobs = [...(placedMobs || [])].sort((a, b) => {
    // Сначала проверяем, есть ли у обоих мобов свойство manevr
    const manevrA = a.mob?.manevr || 0; // Если manevr нет, считаем его равным 0
    const manevrB = b.mob?.manevr || 0;

    // Сортируем в порядке убывания маневра
    return manevrB - manevrA;
  });

  return (
    <div className="h-[200px] overflow-y-auto">
      TurnList
      {sortedPlacedMobs.map((mobOnTable, index) => {
        const mob = mobOnTable.mob;
        return (
          <div key={index}>
            имя: {mob?.name ?? "без имени"}
            <br />
            маневр: {mob?.manevr}
            <br />В этом раунде ходил: {mobOnTable.isOverMove ? "да" : "нет"}
            <hr />
          </div>
        );
      })} 
    </div>
  );
}
