import React from 'react'
import RedButton from '../Button/RedButton'
import axios from 'axios';
type Tariff = {
  idTariff: number
  name: string;
  status?: string; // По умолчанию "active", поэтому можно оставить необязательным
  availableMobs: number;
  availableTime: number;
  price: number;
};
type props = {
  tariff: Tariff
  setIsBuyTariff: React.Dispatch<React.SetStateAction<boolean>>
  setBuyTariff: React.Dispatch<React.SetStateAction<Tariff|undefined>>
}
export default function TarifCard({tariff, setIsBuyTariff, setBuyTariff}:props) {
    function buyTarif() {
      setIsBuyTariff(true)
      setBuyTariff(tariff)
    }

  return (
    <div className='w-[400px] h-[233px] relative m-autom my-[5%]'>
      <div content='' className='bg-custom-red  absolute top-[-22px] left-[-22px] w-[177px] h-[177px]  rounded-xl'></div>
      <div className='flex flex-col p-[4%] justify-between font-medium relative w-full h-full bg-white rounded-xl shadow-lg z-20'>
        <h2 className='text-[24px]'>{tariff.name}</h2>
        <div className='flex flex-col justify-around h-full'>
           {/* {Advantages.map((key, index)=>(
            <div key={index} className='flex items-center'>
                <div content='' className='w-[15px] h-[15px] bg-custom-darkGray rounded'></div>
                <p className='mx-[2%]'>{key}</p>
            </div>
           ))} */}
                 <div  className='flex items-center'>
                <div content='' className='w-[15px] h-[15px] bg-custom-darkGray rounded'></div>
                <p className='mx-[2%]'>Доступно мобов для создания: {tariff.availableMobs}</p>
            </div>
            <div className='flex items-center'>
                <div content='' className='w-[15px] h-[15px] bg-custom-darkGray rounded'></div>
                <p className='mx-[2%]'>Доступно минут: {tariff.availableTime}</p>
            </div>
        </div>
        <div className='flex items-center justify-between'>
           <RedButton onClick={buyTarif} text='Оформить' w='188px' h='40px'/>
           <p className='text-[36px] font-medium'>{tariff.price} руб.</p>
        </div>
      </div>
    </div>
  )
}
