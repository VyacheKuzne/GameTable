import React, { useEffect, useState } from "react";
import EditLine from "../../img/EditLine.svg";
import Cross from "../../img/Cross.svg";
import axios from "axios";
import AllMessages from "../messages/AllMessages";
type TableHeader = {
  label: string;
  key: string;
};
type Tariff = {
  idTariff: number;
  name: string;
  status?: string; // По умолчанию "active", поэтому можно оставить необязательным
  availableMobs: number;
  availableTime: number;
  price: number;
};
type Props = {
  tableHeadersWithKeys: TableHeader[];
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
  isDelete: boolean;
  isEdit: boolean;
  selectedTariff?: Tariff | null;
  isCreate?: boolean;
  setIsCreate?: React.Dispatch<React.SetStateAction<boolean>>;
  loadTariffs: () => void;
};

export default function AdminUserForm({
  tableHeadersWithKeys,
  setIsEdit,
  setIsDelete,
  setIsCreate,
  isDelete,
  isEdit,
  isCreate,
  selectedTariff,
  loadTariffs,
}: Props) {
  const [tariffData, setTariffData] = useState<Tariff | null>(null);
  const [newTariff, setNewTariff] = useState<Tariff>(() => {
    const initial: any = {};

    // Исключаем 'idTariff' и 'createdAt'
    tableHeadersWithKeys.forEach((header) => {
      if (header.key !== "idTariff" && header.key !== "createdAt") {
        initial[header.key] = "";
      }
    });

    initial.status = "active"; // или другой дефолт
    return initial;
  });
  const [status, setStatus] = useState<number | string>()

  useEffect(() => {
    if (selectedTariff) {
      setTariffData(selectedTariff); // Инициализация состояния из пропса
    }
  }, [selectedTariff]);
  useEffect(() => {
    if (isCreate) {
      setTariffData(newTariff);
    }
  }, [isCreate]);
  const handleInputChange = (key: keyof Tariff, value: string) => {
    if (tariffData) {
      const numericFields: (keyof Tariff)[] = [
        "availableMobs",
        "availableTime",
        "price",
      ];

      setTariffData({
        ...tariffData,
        [key]: numericFields.includes(key) ? Number(value) : value,
      });
    }
  };
  const validateTariffData = (tariffData: Tariff) => {
  if (tariffData.availableMobs <= 0) {
    throw new Error("Available Mobs must be a positive number.");
  }
  if (tariffData.availableTime <= 0) {
    throw new Error("Available Time must be a positive number.");
  }
  if (tariffData.price <= 0) {
    throw new Error("Price must be a positive number.");
  }
};
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      console.log(tariffData);
      const response = await axios.patch(
        "http://localhost:3000/updateTariff",
        tariffData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.status);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmitCreate = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!tariffData) return;

 try {
    // Валидация данных перед отправкой
    validateTariffData(tariffData);

    console.log(tariffData);

    // Отправка данных
    const response = await axios.post(
      "http://localhost:3000/createTariff",
      tariffData,
      { withCredentials: true }
    );
  setStatus(response.status)
    loadTariffs(); // Обновление списка тарифов после успешной отправки
    console.log(response.status); // Выводим статус ответа
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message); // Выводим ошибку валидации или ошибки сети
      setStatus(500)
    }
  }
  };

  function closeModalBlock() {
    setIsEdit(false);
    setIsDelete(false);
    setIsCreate?.(false);
  }
    async function deleteTariff() {
      try {
        console.log(tariffData);
        const responce = await axios.patch(
          "http://localhost:3000/deleteTariff",
          tariffData
        );
        loadTariffs()
        console.log(responce.status);
      } catch (error) {
        alert('Тариф уже используеться и его нельзя удалить!')
      }
    }
  return (
    <div
      className={`bg-custom-fon-darkGray fixed w-screen h-screen z-40 content-center ${
        isDelete || isEdit || isCreate ? "block" : "hidden"
      }`}
    >
      <AllMessages status={status!}/>
      <div
        className={`bg-custom-darkGray relative rounded-[20px] p-[1.5%] w-1/4 m-auto ${
          isEdit ? "block" : "hidden"
        }`}
      >
        <button
          onClick={() => closeModalBlock()}
          className="absolute right-[-10px] top-[-10px] bg-custom-red hover-effect-btn-red flex items-center justify-center w-[33px] h-[33px] rounded-[10px]"
        >
          <img src={Cross} alt="Cross" />
        </button>
        <div className="flex flex-col items-center">
          <p className="text-[22px] font-medium text-white">
            Изменить данные тарифа
          </p>
          <img src={EditLine} alt="EditLine" />
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className={`flex flex-col justify-between`}
            style={{ height: `calc(${tableHeadersWithKeys.length} * 67px)` }}
          >
            {tableHeadersWithKeys
              .filter(
                (tableHeaders) =>
                  tableHeaders.key !== "idTariff" &&
                  tableHeaders.key !== "createdAt"
              )
              .map((tableHeaders) => {
                return (
                  <div className="flex flex-col">
                    <label
                      className="pl-2 text-white font-medium"
                      htmlFor={`${tableHeaders.key}`}
                    >
                      {tableHeaders.label}
                    </label>
                    <input
                      type="text"
                      placeholder={`${tableHeaders.label}`}
                      className="h-[47px] rounded-[10px] pl-2"
                      value={
                        tariffData
                          ? tariffData[tableHeaders.key as keyof Tariff]
                          : ""
                      }
                      onChange={(e) => {
                        handleInputChange(
                          tableHeaders.key as keyof Tariff,
                          e.target.value
                        );
                      }}
                    />
                  </div>
                );
              })}
            <div className="w-full h-[67px] flex items-end">
              <button
                className="bg-custom-red rounded-[10px] w-full h-[47px]"
                type="submit"
              >
                <p className="text-white font-medium">Подтверждаю изменения</p>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className={`bg-custom-darkGray relative rounded-[20px] p-[1.8%] w-1/4 m-auto ${
          isDelete ? "block" : "hidden"
        }`}
      >
        <button
          onClick={() => closeModalBlock()}
          className="absolute right-[-10px] top-[-10px] bg-custom-red hover-effect-btn-red flex items-center justify-center w-[33px] h-[33px] rounded-[10px]"
        >
          <img src={Cross} alt="Cross" />
        </button>
        <div className="flex flex-col items-center">
          <p className="text-[22px] font-medium text-white">
            Подтвердить удаление
          </p>
          <img src={EditLine} alt="EditLine" />
          <p className="text-center text-white font-bold my-[3%]">
            Вы действительно хотите удалить тариф №
            {`${selectedTariff?.idTariff}`} ?
          </p>
        </div>
        <div>
          <div className="flex justify-around">
            <button
              onClick={() => deleteTariff()}
              className="w-[50px] h-[50px] bg-custom-green hover-effect-btn-green rounded-[10px]"
            >
              <p className="text-white font-bold">ДА</p>
            </button>
            <button
              onClick={() => {
                setIsDelete(!isDelete);
              }}
              className="w-[50px] h-[50px] bg-custom-red hover hover-effect-btn-red rounded-[10px]"
            >
              <p className="text-white font-bold">НЕТ</p>
            </button>
          </div>
        </div>
      </div>
      <div
        // {isCreate ? console.log('да') : console.log('нет')}
        className={`bg-custom-darkGray relative rounded-[20px] p-[1.8%]   w-1/4 m-auto ${
          isCreate ? "block" : "hidden"
        }`}
      >
        <button
          onClick={() => closeModalBlock()}
          className="absolute right-[-10px] top-[-10px] bg-custom-red hover-effect-btn-red flex items-center justify-center w-[33px] h-[33px] rounded-[10px]"
        >
          <img src={Cross} alt="Cross" />
        </button>
        <div className="flex flex-col items-center">
          <p className="text-[22px] font-medium text-white">
            Создание нового тарифа
          </p>
          <img src={EditLine} alt="EditLine" />
          <p className="text-center text-white font-bold my-[3%]">
            Введите данные по тарифу
          </p>
        </div>
        <form
          onSubmit={handleSubmitCreate}
          className={`flex flex-col justify-between`}
          style={{ height: `calc(${tableHeadersWithKeys.length} * 67px)` }}
        >
          {tableHeadersWithKeys
            .filter(
              (tableHeaders) =>
                tableHeaders.key !== "id" &&
                tableHeaders.key !== "createdAt" &&
                tableHeaders.key !== "idTariff" &&
                tableHeaders.key !== "status"
            )
            .map((tableHeaders) => {
              return (
                <div className="flex flex-col">
                  <label
                    className="pl-2 text-white font-medium"
                    htmlFor={`${tableHeaders.key}`}
                  >
                    {tableHeaders.label}
                  </label>
                  <input
                    type="text"
                    placeholder={`${tableHeaders.label}`}
                    className="h-[47px] rounded-[10px] pl-2"
                    onChange={(e) => {
                      handleInputChange(
                        tableHeaders.key as keyof Tariff,
                        e.target.value
                      );
                    }}
                  />
                </div>
              );
            })}
          <div className="w-full h-[67px] flex items-end">
            <button
              className="bg-custom-red hover-effect-btn-red rounded-[10px] w-full h-[47px]"
              type="submit"
            >
              <p className="text-white font-medium">Подтверждаю создание</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
