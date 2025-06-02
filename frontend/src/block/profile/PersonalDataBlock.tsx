import React, { useState } from "react";
import RedButton from "../../component/Button/RedButton";
import axios from "axios";
import NotificationMessages from "../../component/messages/NotificationMessages";

type Props = {
  user: {
    name: string;
    secondname: string;
    nickname: string;
    email: string;
    phone: string;
    tarif?: any;
  };
  refreshUserData: () => void;
};

export default function PersonalDataBlock({ user, refreshUserData }: Props) {
  const names = ["password", "nickname", "email", "phone"] as const;

  const fieldLabels: Record<typeof names[number], string> = {
    password: "Пароль",
    nickname: "Никнейм",
    email: "Почта",
    phone: "Телефон",
  };

  const [isUserWantEditData, setIsUserWantEditData] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    nickname: user.nickname,
    email: user.email,
    phone: user.phone,
  });
  const [viewMessage, setIsMesasages] = useState<boolean>(false);

  const maskValue = (value: string): string => {
    if (value.length <= 4) return "*".repeat(value.length);
    return value.slice(0, 4) + "*".repeat(value.length - 4);
  };

  const getValue = (key: (typeof names)[number]): string => {
    switch (key) {
      case "password":
        return "******";
      case "email":
      case "phone":
        return maskValue(user[key]);
      case "nickname":
        return user[key];
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Фильтрация: исключаем пустые или неизменённые поля
    const updatedFields = Object.fromEntries(
      Object.entries(formData).filter(
        ([key, value]) =>
          value.trim() !== "" && value !== user[key as keyof typeof user]
      )
    );

    // Валидация email и телефона
    if (updatedFields.email && !updatedFields.email.includes("@")) {
      alert("Некорректный email");
      return;
    }
    if (updatedFields.phone && updatedFields.phone.length < 7) {
      alert("Некорректный телефон");
      return;
    }

    // Если ничего не изменилось — ничего не отправляем
    if (Object.keys(updatedFields).length === 0) {
      setIsUserWantEditData(false);
      return;
    }

    try {
      const responce = await axios.post(
        "http://localhost:3000/user/updateData",
        updatedFields,
        {
          withCredentials: true,
        }
      );
      if (responce.status === 200 || responce.status === 201) {
        setIsMesasages(true);
        refreshUserData();
      }
    } catch (error) {
      console.log(error);
    }

    setIsUserWantEditData(false);
  };

  return (
    <div className="shadow-md p-[1.2%]">
      {viewMessage && (
        <NotificationMessages
          Mesasages="Данные успешно обновлены"
          setIsMesasages={setIsMesasages}
        />
      )}
      <p className="text-[36px] font-medium">Ваши данные</p>
      <div className="grid grid-cols-2 items-end gap-4">
        {names.map((atribut, index) => (
          <div key={index} className="flex flex-col w-[367px]">
            <label className="text-[24px]" htmlFor={atribut}>
              {fieldLabels[atribut]}
            </label>
            <input
              type="text"
              value={getValue(atribut)}
              name={atribut}
              className="placeholder:text-black placeholder:text-[36px] placeholder:pl-3 bg-slate-200 rounded-xl h-[63px]"
              placeholder={fieldLabels[atribut]}
              readOnly
            />
          </div>
        ))}
        <button
          onClick={() => {
            setFormData({
              password: "",
              nickname: user.nickname,
              email: user.email,
              phone: user.phone,
            });
            setIsUserWantEditData(true);
          }}
          className="bg-custom-red w-[367px] items-center h-[63px] hover-effect-btn-red text-white cursor-pointer rounded-[10px] flex align-center justify-center"
        >
          <p>Хочу обновить данные</p>
        </button>

        {isUserWantEditData && (
          <div className="bg-custom-fon-darkGray fixed z-50 w-screen h-screen top-0 left-0 flex justify-center items-center">
            <div className="bg-custom-darkGray p-6 rounded-xl w-[500px]">
              <p className="text-white text-xl mb-4">Редактирование данных</p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {names.map((atribut, index) => (
                  <div key={index} className="flex flex-col">
                    <label className="text-white mb-1" htmlFor={atribut}>
                      {fieldLabels[atribut]}
                    </label>
                    <input
                      type={atribut === "password" ? "password" : "text"}
                      name={atribut}
                      value={formData[atribut]}
                      onChange={handleChange}
                      className="rounded p-2"
                    />
                  </div>
                ))}
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setIsUserWantEditData(false)}
                    className="bg-gray-500 text-white py-2 px-4 rounded"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="bg-custom-red text-white py-2 px-4 rounded"
                  >
                    Сохранить
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
