import React, { useEffect, useState } from "react";
import Poligon from '../img/Polygon.svg'
export default function ExitPage() {
  const blockCount = 15;
  
  const getRandomSize = () => Math.floor(Math.random() * 200) + 35;
  const getRandomColor = () => (Math.random() > 0.5 ? "black" : "white");
  const getRandomPosition = () => ({
    top: `${Math.random() * 50}%`,
    left: `${Math.random() * 90}%`,
  });
  const getRandomDelay = () => Math.floor(Math.random() * 3000) + 1000; // от 1 до 4 секунд

  // Создаём массив блоков с начальными значениями
  const [blocks, setBlocks] = useState(
    Array.from({ length: blockCount }, () => ({
      size: getRandomSize(),
      color: getRandomColor(),
      position: getRandomPosition(),
      scale: 1, // Используем scale для плавности
    }))
  );

  useEffect(() => {
    const timeouts = blocks.map((_, index) => {
      const animateBlock = () => {
        setBlocks((prevBlocks) =>
          prevBlocks.map((block, i) =>
            i === index ? { ...block, scale: block.scale === 1 ? 0.9 : 1 } : block
          )
        );

        setTimeout(animateBlock, getRandomDelay());
      };

      return setTimeout(animateBlock, getRandomDelay());
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="bg-custom-darkGray w-screen h-screen relative">
      {/* Контейнер формы */}
      <div className="border-[5px] my-[10%] border-white shadow-inner z-10 bg-custom-red relative rounded-xl w-1/3 m-auto p-8 max-w-[630px] min-w-[600px]">
        <form className="relative m-auto w-full">
          <div className="flex justify-between items-center">
            <p className="text-[32px] text-white">Регистрация</p>
            <div className="w-[18px] h-[18px] rounded-full bg-white"></div>
            <p className="text-[32px] text-white">Авторизация</p>
          </div>
          <div className="flex">
            <input
              type="text"
              name="firstName"
              placeholder="ВЯЧЕСЛАВ"
              className="relative bg-transparent text-white border-white border-b-2 border-r-2 w-1/2 h-[46px]"
            />
            <label htmlFor="firstName" className="absolute text-[10px] font-bold text-white">
              ИМЯ
            </label>
            <input
              type="text"
              name="secondName"
              placeholder="КУЗНЕЦОВ"
              className="relative bg-transparent text-white border-white border-b-2 w-1/2 h-[46px] pl-3"
            />
            <label htmlFor="secondName" className="absolute left-[52%] text-[10px] font-bold text-white">
              Фамилия
            </label>
          </div>
          <div className="flex">
            <input
              type="text"
              name="emailInput"
              placeholder="VACESLAVK70@GAMIL.COM"
              className="bg-transparent text-white border-white border-b-2 border-r-2 w-1/2 h-[46px]"
            />
            <label htmlFor="emailInput" className="absolute text-[10px] font-bold text-white">
              ЭЛЕКТРОННАЯ ПОЧТА
            </label>
            <input
              type="text"
              name="phoneInput"
              placeholder="+7 904 152 85 77"
              className="bg-transparent text-white border-white border-b-2 w-1/2 h-[46px] pl-3"
            />
            <label htmlFor="phoneInput" className="absolute left-[52%]  text-[10px] font-bold text-white">
              НОМЕР ТЕЛЕФОНА
            </label>
          </div>
          <button
            type="submit"
            className="rounded-full flex items-center justify-center bg-custom-red absolute top-1/3 right-[-14%] border-[5px] border-white w-[74px] h-[74px]"
          >
            <img src={Poligon} alt="Poligon" />
          </button>
        </form>
      </div>

      {/* Генерация блоков */}
      {blocks.map((block, index) => (
        <div
          key={index}
          className="absolute z-1 rounded-[15%]"
          style={{
            width: `${block.size}px`,
            height: `${block.size}px`,
            backgroundColor: block.color,
            top: block.position.top,
            left: block.position.left,
            transform: `scale(${block.scale})`,
            transition: "transform 1.5s ease-in-out", // Плавное изменение
          }}
        ></div>
      ))}
    </div>
  );
}
