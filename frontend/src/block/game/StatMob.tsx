import React, { useState, useEffect } from "react";
import { Mob } from "../game/types";
import Cross from "../../img/Cross.svg";
import { Member } from "./types";
import { Socket } from "socket.io-client";

type Props = {
  setIsViewMobsStat: React.Dispatch<React.SetStateAction<boolean>>;
  setViewMobsStat: React.Dispatch<React.SetStateAction<Mob | undefined>>;
  isViewMobsStat: boolean;
  viewMobsStat: Mob | undefined;
  allMembers: Member[] | undefined;
  socket: Socket | null;
  isCreator: boolean;
};
// ... остальной код без изменений выше остаётся

export default function StatMob({
    setIsViewMobsStat,
    setViewMobsStat,
    isViewMobsStat,
    viewMobsStat,
    allMembers,
    socket,
    isCreator,
  }: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [formState, setFormState] = useState<Mob | undefined>(viewMobsStat);
    const [ownerId, setOwnerId] = useState<number | undefined>(undefined); // просто отдельный стейт
  
    useEffect(() => {
      setFormState(viewMobsStat);
      setOwnerId(undefined); // сброс при новом мобе
    }, [viewMobsStat]);
  
    const handleInputChange = (field: keyof Mob, value: string | number) => {
      setFormState((prev) => (prev ? { ...prev, [field]: value } : undefined));
    };
  
    const handleSave = () => {
      if (!formState || !viewMobsStat) return;
      const token = window.location.pathname.split("/").pop();
  
      socket?.emit("editMob", {
        idSession: token,
        updatedMob: formState,
        tokenMob: viewMobsStat.tokenMob,
        ownerId, // ← просто передаем ownerId из select
      });
  
      setViewMobsStat({ ...formState });
      setIsEditing(false);
    };
  
    if (!isViewMobsStat || !viewMobsStat) return null;
  
    return (
      <div className="absolute left-0 z-50 bg-white rounded-[20px] shadow-md p-2">
        <div className="flex items-center justify-between mb-2">
          <p className="font-bold text-[24px]">Статы моба</p>
          <button
            className="bg-custom-red p-1 rounded-xl"
            onClick={() => setIsViewMobsStat(false)}
          >
            <img src={Cross} alt="Close" />
          </button>
        </div>
  
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <label>
              Имя:
              <input
                type="text"
                value={formState?.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="border p-1 rounded ml-2"
              />
            </label>
            <label>
              Маневр:
              <input
                type="number"
                value={formState?.manevr || 0}
                onChange={(e) => handleInputChange("manevr", +e.target.value)}
                className="border p-1 rounded ml-2"
              />
            </label>
            <label>
              Скорость:
              <input
                type="number"
                value={formState?.speed || 0}
                onChange={(e) => handleInputChange("speed", +e.target.value)}
                className="border p-1 rounded ml-2"
              />
            </label>
            <label>
              Игрок:
              <select
                value={ownerId ?? ""}
                onChange={(e) =>
                  setOwnerId(e.target.value ? Number(e.target.value) : undefined)
                }
                className="border p-1 rounded ml-2"
              >
                <option value="">Не выбрано</option>
                {allMembers?.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex gap-2 mt-2">
              <button
                className="bg-green-500 text-white px-2 py-1 rounded"
                onClick={handleSave}
              >
                Сохранить
              </button>
              <button
                className="bg-gray-300 px-2 py-1 rounded"
                onClick={() => {
                  setIsEditing(false);
                  setFormState(viewMobsStat);
                  setOwnerId(undefined); // просто сбрасываем
                }}
              >
                Отмена
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p>Имя: {viewMobsStat.name}</p>
            <p>Маневр: {viewMobsStat.manevr}</p>
            <p>Скорость: {viewMobsStat.speed}</p>
            <p>Оружие: {viewMobsStat.weapon?.name}</p>
            <p>Урон оружия: {viewMobsStat.weapon?.damage}</p>
            {isCreator && (
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
                onClick={() => {
                  setFormState(viewMobsStat);
                  setOwnerId(undefined); // не трогаем Mob
                  setIsEditing(true);
                }}
              >
                Редактировать
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
  