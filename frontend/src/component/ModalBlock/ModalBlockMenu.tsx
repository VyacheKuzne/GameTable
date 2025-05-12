import React from 'react'
import './ModalBlockMenu.css'
type props ={
    user: {
        name: string,
        secondname: string,
        nickname: string,
        email: string,
        phone: string
    }
}
export default function ModalBlockMenu({user}:props) {
const menuItem = [
    { name: 'Главная', link: '/' },
    { name: 'Профиль', link: '/profile' },
    { name: 'Тарифы', link: '/tarifs' },
    { name: 'Конструкторы', link: '/construcrts' },
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
                <p>{user.name}</p>
                <hr/>
                <p>{user.secondname}</p>
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
