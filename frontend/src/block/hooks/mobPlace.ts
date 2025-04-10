import { useEffect } from 'react';
import axios from 'axios';
import { Mob } from './useMobLogic';

type Weapon = {
  id: number;
  name: string;
  damage: number;
  weight: number;
};

type Armor = {
  id: number;
  name: string;
  defense: number;
  weight: number;
};

type MobBlock = {
  id: number;
  name: string;
  speed: number;
  health: number;
  weapon: Weapon | null;
  armor: Armor | null;
  row: number;
  col: number;
};

interface UseMobPlaceProps {
  placingMob: boolean;
  setPlacingMob: (value: boolean) => void;
  selectedMob: Mob | null;
  rowIndex: number;
  colIndex: number;
  setSelectedMob: (value: Mob | null) => void;
  mobBlocks: MobBlock[];
  setMobBlocks: (mobBlocks: MobBlock[]) => void;
  nextId: number;
  setNextId: (id: number) => void;
}

export const useMobPlace = ({
  placingMob,
  setPlacingMob,
  selectedMob,
  setSelectedMob,
  mobBlocks,
  setMobBlocks,
  nextId,
  setNextId,
}: Omit<UseMobPlaceProps, 'rowIndex' | 'colIndex'>) => {  // ❌ Убрали rowIndex и colIndex из пропсов
  // Функция для размещения моба
  const placeMob = async (rowIndex: number, colIndex: number) => { // ✅ Принимаем rowIndex и colIndex тут
    if (placingMob && selectedMob) {
      console.log('Моб размещен');

      const newMob: MobBlock = {
        id: nextId,
        name: selectedMob.name,
        speed: selectedMob.speed,
        health: selectedMob.health,
        weapon: selectedMob.weapon,
        armor: selectedMob.armor,
        row: rowIndex, // ✅ Теперь переменные доступны
        col: colIndex,
      };

      try {
        // Отправляем запрос на сервер для сохранения моба
        await axios.post('http://localhost:3000/turn-list/create', {
          mobId: newMob.id,
          turnIndex: nextId,
          row: newMob.row,
          col: newMob.col,
          name: newMob.name,
          speed: newMob.speed,
          health: newMob.health,
          weapon: newMob.weapon,
          armor: newMob.armor,
        });

        console.log('Моб успешно отправлен на сервер:', newMob);
      } catch (error) {
        console.error('Ошибка при отправке данных моба:', error);
      }

      // Обновляем состояние с новым мобом
      setMobBlocks([...mobBlocks, newMob]);

      // Увеличиваем счетчик для следующего ID
      setNextId(nextId + 1);
      // Завершаем процесс размещения моба и сбрасываем выбранного моба
      setPlacingMob(false);
      setSelectedMob(null);
    }
  };
  return { placeMob };
};
