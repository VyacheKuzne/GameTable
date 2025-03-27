import React from 'react';
import Fon from '../img/Fon.png'
import FonImg from '../img/FonImg.png'
import Advantage from '../component/Advantage'
import './BlockAdvantages.css'
import Array from '../img/Array.svg'

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
            <div className='AdvantageText mx-[200px]'>
                <p className='text-[48px] text-white font-semibold'>Преимущества</p>
                {AdvantageText.map((text, index) =>(
                    <div className='flex items-center my-[20px] '>
                        <div className='flex w-fit relative items-center justify-center'>
                            <img src={Array} alt="array" className='relative flex'/>
                            <p className='absolute text-[36px] font-semibold text-white'>{index+1}</p>
                        </div> 
                        <p className='text-[24px] font-semibold'>
                            <Advantage key={index} text={text}/>
                        </p>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}

export default BlockAdvantages