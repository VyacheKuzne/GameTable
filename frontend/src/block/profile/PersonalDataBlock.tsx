import React from 'react'
import RedButton from '../../component/Button/RedButton'
export default function PersonalDataBlock() {
  const names = ['password', 'nickname', 'email', 'fio', 'phone']
  return (
    <div className='shadow-md p-[1.2%]'>
      <p className='text-[36px] font-medium'>Ваши данные</p>
      <div className='grid grid-cols-2 items-end'>
        {names.map((name,index)=>(
          <div key={index} className='flex flex-col w-[367px]'>
            <label className='text-[24px]' htmlFor={name}>{name}</label>
            <input type="text" name={name} className='placeholder:text-black placeholder:text-[36px] placeholder: pl-3 bg-slate-200 rounded-xl h-[63px]' placeholder={name}/>
          </div>
        ))}
        <RedButton h='63px' w='367px' text='Хочу обновить данные'/>
      </div>
    </div>
  )
}
