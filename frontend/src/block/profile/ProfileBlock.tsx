import React, { useRef } from "react";
import backet from "../../img/backet.svg";
import RedButton from "../../component/Button/RedButton";
import axios from "axios";

// Тип пропсов
type Props = {
  user: {
    avatar: string;
    name: string;
    secondname: string;
    nickname: string;
    email: string;
    phone: string;
    tarif?: any;
  };
  refreshUserData: () => void
};

// Компонент ProfileBlock, который принимает пропс user
export default function ProfileBlock({ user , refreshUserData}: Props) {
  function Delete() {
    // handle delete
  }
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const host = "http://localhost:3000";
      const respone = await axios.patch(`${host}/user/uploadAvatar`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      refreshUserData()
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    }
  };
  
  return (
    <div className="flex justify-between shadow-md w-full p-[1%] rounded-xl">
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <div className="flex w-[55%] items-center justify-between">
        <button
          onClick={handleClick}
          content=""
          className="w-[177px] h-[177px] min-h-[177px] min-w-[177px] rounded-full bg-custom-darkGray"
        >
          {user.avatar !== null ? (
            <img
              className="w-full h-full rounded-full"
              src={`http://localhost:3000${user.avatar}`}
              alt="avatar"
            />
          ) : (
            <p className="text-white text-[100px]">+</p>
          )}
        </button>
        <div className="text-[32px] w-full font-semibold">
          <p>{user.name}</p>
          <p>{user.secondname}</p>
        </div>
      </div>
      {/* <div className="flex flex-col items-start">
        <RedButton
          img={backet}
          w={"43px"}
          h={"43px"}
          p={"15%"}
          onClick={Delete}
        />
      </div> */}
    </div>
  );
}
