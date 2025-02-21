import React from "react";
import ArrowImg from '../img/ArrowImg.svg';
// import { useState, } from "react";
 function Header() {
    // const linkText = [
    //     'Вебинары', 'Курсы', 'Практика', 'О нас'
    // ]
    // const [linkText, _setlinkText] = useState() 
    return(
        <>
        <header className="flex justify-center">
            <div className="flex w-full content-center my-[10px]">
                <button className="bg-custom-darkGray rounded-tr-xl flex place-items-center text-white p-[0.5%]">
                    <p>Меню</p>
                    <img src={ArrowImg} alt="Стрелка" />
                </button>
            </div>
        </header>
        </>
    )
 }

 export default Header