import React, { useCallback } from 'react';

const Grid = ({ grid, onCellClick, cellSize = 15 }) => {
  const renderCell = useCallback((value, rowIndex, colIndex) => {
    const isAlive = value === 1;
    return (
      <div
        key={`cell-${rowIndex}-${colIndex}`}
        className={`border border-gray-300 transition-colors duration-150 ${
          isAlive ? 'bg-gray-400' : 'bg-white'
        } hover:bg-gray-200 cursor-pointer`}
        style={{ 
          width: `${cellSize}px`, 
          height: `${cellSize}px` 
        }}
        onClick={() => onCellClick(rowIndex, colIndex)}
      />
    );
  }, [onCellClick, cellSize]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        className="border border-gray-200 grid-container"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${grid[0]?.length || 0}, ${cellSize}px)`,
          gap: '0px'
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))
        )}
      </div>
    </div>
  );
};

export default Grid;