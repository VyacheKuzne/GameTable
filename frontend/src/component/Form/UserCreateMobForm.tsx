import React, { useEffect, useState } from "react";
import Line from "../../img/EditLine.svg";
import Cross from "../../img/Cross.svg";
import axios from "axios";
import AllMessages from "../messages/AllMessages";
import { Weapon, Armor } from "../../block/game/types";

type props = {
  setIsCreateMob: React.Dispatch<React.SetStateAction<boolean>>;
  armorItems: Armor[];
  weaponItems: Weapon[];
};

type MobForm = {
  name: string;
  health: number;
  speed: number;
  manevr: number;
  armorId?: number;
  weaponId?: number;
};

export default function UserCreateMobForm({
  setIsCreateMob,
  armorItems,
  weaponItems,
}: props) {
  const [status, setStatus] = useState<number | string>();
  const [createMob, setCreateMob] = useState<MobForm>({
    name: "",
    health: 0,
    speed: 0,
    manevr: 0,
    weaponId: 0,
    armorId: 0,
  });

  const [searchArmor, setSearchArmor] = useState<string>(""); // Строка для поиска
  const [filteredArmors, setFilteredArmors] = useState<Armor[]>([]); // Список отфильтрованных броний
  const [selectedArmor, setSelectedArmor] = useState<Armor | null>(null); // Выбранный элемент брони
  useEffect(() => {
    if (searchArmor.trim() === "") {
      setFilteredArmors([]); // Если поиск пустой, не показываем список
    } else {
      const filtered = armorItems.filter((armor) =>
        armor.name.toLowerCase().includes(searchArmor.toLowerCase())
      );
      setFilteredArmors(filtered); // Обновляем отфильтрованные элементы
    }
  }, [searchArmor, armorItems]);

  // Функция для выбора брони
  const handleSelectArmor = (armor: Armor) => {
    setSelectedArmor(armor); // Устанавливаем выбранную броню
    setSearchArmor(armor.name); // Заполняем инпут названием выбранной брони
    setCreateMob((prevData) => ({
      ...prevData,
      armorId: armor.id, // Сохраняем id брони в форму
    }));
    setFilteredArmors([]); // Прячем список после выбора
  };

  const fetchData = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateMob((prevData) => ({
      ...prevData,
      [name]: ["health", "speed", "manevr"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const host = "http://localhost:3000/construct-user";
      const response = await axios.post(`${host}/createMob`, createMob, {
        withCredentials: true,
      });
      setStatus(response.status);
    } catch (error) {
      setStatus(500);
    }
  };

  const [searchWeapon, setSearchWeapon] = useState<string>(""); // Строка для поиска
  const [filteredWeapons, setFilteredWeapons] = useState<Weapon[]>([]); // Список отфильтрованных оружий
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null); // Выбранный элемент оружия

  // Фильтрация оружия по введённому тексту
  useEffect(() => {
    if (searchWeapon.trim() === "") {
      setFilteredWeapons([]); // Если поиск пустой, не показываем список
    } else {
      const filtered = weaponItems.filter((weapon) =>
        weapon.name.toLowerCase().includes(searchWeapon.toLowerCase())
      );
      setFilteredWeapons(filtered); // Обновляем отфильтрованные элементы
    }
  }, [searchWeapon, weaponItems]);

  // Функция для выбора оружия
  const handleSelectWeapon = (weapon: Weapon) => {
    setSelectedWeapon(weapon); // Устанавливаем выбранное оружие
    setSearchWeapon(weapon.name); // Заполняем инпут названием выбранного оружия
    setCreateMob((prevData) => ({
      ...prevData,
      weaponId: weapon.id, // Сохраняем id оружия в форму
    }));
    setFilteredWeapons([]); // Прячем список после выбора
  };
  return (
    <div className="w-screen h-screen bg-custom-fon-darkGray top-0 fixed z-[1000] flex items-center justify-center ">
      <AllMessages status={status!} />
      <div className="relative bg-custom-darkGray w-fit rounded-[20px] p-8">
        <button
          onClick={() => setIsCreateMob(false)}
          className="bg-custom-red rounded-[10px] p-[10px] absolute right-[-15px] top-[-15px]"
        >
          <img src={Cross} alt="Cross" />
        </button>
        <form className="flex flex-col items-center" onSubmit={submitForm}>
          <p className="text-[24px] text-white font-medium">
            Введите данные для создания моба
          </p>
          <img src={Line} alt="Line" />
          {/* Формируем поля для ввода данных */}
          <div className="flex flex-col w-full mt-[16px]">
            <label
              className="text-[16px] font-medium text-white pl-1"
              htmlFor=""
            >
              ИМЯ
            </label>
            <input
              className="h-[47px] rounded-[10px] w-full pl-1"
              type="text"
              onChange={fetchData}
              name="name"
            />
          </div>

          {/* Поле для поиска брони */}
          <div className="flex flex-col w-full mt-[16px]">
            <label
              className="text-[16px] font-medium text-white pl-1"
              htmlFor=""
            >
              БРОНЯ
            </label>
            <input
              className="h-[47px] rounded-[10px] w-full pl-1"
              type="text"
              value={searchArmor}
              onChange={(e) => setSearchArmor(e.target.value)} // Обновляем строку поиска
              placeholder="Поиск брони"
            />
            {/* Список предложений */}
            {searchArmor.trim() !== "" && filteredArmors.length > 0 && (
              <ul className="bg-white border rounded-md mt-2 max-h-40 overflow-y-auto">
                {filteredArmors.map((armor) => (
                  <li
                    key={armor.id}
                    onClick={() => handleSelectArmor(armor)} // Обработчик выбора брони
                    className="cursor-pointer p-2 hover:bg-gray-200"
                  >
                    {armor.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Поле для поиска оружия */}
          <div className="flex flex-col w-full mt-[16px]">
            <label
              className="text-[16px] font-medium text-white pl-1"
              htmlFor=""
            >
              ОРУЖИЕ
            </label>
            <input
              className="h-[47px] rounded-[10px] w-full pl-1"
              type="text"
              value={searchWeapon}
              onChange={(e) => setSearchWeapon(e.target.value)} // Обновляем строку поиска
              placeholder="Поиск оружия"
            />
            {/* Список предложений */}
            {searchWeapon.trim() !== "" && filteredWeapons.length > 0 && (
              <ul className="bg-white border rounded-md mt-2 max-h-40 overflow-y-auto">
                {filteredWeapons.map((weapon) => (
                  <li
                    key={weapon.id}
                    onClick={() => handleSelectWeapon(weapon)} // Обработчик выбора оружия
                    className="cursor-pointer p-2 hover:bg-gray-200"
                  >
                    {weapon.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
    <div className="flex flex-col w-full mt-[16px]">
            <label className="text-[16px] font-medium text-white pl-1" htmlFor="health">
              МАКС-ЗДОРОВЬЕ
            </label>
            <input
              className="h-[47px] rounded-[10px] w-full pl-1"
              type="number"
              name="health"
              value={createMob.health}
              onChange={fetchData}
              placeholder="Введите здоровье"
            />
          </div>

          {/* Инпут для скорости */}
          <div className="flex flex-col w-full mt-[16px]">
            <label className="text-[16px] font-medium text-white pl-1" htmlFor="speed">
              СКОРОСТЬ
            </label>
            <input
              className="h-[47px] rounded-[10px] w-full pl-1"
              type="number"
              name="speed"
              value={createMob.speed}
              onChange={fetchData}
              placeholder="Введите скорость"
            />
          </div>

          {/* Инпут для маневра */}
          <div className="flex flex-col w-full mt-[16px]">
            <label className="text-[16px] font-medium text-white pl-1" htmlFor="manevr">
              МАНЕВР
            </label>
            <input
              className="h-[47px] rounded-[10px] w-full pl-1"
              type="number"
              name="manevr"
              value={createMob.manevr}
              onChange={fetchData}
              placeholder="Введите маневр"
            />
          </div>
          <button
            className="bg-custom-red hover-effect-btn-red rounded-[10px] w-full h-[47px] mt-[32px]"
            type="submit"
          >
            <p className="text-white font-medium">Создать моба</p>
          </button>
        </form>
      </div>
    </div>
  );
}
