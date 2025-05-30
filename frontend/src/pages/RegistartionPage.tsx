import React, { useEffect, useState } from "react";
import axios from "axios";
import Poligon from "../img/Polygon.svg";
import { useNavigate } from "react-router-dom";
import YandexLogo from "../img/Yandex_icon.svg.png";
export default function RegistartionPage() {
  const navigate = useNavigate();
  const [dataFrom, setDataFrom] = useState({
    name: "",
    secondname: "",
    nickname: "",
    email: "",
    password: "",
    phone: "",
    updateAt: new Date(),
  });

  const fetchData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataFrom((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  // Простая валидация
  const { name, secondname, nickname, email, password, phone } = dataFrom;

  if (!name || !secondname || !nickname || !email || !password || !phone) {
    alert("Пожалуйста, заполните все поля.");
    return;
  }

  // Простейшая email проверка
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Введите корректный email.");
    return;
  }

  // Простейшая проверка телефона (например, "+79991234567")
  const phoneRegex = /^\+\d{11,14}$/;
  if (!phoneRegex.test(phone)) {
    alert("Введите корректный номер телефона в формате +79991234567.");
    return;
  }

  if (password.length < 6) {
    alert("Пароль должен быть не менее 6 символов.");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:3000/create",
      dataFrom,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.status === 201) {
      navigate("/");
    }

    console.log(response.data);
  } catch (error) {
    console.error("Ошибка при отправке формы:", error);
  }
};

  // начало херни
  const protect = async () => {
    try {
      console.log("Отправка запроса на /registartion...");
      const response = await axios.get("http://localhost:3000/registartion", {
        withCredentials: true, // Это обязательно для передачи куков
      });
      console.log("Ответ от сервера:", response.data);
    } catch (error) {
      console.error("Ошибка при запросе:", error);
    }
  };

  // конец зерни

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
    // Выполняем запрос только один раз при монтировании компонента
    protect();

    const timeouts = blocks.map((_, index) => {
      const animateBlock = () => {
        setBlocks((prevBlocks) =>
          prevBlocks.map((block, i) =>
            i === index
              ? { ...block, scale: block.scale === 1 ? 0.9 : 1 }
              : block
          )
        );

        // Рекурсивный setTimeout для анимации блоков
        setTimeout(animateBlock, getRandomDelay());
      };

      return setTimeout(animateBlock, getRandomDelay());
    });

    // Очистка таймеров при размонтировании компонента
    return () => timeouts.forEach(clearTimeout);
  }, []); // Пустой массив зависимостей — запрос выполнится только один раз
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      // переход в личный кабинет или другое действие
    }
  }, []);

  const clientId = "48a5fec8f1ee4b3888ba3721222c255a";
  const redirectUri = "http://localhost:3000/auth/yandex/callback";

  const yandexAuthUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
  const handleYandexLogin = () => {
    window.location.href = yandexAuthUrl;
  };
  return (
    <div className="bg-custom-darkGray w-screen h-screen relative">
      <div className="border-[5px] my-[10%] border-white shadow-inner z-10 bg-custom-red relative rounded-xl w-1/3 m-auto p-8 max-w-[630px] min-w-[600px]">
        <form className="relative m-auto w-full" onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
            <a
              href="/registartion"
              className="text-[32px] font-medium text-white"
            >
              Регистрация
            </a>
            <div className="w-[18px] h-[18px] rounded-full bg-white"></div>
            <a href="/aftorization" className="text-[32px] text-white">
              Авторизация
            </a>
          </div>
          <div className="grid grid-cols-2">
            <div className="border-r-[1px] border-b-[1px]">
              <label className="block label-text">ИМЯ</label>
              <input
                type="text"
                className="bg-transparent input-r"
                name="name"
                onChange={fetchData}
              />
            </div>
            <div className="border-b-[1px]">
              <label className="block label-text pl-2">ФАМИЛИЯ</label>
              <input
                type="text"
                className="bg-transparent input-r pl-2"
                name="secondname"
                onChange={fetchData}
              />
            </div>
            <div className="border-r-[1px] border-b-[1px]">
              <label className="block label-text">ПАРОЛЬ</label>
              <input
                type="password"
                className="bg-transparent input-r"
                name="password"
                onChange={fetchData}
              />
            </div>
            <div className="border-b-[1px]">
              <label className="block label-text pl-2">ТЕЛЕФОН</label>
              <input
                type="text"
                className="bg-transparent input-r pl-2"
                name="phone"
                onChange={fetchData}
              />
            </div>
            <div className="border-r-[1px] border-b-[1px]">
              <label className="block label-text">НИК</label>
              <input
                type="text"
                className="bg-transparent input-r"
                name="nickname"
                onChange={fetchData}
              />
            </div>
            <div className="input-r w-full border-b-[1px]">
              <label className="block label-text pl-2">ПОЧТА</label>
              <input
                type="text"
                className="bg-transparent input-r pl-2"
                name="email"
                onChange={fetchData}
              />
            </div>
          </div>
          <button
            type="submit"
            className="rounded-full flex items-center justify-center hover-effect-btn-red bg-custom-red absolute top-1/3 right-[-14%] border-[5px] border-white w-[74px] h-[74px]"
          >
            <img src={Poligon} alt="Poligon" />
          </button>
        </form>
        <button
          className="mt-2 ml-[50%] translate-x-[-50%] w-fit p-1 h-[40px] flex items-center text-white bg-custom-darkGray rounded-md"
          onClick={handleYandexLogin}
        >
          <img className="h-full" src={YandexLogo} alt="YandexLogo" />
          <p>Войти через Яндекс</p>{" "}
        </button>
      </div>

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
            transition: "transform 1.5s ease-in-out",
          }}
        ></div>
      ))}
    </div>
  );
}
