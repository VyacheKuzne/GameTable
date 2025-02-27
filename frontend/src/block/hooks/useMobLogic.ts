import { useState } from 'react';

// Тип данных для представления оружия
type Weapon = {
  id: number;
  name: string;
  damage: number;
  weight: number;
};

// Тип данных для представления брони
type Armor = {
  id: number;
  name: string;
  defense: number;
  weight: number;
};

// Тип данных для представления моба на поле, включая оружие и броню
type MobBlock = {
  id: number;      // Уникальный идентификатор моба
  name: string;    // Имя моба
  speed: number;   // Скорость моба (определяет радиус движения)
  health: number;
  weapon: Weapon | null;   // Оружие моба
  armor: Armor | null;     // Броня моба
  row: number;     // Строка (позиция по оси Y)
  col: number;     // Столбец (позиция по оси X)
};

const useMobLogic = () => {
  // Размер сетки (грид) и клеток
  const gridSize = 10; // Размер поля (например, 10x10)
  const cellSize = 50; // Размер каждой клетки

  // Состояние для хранения списка мобов на поле
  const [mobBlocks, setMobBlocks] = useState<MobBlock[]>([]);

  // Состояние для генерации новых уникальных идентификаторов мобов
  const [nextId, setNextId] = useState(0);

  // Состояние для хранения информации о выбранном мобе (если таковой есть)
  const [selectedMob, setSelectedMob] = useState<{
    name: string;
    speed: number;
    health: number;
    weapon: Weapon | null;
    armor: Armor | null;
  } | null>(null);

  // Флаг, указывающий, что мы в процессе размещения моба
  const [placingMob, setPlacingMob] = useState(false);

  // Массив клеток, которые должны быть подсвечены (например, доступные для перемещения)
  const [highlightedCells, setHighlightedCells] = useState<{ row: number; col: number }[]>([]);

  // ID выбранного моба для выделения и перемещения
  const [selectedMobId, setSelectedMobId] = useState<number | null>(null);

  // Функция для обработки выбора моба в списке
  const handleMobSelect = (mob: {
    name: string;
    speed: number;
    health: number;
    weapon: Weapon | null;
    armor: Armor | null;
  }) => {
    setSelectedMob(mob); // Сохраняем выбранного моба
    setPlacingMob(true);  // Включаем режим размещения моба
  };

  // Функция для размещения моба на поле в выбранной клетке
  const placeMob = (rowIndex: number, colIndex: number) => {
    if (placingMob && selectedMob) {
      // Создаем нового моба с текущими координатами и свойствами
      const newMob: MobBlock = {
        id: nextId,        // Используем текущий ID
        name: selectedMob.name,  // Имя выбранного моба
        speed: selectedMob.speed, // Скорость выбранного моба
        health: selectedMob.health,
        weapon: selectedMob.weapon, // Оружие выбранного моба
        armor: selectedMob.armor,   // Броня выбранного моба
        row: rowIndex,     // Строка, в которую мы размещаем моба
        col: colIndex,     // Столбец, в который мы размещаем моба
      };

      // Обновляем состояние с новым мобом
      setMobBlocks([...mobBlocks, newMob]);

      // Увеличиваем счетчик для следующего ID
      setNextId(nextId + 1);

      // Завершаем процесс размещения моба и сбрасываем выбранного моба
      setPlacingMob(false);
      setSelectedMob(null);
    }
  };

  // Функция для обработки клика по мобу на поле
  const handleMobClick = (mob: MobBlock) => {
    // Если кликнутый моб уже выбран, снимаем выделение
    if (selectedMobId === mob.id) {
      setSelectedMobId(null);   // Снимаем выделение
      setHighlightedCells([]);  // Убираем подсветку клеток
    } else {
      // Иначе, выделяем новый моб и вычисляем его доступные клетки для движения
      setSelectedMobId(mob.id);
      calculateHighlightedCells(mob);
    }
  };

  // Функция для вычисления доступных клеток для движения моба
  const calculateHighlightedCells = (mob: MobBlock) => {
    const newHighlightedCells = [];

    // Генерируем клетки в пределах радиуса скорости моба
    for (let i = -mob.speed; i <= mob.speed; i++) {
      for (let j = -mob.speed; j <= mob.speed; j++) {
        const newRow = mob.row + i;
        const newCol = mob.col + j;

        // Проверяем, чтобы клетки находились в пределах границ поля
        if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
          newHighlightedCells.push({ row: newRow, col: newCol });
        }
      }
    }

    // Обновляем состояние подсвеченных клеток
    setHighlightedCells(newHighlightedCells);
  };

  // Функция для перемещения моба в новую клетку
  const moveMob = (rowIndex: number, colIndex: number) => {
    // Проверяем, что моб выбран и движение в указанную клетку возможно
    if (!selectedMobId) return;

    const isValidMove = highlightedCells.some(
      (cell) => cell.row === rowIndex && cell.col === colIndex
    );

    // Если движение допустимо, обновляем позицию моба
    if (isValidMove) {
      setMobBlocks((prevMobs) =>
        prevMobs.map((mob) =>
          mob.id === selectedMobId ? { ...mob, row: rowIndex, col: colIndex } : mob
        )
      );

      // Снимаем выделение и очищаем подсветку
      setSelectedMobId(null);
      setHighlightedCells([]);
    }
  };

  return {
    gridSize,             // Размер поля
    cellSize,             // Размер клетки
    mobBlocks,            // Состояние с мобами на поле
    placingMob,           // Состояние, показывающее, что мы в процессе размещения моба
    highlightedCells,     // Состояние для подсвеченных клеток
    selectedMobId,        // ID выбранного моба
    handleMobSelect,      // Функция для выбора моба
    placeMob,             // Функция для размещения моба на поле
    moveMob,              // Функция для перемещения моба
    handleMobClick,       // Функция для обработки кликов по мобам
  };
};

export default useMobLogic;
