import { useState } from 'react';
import axios from 'axios';
import { useMobPlace } from './mobPlace';  // Это для именованного экспорта
// Тип данных для представления оружия
type Weapon = {
  id: number;
  name: string;
  damage: number;  // Урон, который наносит оружие
  weight: number;  // Вес оружия
};

// Тип данных для представления брони
type Armor = {
  id: number;
  name: string;
  defense: number; // Защита, которую дает броня
  weight: number;   // Вес брони
};

// Тип данных для представления моба на поле, включая оружие и броню
type Mob = {
  id: number;      // Уникальный идентификатор моба
  name: string;    // Имя моба
  speed: number;   // Скорость моба (определяет радиус движения)
  health: number;  // Здоровье моба
  weapon: Weapon | null;   // Оружие моба (может быть null, если нет оружия)
  armor: Armor | null;     // Броня моба (может быть null, если нет брони)
  row: number;     // Строка (позиция по оси Y)
  col: number;     // Столбец (позиция по оси X)
};
// export interface Mob {
//   name: string;
//     speed: number;
//     health: number;
//     weapon: Weapon | null;
//     armor: Armor | null;
// }
const useMobLogic = () => {
//   // Размер сетки (грид) и клеток
//   const gridSize = 10; // Размер поля (например, 10x10)
//   const cellSize = 50; // Размер каждой клетки

//   // Состояние для хранения списка мобов на поле
//   const [mobBlocks, setMobs] = useState<Mob[]>([]);

//   // Состояние для генерации новых уникальных идентификаторов мобов
//   const [nextId, setNextId] = useState(1);

//   // Состояние для хранения информации о выбранном мобе (если таковой есть)
//   const [selectedMob, setSelectedMob] = useState<{
//     name: string;
//     speed: number;
//     health: number;
//     weapon: Weapon | null;
//     armor: Armor | null;
//   } | null>(null);

//   // Флаг, указывающий, что мы в процессе размещения моба
//   const [placingMob, setPlacingMob] = useState(false);

//   // Массив клеток, которые должны быть подсвечены (например, доступные для перемещения)
//   const [highlightedCells, setHighlightedCells] = useState<{ row: number; col: number }[]>([]);

//   // ID выбранного моба для выделения и перемещения
//   const [selectedMobId, setSelectedMobId] = useState<number | null>(null);

//   // Функция для обработки выбора моба в списке
//   const handleMobSelect = (mob: {
//     name: string;
//     speed: number;
//     health: number;
//     weapon: Weapon | null;
//     armor: Armor | null;
//   }) => {
//     setSelectedMob(mob); // Сохраняем выбранного моба по которому нажали в списке
//     setPlacingMob(true);  // Включаем режим размещения моба
//   };

//  // Функции из useMobPlace
//  const {
//   placeMob,
// } = useMobPlace({
//   placingMob,
//   setPlacingMob,
//   selectedMob,  // Это предполагается, что selectedMob передается в useMobPlace
//   setSelectedMob: setSelectedMob,  // Функция для установки selectedMob 
//   mobBlocks,
//   setMobs,
//   nextId,
//   setNextId,
// });

//   // Функция для обработки клика по мобу на поле
//   const handleMobClick = (mob: Mob) => {
//     // Если кликнутый моб уже выбран, снимаем выделение
//     if (selectedMobId === mob.id) {
//       setSelectedMobId(null);   // Снимаем выделение
//       setHighlightedCells([]);  // Убираем подсветку клеток
//     } else {
//       // Иначе, выделяем новый моб и вычисляем его доступные клетки для движения
//       setSelectedMobId(mob.id);
//       calculateHighlightedCells(mob);
//     }
//   };

//   // Функция для вычисления доступных клеток для движения моба
//   const calculateHighlightedCells = (mob: Mob) => {
//     const newHighlightedCells = [];

//     // Генерируем клетки в пределах радиуса скорости моба
//     for (let i = -mob.speed; i <= mob.speed; i++) {
//       for (let j = -mob.speed; j <= mob.speed; j++) {
//         const newRow = mob.row + i;
//         const newCol = mob.col + j;

//         // Проверяем, чтобы клетки находились в пределах границ поля
//         if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
//           newHighlightedCells.push({ row: newRow, col: newCol });
//         }
//       }
//     }

//     // Обновляем состояние подсвеченных клеток
//     setHighlightedCells(newHighlightedCells);
//   };

//   // Функция для перемещения моба или атаки
//   const moveOrAttack = (rowIndex: number, colIndex: number) => {
//     if (!selectedMobId) return;

//     const isValidMove = highlightedCells.some(
//       (cell) => cell.row === rowIndex && cell.col === colIndex
//     );

//     if (!isValidMove) return;

//     setMobs((prevMobs) => {
//       return prevMobs.reduce<Mob[]>((updatedMobs, mob) => {
//         if (mob.id === selectedMobId) {
//           // Проверяем, есть ли враг в целевой клетке
//           const targetMob = prevMobs.find(m => m.row === rowIndex && m.col === colIndex);

//           if (targetMob) {
//             // Выполняем атаку
//             const attackDamage = (mob.weapon ? mob.weapon.damage : 0) - (targetMob.armor ? targetMob.armor.defense : 0);
//             const newHealth = Math.max(0, targetMob.health - Math.max(0, attackDamage));

//             if (newHealth > 0) {
//               // Если моб выжил, обновляем его здоровье
//               updatedMobs.push({ ...targetMob, health: newHealth });
//             }
//             // Если здоровье 0, моб удаляется (не добавляется в updatedMobs)
//           } else {
//             // Если клетки свободны, просто двигаем моба
//             updatedMobs.push({ ...mob, row: rowIndex, col: colIndex });
//           }
//         } else {
//           // Оставляем всех остальных мобов без изменений
//           updatedMobs.push(mob);
//         }

//         return updatedMobs;
//       }, []);
//     });

//     setSelectedMobId(null);
//     setHighlightedCells([]);
//   };

//   // Функция для перемещения моба в новую клетку
//   const moveMob = (rowIndex: number, colIndex: number) => {
//     // Проверяем, что моб выбран и движение в указанную клетку возможно
//     if (!selectedMobId) return;

//     const isValidMove = highlightedCells.some(
//       (cell) => cell.row === rowIndex && cell.col === colIndex
//     );

//     // Если движение допустимо, обновляем позицию моба
//     if (isValidMove) {
//       setMobs((prevMobs) =>
//         prevMobs.map((mob) =>
//           mob.id === selectedMobId ? { ...mob, row: rowIndex, col: colIndex } : mob
//         )
//       );

//       // Снимаем выделение и очищаем подсветку
//       setSelectedMobId(null);
//       setHighlightedCells([]);
//     }
//   };

//   return {
//     gridSize,             // Размер поля
//     cellSize,             // Размер клетки
//     mobBlocks,            // Состояние с мобами на поле
//     placingMob,           // Состояние, показывающее, что мы в процессе размещения моба
//     highlightedCells,     // Состояние для подсвеченных клеток
//     selectedMobId,        // ID выбранного моба
//     handleMobSelect,      // Функция для выбора моба
//     moveMob,              // Функция для перемещения моба
//     handleMobClick,       // Функция для обработки кликов по мобам
//     moveOrAttack,         // Функция для перемещения или атаки моба
//     placeMob,
//   };
};

export default useMobLogic;


  // const placeMob = async (rowIndex: number, colIndex: number) => {
  //   if (placingMob && selectedMob) {
  //     console.log('моб размещен')
  //     // Создаем нового моба с текущими координатами и свойствами
  //     const newMob: Mob = {
  //       id: nextId,        // Используем текущий ID
  //       name: selectedMob.name,  // Имя выбранного моба
  //       speed: selectedMob.speed, // Скорость выбранного моба
  //       health: selectedMob.health,
  //       weapon: selectedMob.weapon, // Оружие выбранного моба
  //       armor: selectedMob.armor,   // Броня выбранного моба
  //       row: rowIndex,     // Строка, в которую мы размещаем моба
  //       col: colIndex,     // Столбец, в который мы размещаем моба
  //     };

  //     try {
  //       // Отправляем запрос на сервер для сохранения моба в базе
  //       await axios.post('http://localhost:3000/turn-list/create', {
  //         mobId: newMob.id,
  //         turnIndex: nextId,  // Можно использовать nextId как индекс хода
  //         row: newMob.row,
  //         col: newMob.col,
  //         name: newMob.name,
  //         speed: newMob.speed,
  //         health: newMob.health,
  //         weapon: newMob.weapon,
  //         armor: newMob.armor,
  //       });

  //       console.log('Моб успешно отправлен на сервер:', newMob);
  //     } catch (error) {
  //       console.error('Ошибка при отправке данных моба:', error);
  //     }

  //     // Обновляем состояние с новым мобом
  //     setMobs([...mobBlocks, newMob]);

  //     // Увеличиваем счетчик для следующего ID
  //     setNextId(nextId + 1);

  //     // Завершаем процесс размещения моба и сбрасываем выбранного моба
  //     setPlacingMob(false);
  //     setSelectedMob(null);
  //   }
  // };