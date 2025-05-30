import React, { useState } from "react";
import CursCard from "../component/Card/CursCard";
import history from "../img/advantages/history.svg";
import key from "../img/advantages/key.svg";
import plus from "../img/advantages/plus.svg";
import tarif from "../img/advantages/tarif.svg";
import axios from "axios";
import { GameHub } from "../interface/interface.interface";
import Cross from "../img/Cross.svg";
import { useNavigate } from "react-router-dom";
function Header() {
  const [isModalKey, setIsModalKey] = useState<boolean>(false);
  const [tokenSession, setTokenSession] = useState<string>("");
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  type GameHub = {
    idSession: number;
    token: string;
    status: string;
    createdAt: Date;
    updateAt: Date;
  };
  const interceptionKeY = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.value;
    setTokenSession(key);
  };
  const searthFunction = () => {
    navigate(`/gamePage/${tokenSession}`)
  };
  async function ctrateGamesession(): Promise<GameHub> {
    try {
      const responce = await axios.get(
        `http://localhost:3000/createGameSession`,
        { withCredentials: true } 
      );
      if (responce.status === 200 || 201) {
        console.log("наш токен " + responce.data.token);

        navigate(`/gamePage/${responce.data.token}`);
      }
      console.log(responce.status);
      return responce.data;
    } catch (error) {
      console.error(error);
      throw new Error("Не удалось создать игровую сессию");
    }
  }
  function function1() {
    setIsModalKey(!isModalKey);
  }
  function function2() {
    navigate("/HistoruGames");
  }
  function function3() {
    navigate("/tarifs");
  }
  const size = 240;
  return (
    <>
      <div className="flex m-auto my-[200px]">
        {isModalKey ? (
          <div className="h-screen w-screen bg-custom-fon-darkGray fixed z-[1000] top-0 left-0 content-center text-center">
            <p className="text-[36px] text-white font-bold my-2">Код игры</p>
            <div className="m-auto flex relative p-3 bg-white w-1/3 rounded-[20px] h-[86px]">
              <button
                onClick={() => setIsModalKey(!isModalKey)}
                className="absolute bg-custom-red right-[-15px] top-[-15px] rounded-md h-fit w-fit p-2 flex items-center justify-center hover-effect-btn-red"
              >
                <img src={Cross} alt="Cross" />
              </button>
              <input
                type="text"
                onChange={interceptionKeY}
                className="border-[5px] border-custom-red text-[24px] pl-2 w-full font-bold rounded-l-[20px]"
              />
              <button
                onClick={searthFunction}
                type="submit"
                className="h-full bg-custom-red text-white font-bold rounded-r-[20px] p-5 hover-effect-btn-red"
              >
                поиск
              </button>
            </div>
          </div>
        ) : null}
        <CursCard
          onclick={function1}
          mainText="Присоединиться к игре по ключу"
          subText="Уникальный ключ вам сообщит создатель игры"
          img={key}
          size={size}
        />
        <CursCard
          onclick={ctrateGamesession}
          mainText="Создать игровую сессию"
          subText="Вы можете создать свою игру по своему усмотрению"
          img={plus}
          size={size}
        />
        {/* <CursCard
          onclick={function2}
          mainText="Посмотреть историю игр"
          subText="Посмотрите историю своих прошлых игра"
          img={history}
          size={size}
        /> */}
        <CursCard
          onclick={function3}
          mainText="Посмотреть акутальные тарифы"
          subText="Можете обновить свой тариф, лучше тариф-лучше условия"
          img={tarif}
          size={size}
        />
      </div>
    </>
  );
}

export default Header;
