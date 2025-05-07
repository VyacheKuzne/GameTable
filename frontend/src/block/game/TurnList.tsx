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
    <div className="h-[200px] bg-white rounded-[20px] p-2 shadow-md">
      <p className="text-[24px] font-medium">Последовательность ходов:</p>
      <div className="h-[80%] overflow-y-auto">
      {sortedPlacedMobs.map((mobOnTable, index) => {
        const mob = mobOnTable.mob;
        return (
          <div key={index}>
            Имя: {mob?.name ?? "без имени"}
            <br />
            Маневр: {mob?.manevr}
            <p>В этом раунде ходил: <span className={`${mobOnTable.isOverMove ? "text-custom-green" : "text-custom-red"}`}>{mobOnTable.isOverMove ? "да" : "нет"}</span></p>
            <hr />
          </div>
        );
      })} 
      </div>
     
    </div>
  );
}
