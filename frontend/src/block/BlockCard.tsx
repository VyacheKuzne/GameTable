import React from "react";
import CursCard from "../component/Card/CursCard";
import history from '../img/advantages/history.svg'
import key from '../img/advantages/key.svg'
import plus from '../img/advantages/plus.svg'
import tarif from '../img/advantages/tarif.svg'
 function Header() {
    const size = 240
    return(
    <>
        <div className="flex m-auto my-[200px]">
            <CursCard mainText='Присоединиться к игре по ключу' subText='Уникальный ключ вам сообщит создатель игры' img={key} size={size} />
            <CursCard mainText='Создать игровую сессию' subText='Вы можете создать свою игру по своему усмотрению' img={plus} size={size}/>
            <CursCard mainText='Посмотреть историю игр' subText='Посмотрите историю своих прошлых игра' img={history} size={size}/>
            <CursCard mainText='Посмотреть акутальные тарифы' subText='Можете обновить свой тариф, лучше тариф-лучше условия' img={tarif} size={size}/>
        </div>
    </>
    )
 }

 export default Header