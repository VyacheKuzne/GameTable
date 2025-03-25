import React from 'react'
import './ModalBlockMenu.css'
export default function ModalBlockMenu() {
const menuItem = [
    { name: 'Профиль', link: '#' },
    { name: 'Тарифы', link: '#' },
    { name: 'Выход', link: '#' },
]
  return (
    <>
      <div>
        <div className='flex text-white'>
            <div className='w-[41px] h-[41px] bg-slate-300 rounded-full flex items-center justify-center'>
                <p>img</p>
            </div>
            <div>
                <p>Имя</p>
                <hr/>
                <p>Фамилия</p>
            </div>
        </div>
        <div>
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
