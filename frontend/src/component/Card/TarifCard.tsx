import React from 'react'
import RedButton from '../Button/RedButton'
export default function TarifCard() {
    const Advantages = [
        '15 часов',
        'Доступ к базе оружия и брони',
        'Доступ к базе  мобов',
    ]
  return (
    <div className='w-[400px] h-[233px] relative m-autom my-[5%]'>
      <div content='' className='bg-custom-red absolute top-[-22px] left-[-22px] w-[177px] h-[177px]  rounded-xl'></div>
      <div className='flex flex-col p-[4%] justify-between font-medium relative w-full h-full bg-white rounded-xl shadow-lg z-20'>
        <h2 className='text-[24px]'>Разовый - платишь один раз</h2>
        <div className='flex flex-col justify-around h-full'>
           {Advantages.map((key, index)=>(
            <div key={index} className='flex items-center'>
                <div content='' className='w-[15px] h-[15px] bg-custom-darkGray rounded'></div>
                <p className='mx-[2%]'>{key}</p>
            </div>
           ))}
        </div>
        <div className='flex items-center justify-between'>
           <RedButton text='Оформить' w='188px' h='40px'/>
           <p className='text-[36px] font-medium'>500 руб.</p>
        </div>
      </div>
    </div>
  )
}
