import React, { useState } from 'react';
import { MobBlock, MobCellProps } from './types'; // Импортируем типы для MobBlock и MobCellProps

// Компонент MobCell отображает информацию о мобе в клетке
const MobCell: React.FC<MobCellProps> = ({ mob, handleMobClick, isSelected, cellSize }) => {
  const [isHovered, setIsHovered] = useState(false); // Состояние для отслеживания, наведена ли мышь

  return (
    <div
      style={{
        position: 'absolute',           // Абсолютное позиционирование для размещения в клетке
        left: '0',                      // Сдвигаем по оси X
        top: '0',                       // Сдвигаем по оси Y
        width: `${cellSize}px`,         // Устанавливаем ширину клетки
        height: `${cellSize}px`,        // Устанавливаем высоту клетки
        backgroundColor: 'black',       // Цвет фона клетки
        color: 'white',                 // Цвет текста
        display: 'flex',                // Для выравнивания содержимого по центру
        alignItems: 'center',           // Выравнивание по вертикали
        justifyContent: 'center',       // Выравнивание по горизонтали
        cursor: 'pointer',              // Указатель мыши меняется на pointer при наведении
        border: isSelected ? '2px solid red' : 'none', // Если моб выбран, добавляем красную рамку
        transition: 'all 0.3s ease',    // Плавное изменение свойств
        boxShadow: isHovered ? '0px 0px 10px rgba(0, 0, 0, 0.5)' : 'none', // Тень при наведении
      }}
      onClick={(e) => {
        e.stopPropagation(); // Предотвращаем дальнейшее распространение события
        handleMobClick(mob);  // Обрабатываем клик по мобу
      }}
      onMouseEnter={() => setIsHovered(true)} // Устанавливаем isHovered в true при наведении
      onMouseLeave={() => setIsHovered(false)} // Устанавливаем isHovered в false при уходе мыши
    >
      {mob.name} {/* Отображаем имя моба */}

      {/* Если мышь наведена на клетку, показываем информацию о мобе */}
      {isHovered && (
        <div
          style={{
            width: '100px',                           // Ширина блока с информацией
            position: 'absolute',                    // Абсолютное позиционирование
            top: `${cellSize}px`,                    // Размещение блока непосредственно под клеткой
            backgroundColor: 'rgba(0, 0, 0, 0.7)',   // Темный фон с прозрачностью
            color: 'white',                          // Белый текст
            padding: '5px',                          // Отступы внутри блока
            fontSize: '12px',                        // Размер шрифта
            borderRadius: '5px',                     // Закругленные углы
            display: 'flex',                         // Используем flex для выравнивания по вертикали
            flexDirection: 'column',                 // Режим вертикальной раскладки
            alignItems: 'flex-start',                // Выравнивание элементов по левому краю
            zIndex: 10,                              // Устанавливаем высокий z-index для того, чтобы блок был поверх остальных
          }}
        >
          {/* Отображаем характеристики моба */}
          <div>Health: {mob.health}</div>
          <div>Attack: {mob.attack}</div>
          <div>Defense: {mob.defense}</div>
          <div>Speed: {mob.speed}</div>

          {/* Отображаем информацию об оружии, если оно есть */}
          {mob.weapon ? (
            <div>
              Weapon: {mob.weapon.name} {/* Отображаем имя оружия */}
              <div>Damage: {mob.weapon.damage}</div> {/* Отображаем урон оружия */}
              <div>Weight: {mob.weapon.weight}</div> {/* Отображаем вес оружия */}
            </div>
          ) : (
            // {/* Если оружие отсутствует */}
            <div>No Weapon</div>  
          )}

          {/* Отображаем информацию о броне, если она есть */}
          {mob.armor ? (
            <div>
              Armor: {mob.armor.name} {/* Отображаем имя брони */}
              <div>Defense: {mob.armor.defense}</div> {/* Отображаем защиту брони */}
              <div>Weight: {mob.armor.weight}</div> {/* Отображаем вес брони */}
            </div>
          ) : (
            // {/* Если брони нет */}
            <div>No Armor</div>  
          )}
        </div>
      )}
    </div>
  );
};

export default MobCell;
