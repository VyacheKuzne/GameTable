import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IMob from './interface/mobsInterface'; // Убедитесь, что путь к интерфейсу правильный

export default function MobList() {
  const [mobs, setMobs] = useState<IMob[]>([]); // Инициализируем mobs как массив IMob

  useEffect(() => {
    const fetchMobs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/moblist/Mob'); //  Замените '/moblist/Mob' на актуальный URL вашего API

        setMobs(response.data);
      } catch (error) {
        console.error('Ошибка при получении списка мобов:', error);
      }
    };

    fetchMobs();
  }, []); //  [] означает, что эффект выполняется только один раз при монтировании компонента

  return (
    <div>
      <h1 className='font-bold'>Список мобов</h1>
      {mobs.length > 0 ? (
        <ul>
          {mobs.map((mob) => (
            <li key={mob.id}> {/* Предполагается, что у вас есть поле 'id' у моба */}
              {mob.name} {/* Замените 'name' на поле, которое хотите отображать */}
            </li>
          ))}
        </ul>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
}