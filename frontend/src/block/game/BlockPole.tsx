import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useMobLogic from '../hooks/useMobLogic';
import MobList from '../mob/MobList';
import GridCell from './GridCell';
import { MobBlock } from './types';
import TurnList from '../game/TurnList';

function BlockPole() {
  // State to store fetched turn orders
  const [turnOrders, setTurnOrders] = useState<any[]>([]);

  // Fetch turn orders when the component mounts
  useEffect(() => {
    const fetchTurnOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/turn-list'); // API request to port 3000
        setTurnOrders(response.data);
      } catch (error) {
        console.error('Error fetching turn orders:', error);
      }
    };

    fetchTurnOrders();
  }, []); // Empty dependency array ensures this runs once on component mount

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
      {/* Display the list of mobs */}
      <MobList onMobSelect={handleMobSelect} />

      {/* Display the grid */}
      <div className="flex">
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
                mobBlocks={(mobBlocks as any).filter(
                  (mob: any) =>
                    (mob as any).row === rowIndex && (mob as any).col === colIndex
                ) as MobBlock[]}
                placingMob={placingMob}
                placeMob={placeMob}
                moveMob={moveMob}
                handleMobClick={handleMobClick}
                selectedMobId={selectedMobId}
              />
            ))
          )}
        </div>

        {/* Display the TurnList */}
        <div>
          <TurnList turnOrders={turnOrders} /> {/* Pass the fetched turn orders */}
        </div>
      </div>
    </>
  );
}

export default BlockPole;
