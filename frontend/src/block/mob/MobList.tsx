import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface MobListProps {
  onMobSelect: (mob: { id: number; name: string; speed: number }) => void;
}

export default function MobList({ onMobSelect }: MobListProps) {
  const [mobs, setMobs] = useState<any[]>([]);

  useEffect(() => {
    const fetchMobs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/moblist/Mob');
        setMobs(response.data);
      } catch (error) {
        console.error('Ошибка при получении списка мобов:', error);
      }
    };

    fetchMobs();
  }, []);

  return (
    <div>
      <h1 className="font-bold">Список мобов</h1>
      {mobs.length > 0 ? (
        <div className="flex flex-col w-[10%]">
          {mobs.map((mob) => (
            <button
              key={mob.id}
              className="border-2 border-pink-800 hover:text-white hover:bg-pink-500 m-2 p-2"
              onClick={() => onMobSelect({ id: mob.id, name: mob.name, speed: mob.speed })} 
            >
              {mob.name}
            </button>
          ))}
        </div>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
}
