import React from 'react'
import './ModalBlockMenu.css'
export default function ModalBlockMenu() {
const menuItem = [
    { name: 'Профиль', link: '/profil' },
    { name: 'Тарифы', link: '/tarif' },
    { name: 'Выход', link: '/aftorization' },
]
  return (
    <>
      <div>
        <div className='flex text-white p-2'>
            <div className='w-[41px] h-[41px] bg-slate-300 rounded-full flex items-center justify-center'>
                <p>img</p>
            </div>
            <div className='mx-2'>
                <p>ИМЯ</p>
                <hr/>
                <p>ФАМИЛИЯ</p>
            </div>
        </div>
        <div className='px-2'>
            <ul>
                {
                    menuItem.map((item, index)=>(
                        <li key={index} className='text-white'>
                            <a href={item.link}>{item.name}</a> 
                        </li>
                    ))
                }
            </ul>
        </div>
      </div>
    </>
  )
}
