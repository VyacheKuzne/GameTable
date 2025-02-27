import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Определяем типы для оружия и брони, чтобы корректно работать с данными.
interface Weapon {
  id: number;
  name: string;
  damage: number;
  weight: number;
}

interface Armor {
  id: number;
  name: string;
  defense: number;
  weight: number;
}

// Обновленный интерфейс для моба, с оружием и броней.
// Добавлены поля weapon и armor, которые могут быть null (если моб не имеет оружия или брони).
interface Mob {
  id: number;
  name: string;
  speed: number;
  health: number;
  weapon: Weapon | null;  // Оружие может быть null, если у моба нет оружия.
  armor: Armor | null;    // Броня может быть null, если у моба нет брони.
}

interface MobListProps {
  onMobSelect: (mob: Mob) => void;  // Функция для обработки выбора моба.
}

export default function MobList({ onMobSelect }: MobListProps) {
  // Хук состояния для хранения списка мобов.
  const [mobs, setMobs] = useState<Mob[]>([]);

  // useEffect для загрузки данных о мобах при монтировании компонента.
  useEffect(() => {
    // Функция для асинхронного получения данных о мобах.
    const fetchMobs = async () => {
      try {
        // Отправляем GET-запрос на сервер для получения списка мобов.
        const response = await axios.get('http://localhost:3000/moblist/Mob');
        
        // Обновляем состояние с полученными данными.
        setMobs(response.data);
      } catch (error) {
        // Логируем ошибку, если запрос не удался.
        console.error('Ошибка при получении списка мобов:', error);
      }
    };

    // Вызываем функцию для получения мобов при монтировании компонента.
    fetchMobs();
  }, []);  // Пустой массив зависимостей гарантирует, что useEffect выполнится только один раз.

  return (
    <div>
      <h1 className="font-bold">Список мобов</h1>
      {mobs.length > 0 ? (
        // Если мобов загрузилось больше 0, отображаем список мобов.
        <div className="flex flex-col w-[10%]">
          {mobs.map((mob) => (
            // Для каждого моба создаем кнопку с выводом данных.
            <button
              key={mob.id}  // Используем id моба как ключ для оптимизации рендеринга.
              className="border-2 border-pink-800 hover:text-white hover:bg-pink-500 m-2 p-2"
              onClick={() => onMobSelect({
                id: mob.id,          // Передаем id моба
                name: mob.name,      // Передаем имя моба
                speed: mob.speed,    // Передаем скорость моба
                health: mob.health,  // Передаем здоровье моба
                weapon: mob.weapon,  // Передаем объект оружия (или null)
                armor: mob.armor,    // Передаем объект брони (или null)
              })}
            >
              {mob.name}  {/* Отображаем имя моба на кнопке */}
              
              {/* Добавляем информацию о здоровье и скорости */}
              <div>Здоровье: {mob.health}</div>
              <div>Скорость: {mob.speed}</div>

              {/* Если у моба есть оружие, показываем его информацию */}
              {mob.weapon ? (
                <div>
                  <strong>Оружие:</strong> {mob.weapon.name} (Урон: {mob.weapon.damage}, Вес: {mob.weapon.weight})
                </div>
              ) : (
                <div>Без оружия</div>
              )}

              {/* Если у моба есть броня, показываем информацию о броне */}
              {mob.armor ? (
                <div>
                  <strong>Броня:</strong> {mob.armor.name} (Защита: {mob.armor.defense}, Вес: {mob.armor.weight})
                </div>
              ) : (
                <div>Без брони</div>
              )}
            </button>
          ))}
        </div>
      ) : (
        // Если данных о мобах еще нет (мобы загружаются), показываем сообщение о загрузке.
        <p>Загрузка...</p>
      )}
    </div>
  );
}
