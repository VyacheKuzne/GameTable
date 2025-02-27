// BlockPole.tsx
import React from 'react';
// Импорт кастомного хука для логики работы с мобами
import useMobLogic from '../hooks/useMobLogic';
// Импорт компонента для отображения списка мобов
import MobList from '../mob/MobList';
// Импорт компонента для клетки грида
import GridCell from './GridCell';
// Импорт типа данных для моба
import { MobBlock } from './types'; // Обратите внимание на корректный путь к types.ts

function BlockPole() {
  // Деструктуризация данных из кастомного хука useMobLogic
  const {
    gridSize,         // Размер сетки (ширина и высота грида)
    cellSize,         // Размер каждой клетки
    mobBlocks,        // Список мобов на поле
    placingMob,       // Моб, который сейчас размещается
    highlightedCells, // Ячейки, которые должны быть подсвечены
    selectedMobId,    // ID выбранного моба
    handleMobSelect,  // Функция для выбора моба
    placeMob,         // Функция для размещения моба
    moveMob,          // Функция для перемещения моба
    handleMobClick,   // Функция для обработки клика по мобу
  } = useMobLogic();

  return (
    <>
      {/* Отображаем компонент списка мобов, передавая функцию для выбора моба */}
      <MobList onMobSelect={handleMobSelect} />

      {/* 
        Отображаем сетку. 
        Каждая строка состоит из `gridSize` количества клеток.
        Используем метод Array.from() для генерации строк и столбцов.
      */}
      <div className="grid grid-cols-10 w-1/4">
        {Array.from({ length: gridSize }).map((_, rowIndex) =>
          Array.from({ length: gridSize }).map((_, colIndex) => (
            <GridCell
              key={`${rowIndex}-${colIndex}`} // Уникальный ключ для каждой клетки
              rowIndex={rowIndex}  // Индекс строки (по оси Y)
              colIndex={colIndex}  // Индекс столбца (по оси X)
              cellSize={cellSize}  // Размер клетки (передается из состояния)
              
              // {/* Проверяем, является ли текущая клетка подсвеченной */}
              isHighlighted={highlightedCells.some(
                (cell) => cell.row === rowIndex && cell.col === colIndex
              )}
              
              // {/* Фильтруем список мобов по текущей клетке (rowIndex и colIndex) */}
              mobBlocks={(mobBlocks as any).filter( // Преобразуем тип, чтобы избежать ошибки типов
                (mob: any) => (mob as any).row === rowIndex && (mob as any).col === colIndex // Фильтруем мобов по строке и столбцу
              ) as MobBlock[]} // Преобразуем результат обратно в массив MobBlock[]

              placingMob={placingMob}         // Моб, который сейчас размещается
              placeMob={placeMob}             // Функция для размещения моба
              moveMob={moveMob}               // Функция для перемещения моба
              handleMobClick={handleMobClick} // Функция для обработки кликов по мобам
              selectedMobId={selectedMobId}   // ID выбранного моба
            />
          ))
        )}
      </div>
    </>
  );
}

export default BlockPole;
