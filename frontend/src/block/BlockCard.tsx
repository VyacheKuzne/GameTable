import React from "react";
import CursCard from "../component/Card/CursCard";
import history from '../img/advantages/history.svg'
import key from '../img/advantages/key.svg'
import plus from '../img/advantages/plus.svg'
import tarif from '../img/advantages/tarif.svg'
import axios from "axios";
import { GameHub } from "../interface/interface.interface";
import { useNavigate } from "react-router-dom";
 function Header() {
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;
    async function ctrateGamesession(): Promise<void> {
        try {
            console.log('пытаемся')
            const responce = await axios.get (`http://localhost:3000/createGameSession`)
            if(responce.status === 200||201) {
                navigate("/gamePage");
            }
        } catch (error) {
            
        }
    }
    function function1() {
        navigate("/tarif");
    }
    function function2() {
        navigate("/tarif");
    }
    function function3() {
        navigate("/tarif");
    }
    const size = 240
    return(
    <>
        <div className="flex m-auto my-[200px]">
            <CursCard 
             onclick={function1}
             mainText='Присоединиться к игре по ключу' 
             subText='Уникальный ключ вам сообщит создатель игры' 
             img={key} 
             size={size} 
        />
            <CursCard
             onclick={ctrateGamesession}
             mainText='Создать игровую сессию'
             subText='Вы можете создать свою игру по своему усмотрению' 
             img={plus}
             size={size}
        />
            <CursCard
             onclick={function2} 
             mainText='Посмотреть историю игр' 
             subText='Посмотрите историю своих прошлых игра' 
             img={history} 
             size={size}
        />
            <CursCard
             onclick={function3}
             mainText='Посмотреть акутальные тарифы' 
             subText='Можете обновить свой тариф, лучше тариф-лучше условия' 
             img={tarif} 
             size={size}
        />
        </div>
    </>
    )
 }

 export default Header