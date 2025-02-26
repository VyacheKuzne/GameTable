// GridCell.tsx
import React from 'react';
import MobCell from './MobCell';
import { MobBlock } from './types'; // Import MobBlock

interface GridCellProps {
  rowIndex: number;
  colIndex: number;
  cellSize: number;
  isHighlighted: boolean;
  mobBlocks: MobBlock[]; // Use MobBlock[] here
  placingMob: boolean;
  placeMob: (row: number, col: number) => void;
  moveMob: (row: number, col: number) => void;
  handleMobClick: (mob: MobBlock) => void; // Use MobBlock here
  selectedMobId: number | null;
}

const GridCell: React.FC<GridCellProps> = ({
  rowIndex,
  colIndex,
  cellSize,
  isHighlighted,
  mobBlocks,
  placingMob,
  placeMob,
  moveMob,
  handleMobClick,
  selectedMobId,
}) => {
  return (
    <div
      style={{
        width: `${cellSize}px`,
        height: `${cellSize}px`,
        backgroundColor: isHighlighted ? 'yellow' : 'gray',
        border: '1px solid black',
        cursor: isHighlighted ? 'pointer' : 'default',
        position: 'relative',
      }}
      onClick={() => {
        if (placingMob) {
          placeMob(rowIndex, colIndex);
        } else {
          moveMob(rowIndex, colIndex);
        }
      }}
    >
      {mobBlocks.map((mob) => (
        <MobCell
          key={mob.id}
          mob={mob} // Передаем весь объект
          handleMobClick={handleMobClick}
          isSelected={selectedMobId === mob.id}
          cellSize={cellSize}
        />
      ))}
    </div>
  );
};

export default GridCell;