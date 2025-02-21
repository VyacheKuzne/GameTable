import React from 'react';
import Fon from '../img/Fon.png'
import FonImg from '../img/FonImg.png'
import Advantage from '../component/Advantage'
import './BlockAdvantages.css'
function BlockAdvantages() {
    const AdvantageText = [
        'Возможность играть без лишней настройки',
        'Низкий порог входа',
        'Короткие игровые сессии',
        'Разнообразие игровых ситуаций'
      ];
    return(
        <>
        <div className='realtive w-full m-auto my-[10%]'>
            <img src={Fon} alt="Фоновое изображение" className='w-full absolute'/>
            <img src={FonImg} alt="Изображение для фонового" className='FonImg'/>
            <div className='AdvantageText'>
                {AdvantageText.map((text, index) =>(
                    <Advantage key={index} text={text}/>
                ))}
            </div>
        </div>
        </>
    )
}

export default BlockAdvantages