// useMobLogic.ts
import { useState } from 'react';

type MobBlock = {
  id: number;
  name: string;
  speed: number;
  row: number;
  col: number;
};

const useMobLogic = () => {
  const gridSize = 10;
  const cellSize = 50;
  const [mobBlocks, setMobBlocks] = useState<MobBlock[]>([]);
  const [nextId, setNextId] = useState(0);
  const [selectedMob, setSelectedMob] = useState<{ name: string; speed: number } | null>(null);
  const [placingMob, setPlacingMob] = useState(false);
  const [highlightedCells, setHighlightedCells] = useState<{ row: number; col: number }[]>([]);
  const [selectedMobId, setSelectedMobId] = useState<number | null>(null);

  const handleMobSelect = (mob: { name: string; speed: number }) => {
    setSelectedMob(mob);
    setPlacingMob(true);
  };

  const placeMob = (rowIndex: number, colIndex: number) => {
    if (placingMob && selectedMob) {
      const newMob: MobBlock = {
        id: nextId,
        name: selectedMob.name,
        speed: selectedMob.speed,
        row: rowIndex,
        col: colIndex,
      };
      setMobBlocks([...mobBlocks, newMob]);
      setNextId(nextId + 1);
      setPlacingMob(false);
      setSelectedMob(null);
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
    const newHighlightedCells = [];
    for (let i = -mob.speed; i <= mob.speed; i++) {
      for (let j = -mob.speed; j <= mob.speed; j++) {
        const newRow = mob.row + i;
        const newCol = mob.col + j;
        if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
          newHighlightedCells.push({ row: newRow, col: newCol });
        }
      }
    }
    setHighlightedCells(newHighlightedCells);
  };

  const moveMob = (rowIndex: number, colIndex: number) => {
    if (!selectedMobId) return;
    const isValidMove = highlightedCells.some(
      (cell) => cell.row === rowIndex && cell.col === colIndex
    );
    if (isValidMove) {
      setMobBlocks((prevMobs) =>
        prevMobs.map((mob) =>
          mob.id === selectedMobId ? { ...mob, row: rowIndex, col: colIndex } : mob
        )
      );
      setSelectedMobId(null);
      setHighlightedCells([]);
    }
  };

  return {
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
  };
};

export default useMobLogic;
