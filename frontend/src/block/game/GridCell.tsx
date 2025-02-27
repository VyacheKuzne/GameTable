// GridCell.tsx
import React from 'react';
import MobCell from './MobCell';  // Импорт компонента для отображения мобов в клетке
import { MobBlock } from './types'; // Импорт типа данных MobBlock

// Интерфейс пропсов компонента GridCell
interface GridCellProps {
  rowIndex: number;              // Индекс строки (по оси Y) для текущей клетки
  colIndex: number;              // Индекс столбца (по оси X) для текущей клетки
  cellSize: number;              // Размер клетки
  isHighlighted: boolean;        // Флаг, который определяет, подсвечена ли клетка
  mobBlocks: MobBlock[];         // Список мобов, находящихся в данной клетке
  placingMob: boolean;           // Флаг, указывающий, что мы находимся в режиме размещения моба
  placeMob: (row: number, col: number) => void; // Функция для размещения моба
  moveMob: (row: number, col: number) => void;  // Функция для перемещения моба
  handleMobClick: (mob: MobBlock) => void;      // Функция для обработки кликов по мобам
  selectedMobId: number | null;  // ID выбранного моба для выделения
}

const GridCell: React.FC<GridCellProps> = ({
  rowIndex,                // Индекс строки текущей клетки
  colIndex,                // Индекс столбца текущей клетки
  cellSize,                // Размер клетки
  isHighlighted,           // Подсвечена ли клетка
  mobBlocks,               // Мобы, находящиеся в текущей клетке
  placingMob,              // Флаг, указывающий на режим размещения
  placeMob,                // Функция для размещения моба
  moveMob,                 // Функция для перемещения моба
  handleMobClick,          // Функция для обработки кликов по мобам
  selectedMobId,           // ID выбранного моба
}) => {
  return (
    <div
      style={{
        width: `${cellSize}px`, // Устанавливаем ширину клетки
        height: `${cellSize}px`, // Устанавливаем высоту клетки
        backgroundColor: isHighlighted ? 'yellow' : 'gray', // Подсвечиваем клетку, если она выделена
        border: '1px solid black', // Добавляем границу для клетки
        cursor: isHighlighted ? 'pointer' : 'default', // Меняем курсор на "pointer", если клетка подсвечена
        position: 'relative', // Чтобы вложенные элементы (мобы) могли позиционироваться относительно этой клетки
      }}
      onClick={() => {
        // Обрабатываем клик по клетке
        if (placingMob) {
          // Если мы в режиме размещения моба, то вызываем функцию для его размещения
          placeMob(rowIndex, colIndex);
        } else {
          // Если не в режиме размещения, то вызываем функцию для перемещения моба
          moveMob(rowIndex, colIndex);
        }
      }}
    >
      {/* Для каждого моба в текущей клетке рендерим компонент MobCell */}
      {mobBlocks.map((mob) => (
        <MobCell
          key={mob.id} // Уникальный ключ для каждого моба
          mob={mob} // Передаем объект моба в MobCell
          handleMobClick={handleMobClick} // Функция обработки кликов по мобу
          isSelected={selectedMobId === mob.id} // Проверка, выбран ли этот моб
          cellSize={cellSize} // Передаем размер клетки для MobCell
        />
      ))}
    </div>
  );
};

export default GridCell;
