import React, { useEffect, useState } from "react";
type props = {
  status: string | number;
};
export default function AllMessages({ status }: props) {
  const [isVisibleMesasages, setIsVisibleMesasages] = useState<boolean>(false);
  useEffect(() => {
    if (status !== null && status !== undefined) {
    setIsVisibleMesasages(!isVisibleMesasages)
    }
    const timer = setTimeout(() => {
      setIsVisibleMesasages(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [status]);
  const getStatusStyle = () => {
    if (status === 200 || status === "200") return "bg-green-500";
    if (status === 201 || status === "201") return "bg-green-500";
    if (status === 400 || status === "400") return "bg-red-500";
    if (status === 500 || status === "500") return "bg-yellow-500";
    return "bg-gray-500"; // по умолчанию
  };
  const getStatus = () => {
    if (status === 200 || status === "200") return "Успешно";
    if (status === 201 || status === "201") return "Создано";
    if (status === 400 || status === "400") return "Провалено";
    if (status === 500 || status === "500") return "Ошибка сервера";
    return "Ничего"; // по умолчанию
  };
  return isVisibleMesasages ? (
    <div
      className={`absolute left-[50%] top-0 translate-x-[-50%] font-bold w-fit h-[40px] z-[10000] p-2 text-white rounded-md ${getStatusStyle()}`}
    >
      {getStatus()}
    </div>
  ) : null;
}
