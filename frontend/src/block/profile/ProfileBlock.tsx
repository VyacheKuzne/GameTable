import React from "react";
import backet from "../../img/backet.svg";
import RedButton from "../../component/Button/RedButton";

// Тип пропсов
type Props = {
  user: {
    name: string;
    secondname: string;
    nickname: string;
    email: string;
    phone: string;
    tarif?: any;
  };
};

// Компонент ProfileBlock, который принимает пропс user
export default function ProfileBlock({ user }: Props) {
  function Delete() {
    // handle delete
  }

  return (
    <div className="flex justify-between shadow-md w-full p-[1%] rounded-xl">
      <div className="flex w-[55%] items-center justify-between">
        <button
          content=""
          className="w-[177px] h-[177px] rounded-full bg-custom-darkGray"
        >
          <p className="text-white text-[100px]">+</p>
        </button>
        <div className="text-[32px] font-semibold">
          <p>{user.name}</p>
          <p>{user.secondname}</p>
        </div>
      </div>
      <div className="flex flex-col items-start">
        <RedButton
          img={backet}
          w={"43px"}
          h={"43px"}
          p={"15%"}
          onClick={Delete}
        />
      </div>
    </div>
  );
}
