import React from 'react'

export default function PlayerCard() {
  return (
    <div className='absolute left-[50%] translate-x-[-50%] bottom-0 w-[500px] h-[300px] bg-white'>
        ваш персонаж
        <div>
            <button className='bg-custom-red text-white p-2 rounded-[20px] m-2'>двигаться</button>
            <button className='bg-custom-red text-white p-2 rounded-[20px]'>атаковать</button>
        </div>
    </div>
  )
}
