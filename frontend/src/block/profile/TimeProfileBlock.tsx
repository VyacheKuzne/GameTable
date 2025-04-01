import React from 'react'
import RedButton from '../../component/Button/RedButton'
export default function TimeProfileBlock() {
  return (
    <div className='shadow-md font-medium rounded-xl text-[36px]  w-full p-[1.2%]'>
      <p>Оставшееся время по тарифу</p>
      <div className='my-[1%]'>
        <img src="" alt="" />
        <p>9 часов</p>
      </div>
      <p>Текущий тарифный план: разовый</p>
     <RedButton text='Желаете обновить тарифный план?' f='16px' p='2%'/>
    </div>
  )
}
