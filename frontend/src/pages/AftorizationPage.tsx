import React, { useEffect, useState } from "react";
import axios from "axios";
import Poligon from "../img/Polygon.svg";
import { useNavigate } from "react-router-dom";
import ErrorMessages from "../component/messages/ErrorMessages";
export default function ExitPage() {
  const navigate = useNavigate();
  const [dataFrom, setDataFrom] = useState({
    nickname: "",
    password: "",
  });
  const [error, setError] = useState<boolean>(false);
  const fetchData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataFrom((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Предотвращаем перезагрузку страницы
    function showError(){
      setError(true)
      setTimeout(()=>{
        setError(false)
      },2000)
    }
    try {
      console.log(dataFrom);
      const response = await axios.post(
        "http://localhost:3000/autorization",
        dataFrom,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(document.cookie);
      console.log(response.data);
      if ((response.status = 201)) {
        navigate("/");
      }
      console.log(error)
    } catch (error) {
      console.log(error);
      showError()
    }
  };

  const blockCount = 15;

  const getRandomSize = () => Math.floor(Math.random() * 200) + 35;
  const getRandomColor = () => (Math.random() > 0.5 ? "black" : "white");
  const getRandomPosition = () => ({
    top: `${Math.random() * 50}%`,
    left: `${Math.random() * 90}%`,
  });
  const getRandomDelay = () => Math.floor(Math.random() * 3000) + 1000;

  const [blocks, setBlocks] = useState(
    Array.from({ length: blockCount }, () => ({
      size: getRandomSize(),
      color: getRandomColor(),
      position: getRandomPosition(),
      scale: 1,
    }))
  );

  useEffect(() => {
    const timeouts = blocks.map((_, index) => {
      const animateBlock = () => {
        setBlocks((prevBlocks) =>
          prevBlocks.map((block, i) =>
            i === index
              ? { ...block, scale: block.scale === 1 ? 0.9 : 1 }
              : block
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
      {error ? (<ErrorMessages textError={"Такой пользователь не найден, возможно он был удален"} /> ): (null)}
     
      <div className="border-[5px] my-[10%] border-white shadow-inner z-10 bg-custom-red relative rounded-xl w-1/3 m-auto p-8 max-w-[630px] min-w-[600px]">
        <form className="relative m-auto w-full" onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
            <a href="/registartion" className="text-[32px] text-white">
              Регистрация
            </a>
            <div className="w-[18px] h-[18px] rounded-full bg-white"></div>
            <a href="/aftorization" className="text-[32px] text-white">
              Авторизация
            </a>
          </div>
          <div className="grid grid-cols-2">
            {/* 3 */}
            <div className="border-r-[1px] border-b-[1px]">
              <label className="block label-text">ПАРОЛЬ</label>
              <input
                type="text"
                className="bg-transparent input-r"
                name="password"
                onChange={fetchData}
              />
            </div>
            {/* 5 */}
            <div className="border-b-[1px]">
              <label className="block label-text pl-2">НИК</label>
              <input
                type="text"
                className="bg-transparent input-r pl-2"
                name="nickname"
                onChange={fetchData}
              />
            </div>
            {/* end */}
          </div>
          <div></div>
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
