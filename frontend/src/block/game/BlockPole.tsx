import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useMobLogic from '../hooks/useMobLogic';
import MobList from '../mob/MobList';
import GridCell from './GridCell';
import { MobBlock } from './types';
import TurnList from '../game/TurnList';
import ChatBlock from './ChatBlock';
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
    moveOrAttack,
    handleMobClick,
    placeMob, // Получаем placeMob из useMobLogic
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
                mobBlocks={mobBlocks.filter(
                  (mob) => mob.row === rowIndex && mob.col === colIndex
                ) as MobBlock[]} // Преобразуем mobBlocks в MobBlock[]
                placingMob={placingMob}
                moveOrAttack={moveOrAttack}
                handleMobClick={handleMobClick}
                selectedMobId={selectedMobId}
                placeMob={placeMob} // Передаем placeMob в GridCell
              />
            ))
          )}
        </div>

        {/* Display the TurnList */}
        <div>
          <TurnList turnOrders={turnOrders} /> {/* Pass the fetched turn orders */}
        </div>
        <div className='fixed right-0 bottom-0'>
          <ChatBlock/>
        </div>
      </div>
    </>
  );
}

export default BlockPole;
