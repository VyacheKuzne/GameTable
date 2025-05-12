import React, { useState } from "react";
import Header from "../block/Header";
import { Mob } from "../block/game/types";
import UserCreateMobForm from "../component/Form/UserCreateMobForm";
export default function ConstractsPage() {
  const [isCreateMob, setIsCreateMob] = useState<boolean>(false);
  const [createMob, setCreateMob] = useState<Mob>();

  return (
    <div>
      <Header />
      {isCreateMob ? (
        <UserCreateMobForm
          createMob={createMob}
          setIsCreateMob={setIsCreateMob}
          setCreateMob={setCreateMob}
        />
      ) : null}
      <div className="grid grid-cols-3 w-fit m-auto">
        <div
          className="relative flex justify-center items-center"
          onClick={() => setIsCreateMob(true)}
        >
          <svg
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
            <p className="text-white">Создать новго моба</p>
          </div>
        </div>
        <div className="relative flex justify-center items-center">
          <svg
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
            <p className="text-white">Создать новое оружие</p>
          </div>
        </div>
        <div className="relative flex justify-center items-center">
          <svg
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
            <p className="text-white">Создать новую броню</p>
          </div>
        </div>
        <div className="relative flex justify-center items-center left-[50%] top-[-24.5%]">
          <svg
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
        </div>
        <div className="relative flex justify-center items-center left-[50%] top-[-24.5%]">
          <svg
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
            <p className="text-white">Создать новую способность</p>
          </div>
        </div>
      </div>
    </div>
  );
}
