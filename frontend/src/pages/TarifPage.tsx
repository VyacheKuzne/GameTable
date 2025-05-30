import React, { useEffect, useState } from "react";
import Header from "../block/Header";
import TarifCard from "../component/Card/TarifCard";
import axios from "axios";
import Line from "../img/EditLine.svg";
export default function TarifPage() {
  type Tariff = {
    idTariff: number;
    name: string;
    status?: string; // По умолчанию "active", поэтому можно оставить необязательным
    availableMobs: number;
    availableTime: number;
    price: number;
  };
  const [allTariff, setAllTariffs] = useState<Tariff[]>([]);
  const [isBuyTariff, setIsBuyTariff] = useState<boolean>(false);
  const [buyTariff, setBuyTariff] = useState<Tariff>();
  useEffect(() => {
    const allTariff = async () => {
      try {
        const response = await axios.get("http://localhost:3000/find/tariffs");
        setAllTariffs(response.data);
        console.log("Tariff:", response.data);
      } catch (error) {
        console.log("не получилось получить данные про пользователей", error);
      }
    };
    allTariff();
  }, []);

 const userBuyTariff = async function () {
  try {
    const response = await axios.post(
      "http://localhost:3000/buyTarif",
      buyTariff,
      {
        withCredentials: true,
      }
    );

    // Перезагружаем страницу после успешного запроса
    window.location.reload();
  } catch (error) {
    console.log("Не получилось получить данные про пользователей", error);
  }
};

  return (
    <div>
      {isBuyTariff ? (
        <div className="bg-custom-fon-darkGray  w-full h-full z-[1000] fixed ">
          <div className="w-1/4 bg-white absolute rounded-[20px] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] p-2 flex flex-col items-center">
            <p className="text-[24px] font-medium">Заполните данные карты</p>
            <img src={Line} alt="Line" />
            <form className="grid grid-cols-2 gap-4 mt-4">
              {/* Первый input на всю ширину (2 колонки) */}
              <input
                type="text"
                className="border-2 h-[40px] border-custom-red rounded-[10px] col-span-2"
                placeholder="Введите номер карты"
              />

              {/* Следующие два input — по половине ширины */}
              <input
                type="text"
                className="border-2 h-[40px] border-custom-red rounded-[10px]"
                placeholder="Срок годности"
              />
              <input
                type="text"
                className="border-2 h-[40px] border-custom-red rounded-[10px]"
                placeholder="Номер с оборота"
              />
            </form>
            <button
              onClick={userBuyTariff}
              type="submit"
              className="h-[40px]  bg-custom-red text-white font-medium mt-[15px] rounded-[10px] p-2 hover-effect-btn-red"
            >
              оформить тариф
            </button>
          </div>
        </div>
      ) : null}
      <Header />
      <div className="grid grid-cols-3 p-[7%]">
        {allTariff
          .filter((tariff) => tariff.status !== "delete") // Фильтруем тарифы с состоянием 'delete'
          .map((tariff, index) => (
            <TarifCard
              setBuyTariff={setBuyTariff}
              setIsBuyTariff={setIsBuyTariff}
              key={index}
              tariff={tariff}
            />
          ))}
      </div>
    </div>
  );
}
