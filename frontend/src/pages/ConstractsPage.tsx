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
        />
      ) : null}
      {isCreateWeapon ? (
        <UserCreateWeaponForm
          // createMob={createMob}
          setIsCreateWeapon={setIsCreateWeapon}
        />
      ) : null}
      {isCreateArmor ? (
        <UserCreateArmorForm
          // createMob={createMob}
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
        <div
          className={`relative flex justify-center items-center ${
            tariffInfo && tariffInfo.currentMobCount >= tariffInfo.maxMobCount
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
          onClick={() => {
            if (
              tariffInfo &&
              tariffInfo.currentMobCount < tariffInfo.maxMobCount
            ) {
              setIsCreateMob(true);
            }
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
            <img src={ConstrPlusSvg} alt="ConstrPlusSvg" />
            <p className="text-white">
              {tariffInfo &&
              tariffInfo.currentMobCount >= tariffInfo.maxMobCount
                ? "Лимит мобов исчерпан"
                : "Создать нового моба"}
            </p>
          </div>
        </div>
        <div
          className="relative flex justify-center items-center"
          onClick={() => setIsCreateWeapon(true)}
        >
          <svg
            className="cursor-pointer "
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
            <img src={ConstrSwordSvg} alt="ConstrSwordSvg" />
            <p className="text-white">Создать новое оружие</p>
          </div>
        </div>
        <div
          className="relative flex justify-center items-center"
          onClick={() => setIsCreateArmor(true)}
        >
          <svg
            className="cursor-pointer "
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
            <img src={ConstrArmordSvg} alt="ConstrArmordSvg" />
            <p className="text-white">Создать новую броню</p>
          </div>
        </div>
        {/* <div
          className="relative flex justify-center items-center left-[50%] top-[-24.5%]"
          onClick={() => setIsCreateSkill(true)}
        >
          <svg
            className="cursor-pointer "
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
          <div className="absolute">
            <p className="text-white">Создать новый эффект</p>
          </div>
        </div> */}
        <div
          className="relative flex justify-center items-center left-[50%] top-[-24.5%]"
          onClick={() => setIsCreateSkill(true)}
        >
          <svg
            className="cursor-pointer "
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
            <img src={ConstrSkillSvg} alt="ConstrSkillSvg" />
            <p className="text-white">Создать новую способность</p>
          </div>
        </div>
      </div>
    </div>
  );
}
