import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AdminMenuBlock from "../../img/AdminMenuBlokc.svg";
export default function AminModalBlockMenu() {
  const location = useLocation();
  const activeTag = location.pathname.includes("tarifs") ? "tarifs" : "users";
  const localUrls = {
    users: {
      url: "/AdminPanel/users",
      text: "пользователи",
    },
    tarifs: {
      url: "/AdminPanel/tarifs",
      text: "тарифы",
    },
  };
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="relative w-[320px] h-[100px]">
      {/* МЕНЮ */}
      <div
        className={`
        absolute  bg-custom-darkGray w-[320px] z-20 flex flex-col rounded-lg rounded-l-[0px] shadow-lg overflow-hidden
        transition-transform duration-300
        ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
      `}
      >
        {Object.entries(localUrls).map(([key, url]) => (
          <div className="flex items-center gap-2 px-4 py-3" key={key}>
            <div
              className={`h-[20px] ${
                activeTag === key ? "w-[3px] bg-white" : "w-[1px] bg-white"
              }`}
            ></div>
            <a
              href={url.url}
              className={`mx-[1.5%] ${
                activeTag === key ? "text-custom-red" : "text-white"
              }`}
            >
              {url.text}
            </a>
          </div>
        ))}
      </div>

      {/* КНОПКА */}
      <div
      className={`transition-all duration-300 transform ${
        isOpen
          ? "absolute bottom-[-10px] translate-x-[300px] translate-y-[10px] z-30 w-[35px] h-[35px]"
          : "absolute left-0 bottom-[-10px] translate-x-0 translate-y-0 z-30 w-[35px] h-[35px]"
      }`}
      >
        <img
          src={AdminMenuBlock}
          className="absolute w-full h-full pointer-events-none"
          alt="AdminMenuBlock"
        />
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="absolute w-full h-full bottom-0 left-0"
        >
          {/* Горизонтальная линия */}
          <div
            className={`
            absolute left-[20%] top-[45%] w-1/2 h-[3px] bg-white rounded transition-all duration-300
            ${isOpen ? "" : "rotate-90"}
          `}
          ></div>

          {/* Вертикальная линия */}
          <div
            className={`
            absolute left-[40%] top-[25%] w-[3px] h-1/2 bg-white rounded transition-all duration-300
            ${isOpen ? "opacity-0" : "opacity-100 rotate-[-90deg]"}
          `}
          ></div>
        </button>
      </div>
    </div>
  );
}
