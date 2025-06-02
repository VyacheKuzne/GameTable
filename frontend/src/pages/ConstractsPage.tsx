import React, { useEffect, useState } from "react";
import Header from "../block/Header";
import { Mob } from "../block/game/types";
import UserCreateMobForm from "../component/Form/UserCreateMobForm";
import UserCreateWeaponForm from "../component/Form/UserCreateWeaponForm";
import UserCreateArmorForm from "../component/Form/UserCreateArmorForm";
import UserCreateEffectForm from "../component/Form/UserCreateEffectForm";
import UserCreateSkillForm from "../component/Form/UserCreateSkillForm";
import ConstrSwordSvg from "../img/ConstrSword.svg";
import ConstrPlusSvg from "../img/ConsrtPlus.svg";
import ConstrArmordSvg from "../img/ConstrSheld.svg";
import ConstrSkillSvg from "../img/ConstrSkill.svg";
import axios from "axios";
import { Weapon } from "../block/game/types";
import { Armor } from "../block/game/types";
import { Skill } from "../block/game/types";

export default function ConstractsPage() {
  const [isCreateMob, setIsCreateMob] = useState<boolean>(false);
  const [isCreateWeapon, setIsCreateWeapon] = useState<boolean>(false);
  const [isCreateArmor, setIsCreateArmor] = useState<boolean>(false);
  const [isCreateSkill, setIsCreateSkill] = useState<boolean>(false);
  const [isCreateEffect, setIsCreateEffect] = useState<boolean>(false);
  const [tariffInfo, setTariffInfo] = useState<null | {
    hasTariff: boolean;
    currentMobCount: number;
    maxMobCount: number;
  }>(null);
    const [armorItems, setArmorItems] = useState<Armor[]>([]);
  const [weaponItems, setWeaponItems] = useState<Weapon[]>([]);
  const [skillItems, setSkillItems] = useState<Skill[]>([]);
  useEffect(() => {
    const checkTariff = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/construct-user/checkTariff",
          {
            withCredentials: true,
          }
        );
        setTariffInfo(response.data);
      } catch (error) {
        console.error("Ошибка при проверке тарифа:", error);
      }
    };

    checkTariff();
  }, []);
    // Получаем броню, созданную пользователем
        const fetchArmor = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/construct-user/armor`, {
          withCredentials: true
        });
        setArmorItems(response.data);
      } catch (error) {
        console.error("Ошибка при получении брони:", error);
      }
    };
  useEffect(() => {

    
    fetchArmor();
  }, []); // Зависимость от userId, чтобы обновить данные, если id пользователя изменится

  // Получаем оружие, созданное пользователем
   const fetchWeapon = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/construct-user/weapon`, {
          withCredentials: true
        });
        setWeaponItems(response.data);
      } catch (error) {
        console.error("Ошибка при получении оружия:", error);
      }
    };
  useEffect(() => {
   
    
    fetchWeapon();
  }, []); // Зависимость от userId

  // Получаем скиллы, созданные пользователем
  // useEffect(() => {
  //   const fetchSkills = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3000/skill/user`, {
  //         withCredentials: true
  //       });
  //       setSkillItems(response.data);
  //     } catch (error) {
  //       console.error("Ошибка при получении скиллов:", error);
  //     }
  //   };
    
  //   fetchSkills();
  // }, []);
  return (
    <div>
      <Header />
      <div className="font-medium text-[24px] text-center w-1/3 m-auto">
        <p>Добро пожаловать на страницу конструктора!</p>
        <p>
          Здесь, вы можете сделать свои первые шаги и создать все необходиоме
          для своих игр!
        </p>
        <p className="font-bold">
          У вас должен быть оормлен тариф чтобы вы могли создавать и сохранять!
        </p>
        {!tariffInfo?.hasTariff ? (
          <p>У вас нет активного тарифа</p>
        ) : (
          <p>
            Использовано мобов: {tariffInfo?.currentMobCount} из{" "}
            {tariffInfo?.maxMobCount}
          </p>
        )}
      </div>
      {isCreateMob ? (
        <UserCreateMobForm
          // createMob={createMob}
          setIsCreateMob={setIsCreateMob}
          armorItems={armorItems}
          weaponItems={weaponItems}
        />
      ) : null}
      {isCreateWeapon ? (
        <UserCreateWeaponForm
             fetchWeapon={fetchWeapon}
          // createMob={createMob}
          setIsCreateWeapon={setIsCreateWeapon}
        />
      ) : null}
      {isCreateArmor ? (
        <UserCreateArmorForm
          // createMob={createMob}
          fetchArmor={fetchArmor}
     
          setIsCreateArmor={setIsCreateArmor}
        />
      ) : null}
      {isCreateSkill ? (
        <UserCreateSkillForm
          // createMob={createMob}
          setIsCreateSkill={setIsCreateSkill}
        />
      ) : null}
      {isCreateEffect ? (
        <UserCreateEffectForm
          // createMob={createMob}
          setIsCreateEffect={setIsCreateEffect}
        />
      ) : null}
 <div className="grid grid-cols-3 w-fit m-auto">
  {[
    {
      onClick: () => setIsCreateMob(true),
      imgSrc: ConstrPlusSvg,
      text:
        tariffInfo && tariffInfo.currentMobCount >= tariffInfo.maxMobCount
          ? "Лимит мобов исчерпан"
          : "Создать нового моба",
    },
    {
      onClick: () => setIsCreateWeapon(true),
      imgSrc: ConstrSwordSvg,
      text: "Создать новое оружие",
    },
    {
      onClick: () => setIsCreateArmor(true),
      imgSrc: ConstrArmordSvg,
      text: "Создать новую броню",
    },
    // {
    //   onClick: () => setIsCreateSkill(true),
    //   imgSrc: ConstrSkillSvg,
    //   text: "Создать новую способность",
    //   className: "left-[50%] top-[-24.5%]",
    // },
  ].map(({ onClick, imgSrc, text = "" }, idx) => {
    const isDisabled =
      tariffInfo && tariffInfo.currentMobCount >= tariffInfo.maxMobCount;

    return (
      <div
        key={idx}
        className={`relative flex justify-center items-center ${
          isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={() => {
          if (!isDisabled) onClick();
        }}
      >
        <svg
          className=""
          xmlns="http://www.w3.org/2000/svg"
          width="256"
          height="294"
          fill="none"
        >
          <path
            fill="#313131"
            d="m128 0 127.306 73.5v147L128 294 .694 220.5v-147L128 0Z"
          />
        </svg>
        <div className="svgIconConstr">
          <img src={imgSrc} alt={imgSrc} />
          <p className="text-white">
            {idx === 0
              ? text
              : isDisabled
              ? "Лимит мобов исчерпан"
              : text}
          </p>
        </div>
      </div>
    );
  })}
</div>

    </div>
  );
}
