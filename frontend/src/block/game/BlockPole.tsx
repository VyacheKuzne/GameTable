import React, { useState, useEffect, useRef } from 'react';
import './BlockPole.css';
import MobList from '../mob/MobList';

type MobBlock = {
  id: number;
  x: number;
  y: number;
};

function BlockPole() {
  const rows = Array(10).fill(null);
  const cols = Array(10).fill(null);

  const [ModalVisible, setModalVisible] = useState(false);
  const [MobVisible, setMobVisible] = useState(false);
  const [Position, setPosition] = useState({ x: 0, y: 0 });
  const [MobBlocks, setMobBlocks] = useState<MobBlock[]>([]);
  const [NextId, setNextId] = useState(0);
  const [selectedMobId, setSelectedMobId] = useState<number | null>(null);
  const [highlightedCells, setHighlightedCells] = useState<Array<{ row: number, col: number }>>([]);

  const gridRef = useRef<HTMLDivElement>(null);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const viewMob = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setMobVisible(true);
    setModalVisible(false);
  };

  const hiddenMob = () => setMobVisible(false);

  const placeMob = (rowIndex: number, colIndex: number) => {
    if (MobVisible && gridRef.current) {
      const gridRect = gridRef.current.getBoundingClientRect();
      const x = colIndex * 50;
      const y = rowIndex * 50;

      const newMobBlock: MobBlock = {
        id: NextId,
        x: gridRect.left + x,
        y: gridRect.top + y,
      };

      // Добавляем новый блок в список
      setMobBlocks([...MobBlocks, newMobBlock]);

      // Устанавливаем новый блок как выбранный
      setSelectedMobId(newMobBlock.id);

      // Подсвечиваем клетки вокруг нового блока
      calculateHighlightedCells(newMobBlock);

      // Увеличиваем идентификатор для следующего блока
      setNextId(NextId + 1);

      // Скрываем блок, который "держали"
      setMobVisible(false);
    }
  };

  const handleMobClick = (mob: MobBlock) => {
    if (selectedMobId === mob.id) {
      setSelectedMobId(null);
      setHighlightedCells([]);
    } else {
      setSelectedMobId(mob.id);
      calculateHighlightedCells(mob);
    }
  };

  const calculateHighlightedCells = (mob: MobBlock) => {
    if (gridRef.current) {
      const gridRect = gridRef.current.getBoundingClientRect();
      const colIndex = Math.floor((mob.x - gridRect.left) / 50);
      const rowIndex = Math.floor((mob.y - gridRect.top) / 50);

      const newHighlightedCells = [];
      for (let i = rowIndex - 2; i <= rowIndex + 2; i++) {
        for (let j = colIndex - 2; j <= colIndex + 2; j++) {
          if (i >= 0 && i < 10 && j >= 0 && j < 10) {
            newHighlightedCells.push({ row: i, col: j });
          }
        }
      }
      setHighlightedCells(newHighlightedCells);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (MobVisible) {
        setPosition({ x: e.clientX, y: e.clientY });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [MobVisible]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (gridRef.current && !gridRef.current.contains(e.target as Node)) {
        setSelectedMobId(null);
        setHighlightedCells([]);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
    <MobList/>
      <div
        ref={gridRef}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 50px)' }}
      >
        {rows.map((_, rowIndex) =>
          cols.map((_, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                width: '50px',
                height: '50px',
                backgroundColor: highlightedCells.some(
                  (cell) => cell.row === rowIndex && cell.col === colIndex
                ) ? 'yellow' : 'rgba(49, 49, 49, 1)',
                border: '1px solid rgba(29, 29, 29, 1)',
              }}
              onClick={() => placeMob(rowIndex, colIndex)}
            ></div>
          ))
        )}
      </div>
      <button
        className='bg-custom-red p-[0.3%] text-white w-[15%] rounded-md'
        onClick={openModal}
      >
        <p>добавить нового МОБа</p>
      </button>
      {ModalVisible && (
        <div className='modlaOverlay'>
          <div className='modalBlock'>
            <button
              onClick={closeModal}
              className='bg-custom-red p-[0.3%] text-white w-[15%] rounded-md'
            >
              <p>x</p>
            </button>
            <button
              onClick={viewMob}
              className='bg-custom-red p-[0.3%] text-white w-[15%] rounded-md'
            >
              <p>добавить из шаблона</p>
            </button>
          </div>
        </div>
      )}
      {MobVisible && (
        <div
          style={{
            position: 'absolute',
            left: Position.x,
            top: Position.y,
            width: '50px',
            height: '50px',
            backgroundColor: 'rgba(49, 49, 49, 1)',
            border: '1px solid rgba(29, 29, 29, 1)',
            color: 'white',
            pointerEvents: 'none',
          }}
        >
          MOB
        </div>
      )}
      {MobBlocks.map((mob) => (
        <div
          key={mob.id}
          style={{
            position: 'absolute',
            left: mob.x,
            top: mob.y,
            width: '50px',
            height: '50px',
            backgroundColor: 'rgba(49, 49, 49, 1)',
            border: '1px solid rgba(29, 29, 29, 1)',
            color: 'white',
            pointerEvents: 'auto',
            cursor: 'pointer',
          }}
          onClick={() => handleMobClick(mob)}
        >
          MOB
        </div>
      ))}
    </>
  );
}

export default BlockPole;