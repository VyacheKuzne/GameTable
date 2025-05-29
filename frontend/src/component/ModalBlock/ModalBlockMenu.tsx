import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ModalBlockMenu.css';
import Profile from '../../img/profile.svg'

type Props = {
    user: {
        name: string,
        secondname: string,
        nickname: string,
        avatar: string,
        email: string,
        phone: string
    }
}

export default function ModalBlockMenu({ user }: Props) {
    const navigate = useNavigate();

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();

        try {
            // Запрос на сервер для выхода
            await axios.get('http://localhost:3000/auth/logout', {
                withCredentials: true
            });

            // Удаляем access_token вручную, если httpOnly: false
            document.cookie = 'access_token=; Max-Age=0; path=/';

            // Перенаправляем пользователя
            window.location.href = '/aftorization';
        } catch (error) {
            console.error('Ошибка при выходе:', error);
            document.cookie = 'access_token=; Max-Age=0; path=/';
            window.location.href = '/aftorization';
        }
    };

    const menuItems = [
        { name: 'Главная', link: '/' },
        { name: 'Профиль', link: '/profile' },
        { name: 'Тарифы', link: '/tarifs' },
        { name: 'Конструкторы', link: '/construcrts' },
        { name: 'Выход', link: '#' }, // Ссылка-заглушка
    ];

    return (
        <div>
            <div className='flex text-white p-2'>
                <div className='w-[41px] h-[41px] bg-slate-300 rounded-full flex items-center justify-center'>
                {
                  user.avatar ? (<img className="rounded-full h-full w-full" src={`http://localhost:3000${user.avatar}`} alt="avatar" />)
                  :
                  (<img className="rounded-full h-full w-full" src={Profile} alt="avatar" />)
                  }
                </div>
                <div className='mx-2'>
                    <p>{user.name}</p>
                    <hr />
                    <p>{user.secondname}</p>
                </div>
            </div>
            <div className='px-2'>
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index} className='text-white'>
                            {item.name === 'Выход' ? (
                                <a href={item.link} onClick={handleLogout} className="cursor-pointer">
                                    {item.name}
                                </a>
                            ) : (
                                <a href={item.link}>{item.name}</a>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
