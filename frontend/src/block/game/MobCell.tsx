import React from 'react';
import { MobBlock } from './types'; // Adjust path if types.ts is in a different directory

interface MobCellProps {
  mob: MobBlock;
  handleMobClick: (mob: MobBlock) => void;
  isSelected: boolean;
  cellSize: number;
}

const MobCell: React.FC<MobCellProps> = ({ mob, handleMobClick, isSelected, cellSize }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: '0',
        top: '0',
        width: `${cellSize}px`,
        height: `${cellSize}px`,
        backgroundColor: 'black',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        border: isSelected ? '2px solid red' : 'none',
      }}
      onClick={(e) => {
        e.stopPropagation();
        handleMobClick(mob);
      }}
    >
      {mob.name}
    </div>
  );
};

export default MobCell;