import React from "react";
import RedButton from "../../component/Button/RedButton";
// Тип пропсов
type props = {
  user: {
    name: string;
    secondname: string;
    nickname: string;
    email: string;
    phone: string;
    tarif?: any;
  };
};

export default function TimeProfileBlock({ user }: props) {
  return (
    <div className="shadow-md font-medium rounded-xl text-[36px]  w-full p-[1.2%]">
      {user.tarif ? (
        <div>
          <p>Оставшееся время по тарифу</p>
          <div className="my-[1%]">
            <img src="" alt="" />
            <p>9 часов</p>
          </div>
        </div>
      ) : (
        <div>На данынй момент тарифа: нет</div>
      )}
      {user.tarif ? <p>Текущий тарифный план: разовый</p> : null}
      <RedButton text="Желаете обновить тарифный план?" f="16px" p="2%" />
    </div>
  );
}
