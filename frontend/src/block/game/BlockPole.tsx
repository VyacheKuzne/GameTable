// BlockPole.tsx
import React from 'react';
import useMobLogic from '../hooks/useMobLogic';
import MobList from '../mob/MobList';
import GridCell from './GridCell';
import { MobBlock } from './types'; // Adjust path if types.ts is in a different directory

function BlockPole() {
  const {
    gridSize,
    cellSize,
    mobBlocks,
    placingMob,
    highlightedCells,
    selectedMobId,
    handleMobSelect,
    placeMob,
    moveMob,
    handleMobClick,
  } = useMobLogic();

  return (
    <>
      <MobList onMobSelect={handleMobSelect} />
      <div className="grid grid-cols-10 w-1/4">
        {Array.from({ length: gridSize }).map((_, rowIndex) =>
          Array.from({ length: gridSize }).map((_, colIndex) => (
            <GridCell
              key={`${rowIndex}-${colIndex}`}
              rowIndex={rowIndex}
              colIndex={colIndex}
              cellSize={cellSize}
              isHighlighted={highlightedCells.some(
                (cell) => cell.row === rowIndex && cell.col === colIndex
              )}
              mobBlocks={(mobBlocks as any).filter( // Type cast here
                (mob: any) => (mob as any).row === rowIndex && (mob as any).col === colIndex // More casts
              ) as MobBlock[]} // Cast result to MobBlock[]
              placingMob={placingMob}
              placeMob={placeMob}
              moveMob={moveMob}
              handleMobClick={handleMobClick}
              selectedMobId={selectedMobId}
            />
          ))
        )}
      </div>
    </>
  );
}

export default BlockPole;