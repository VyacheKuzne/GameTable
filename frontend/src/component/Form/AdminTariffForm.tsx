import React, { useEffect, useState } from "react";
import EditLine from "../../img/EditLine.svg";
import Cross from "../../img/Cross.svg";
import axios from "axios";
type TableHeader = {
  label: string;
  key: string;
};
type Tariff = {
    name: string;
    status?: string;
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
}: Props) {
  const [tariffData, setTariffData] = useState<Tariff | null>(null);
  const [newTariff, setNewTariff] = useState<Tariff>(() => {
    const initial: any = {};
    
    // Фильтруем headers, чтобы исключить 'idTariff'
    tableHeadersWithKeys.forEach((header) => {
      if (header.key !== 'idTariff') {  // Убираем 'idTariff'
        initial[header.key] = "";
      }
    });
  
    initial.status = "active"; // или другой дефолт
    return initial;
  });
  
  
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
      setTariffData({
        ...tariffData,
        [key]: value,
      });
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
      console.log(tariffData);
      const response = await axios.post(
        "http://localhost:3000/createTariff",
        tariffData
      );
  
      console.log(response.status);
    } catch (error) {
      console.error(error);
    }
  };

  function closeModalBlock() {
    setIsEdit(false);
    setIsDelete(false);
    setIsCreate?.(false);
  }
  async function deleteTariff (){
    try {
      console.log(tariffData)
      const responce = await axios.patch(
        "http://localhost:3000/deleteTariff",
        tariffData
      )
      console.log(responce.status)
    } catch (error) {
      
    }
  }
  return (
    <div
      className={`bg-custom-fon-darkGray fixed w-screen h-screen z-40 content-center ${
        isDelete || isEdit || isCreate ? "block" : "hidden"
      }`}
    >
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
                  tableHeaders.key !== "idTariff" && tableHeaders.key !== "createdAt"
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
            Вы действительно хотите удалить пользователя №12312 ?
          </p>
        </div>
        <div>
          <div className="flex justify-around">
            <button onClick={()=> deleteTariff()} className="w-[50px] h-[50px] bg-custom-red hover-effect-btn-red rounded-[10px]">
              <p className="text-white font-bold">ДА</p>
            </button>
            <button onClick={() => {setIsDelete(!isDelete)}} className="w-[50px] h-[50px] bg-custom-green hover-effect-btn-green rounded-[10px]">
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
                tableHeaders.key !== "idTariff"
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
