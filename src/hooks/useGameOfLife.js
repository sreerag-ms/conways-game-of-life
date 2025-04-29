import { useCallback, useEffect, useRef, useState } from 'react';

export function useGameOfLife({ onStabilize } = {}) {
  // State management
  const [grid, setGrid] = useState([]);
  const [rows, setRows] = useState(20);
  const [cols, setCols] = useState(20);
  const [isRunning, setIsRunning] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(500); // Renamed for clarity
  
  // Refs
  const simulationIntervalRef = useRef(null);
  const previousGridRef = useRef(null);
  
  // ===== UTILITY FUNCTIONS =====
  
  // Check if two grids are equal
  const areGridsEqual = useCallback((gridA, gridB) => {
    if (!gridA || !gridB) return false;
    if (gridA.length !== gridB.length) return false;
    
    for (let i = 0; i < gridA.length; i++) {
      if (gridA[i].length !== gridB[i].length) return false;
      for (let j = 0; j < gridA[i].length; j++) {
        if (gridA[i][j] !== gridB[i][j]) return false;
      }
    }
    return true;
  }, []);
  
  // ===== SIMULATION CONTROL =====
  
  // Stop simulation - declared early to avoid circular reference
  const stopSimulation = useCallback(() => {
    if (simulationIntervalRef.current) {
      clearInterval(simulationIntervalRef.current);
      simulationIntervalRef.current = null;
    }
    setIsRunning(false);
  }, []);
  
  // Calculate next generation
  const calculateNextGeneration = useCallback(() => {
    setGrid(currentGrid => {
      const nextGrid = Array.from({ length: rows }, () => Array(cols).fill(0));
      
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          let aliveNeighbors = 0;
          
          // Count alive neighbors
          for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
              if (x === 0 && y === 0) continue;
              const neighborRow = i + x, neighborCol = j + y;
              if (neighborRow >= 0 && neighborRow < rows && neighborCol >= 0 && neighborCol < cols) {
                aliveNeighbors += currentGrid[neighborRow][neighborCol];
              }
            }
          }
          
          // Apply Game of Life rules
          if (currentGrid[i][j]) {
            // Cell is alive
            if (aliveNeighbors === 2 || aliveNeighbors === 3) {
              nextGrid[i][j] = 1; // Stay alive
            }
          } else {
            // Cell is dead
            if (aliveNeighbors === 3) {
              nextGrid[i][j] = 1; // Become alive
            }
          }
        }
      }
      
      // Check if the grid has stabilized
      const hasStabilized = areGridsEqual(currentGrid, nextGrid);
      if (hasStabilized) {
        console.log("Grid has stabilized");
        setTimeout(() => {
          stopSimulation();
          if (onStabilize) onStabilize();
        }, 0);
        return currentGrid; // Return the previous grid to avoid rendering an empty grid
      }
      
      return nextGrid;
    });
  }, [rows, cols, areGridsEqual, stopSimulation, onStabilize]);
  
  // Start simulation
  const startSimulation = useCallback(() => {
    if (grid.length > 0) {
      // Clean up any existing interval
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current);
      }
      
      // Set up new interval
      console.log(`Starting simulation with speed: ${simulationSpeed}ms`);
      simulationIntervalRef.current = window.setInterval(() => {
        console.log("Calculating next generation");
        calculateNextGeneration();
      }, simulationSpeed);
      
      setIsRunning(true);
    }
  }, [grid, simulationSpeed, calculateNextGeneration]);
  
  // Update simulation speed
  const updateSimulationSpeed = useCallback((newSpeed) => {
    setSimulationSpeed(newSpeed);
    
    // If simulation is running, restart with new speed
    if (isRunning) {
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current);
        simulationIntervalRef.current = null;
      }
      
      console.log(`Updating simulation speed to: ${newSpeed}ms`);
      simulationIntervalRef.current = window.setInterval(() => {
        console.log("Running next generation (after speed update)");
        calculateNextGeneration();
      }, newSpeed);
    }
  }, [isRunning, calculateNextGeneration]);
  
  // ===== GRID MANAGEMENT =====
  
  // Create the initial grid
  const createGrid = useCallback((rowCount = rows, colCount = cols) => {
    console.log('Creating grid with dimensions:', rowCount, colCount);
    const newGrid = Array.from({ length: rowCount }, () => Array(colCount).fill(0));
    setRows(rowCount);
    setCols(colCount);
    setGrid(newGrid);
    return newGrid;
  }, []);
  
  // Toggle cell state (alive/dead)
  const toggleCell = useCallback((rowIndex, colIndex) => {
    setGrid(currentGrid => {
      const nextGrid = currentGrid.map(row => [...row]);
      nextGrid[rowIndex][colIndex] = nextGrid[rowIndex][colIndex] ? 0 : 1;
      return nextGrid;
    });
  }, []);
  
  // Clear grid (set all cells to dead)
  const clearGrid = useCallback(() => {
    stopSimulation();
    setGrid(currentGrid => currentGrid.map(row => row.map(() => 0)));
  }, [stopSimulation]);
  
  // ===== CONFIGURATION MANAGEMENT =====
  
  // Save configuration to text
  const saveConfig = useCallback(() => {
    if (!grid.length) return '';
    
    let configText = '';
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        configText += grid[i][j];
      }
      if (i < rows - 1) configText += '\n';
    }
    return configText;
  }, [grid, rows, cols]);
  
  // Load configuration from text
  const loadConfig = useCallback((configText) => {
    if (!grid.length) return { success: false, message: 'Generate the grid first!' };
    
    const lines = configText.trim().split('\n').map(line => line.trim()).filter(line => line.length > 0);
    if (lines.length !== rows) {
      return { success: false, message: 'Number of rows does not match grid.' };
    }
    
    const newGrid = [...grid];
    
    for (let i = 0; i < rows; i++) {
      let cells = lines[i].split(/\s+/);
      if (cells.length === 1 && lines[i].length === cols) {
        cells = lines[i].split('');
      }
      if (cells.length !== cols) {
        return { success: false, message: `Row ${i+1} length mismatch.` };
      }
      for (let j = 0; j < cols; j++) {
        newGrid[i][j] = cells[j] === '1' ? 1 : 0;
      }
    }
    
    setGrid(newGrid);
    return { success: true };
  }, [grid, rows, cols]);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current);
      }
    };
  }, []);

  return {
    grid,
    rows,
    cols,
    isRunning,
    interval: simulationSpeed,
    createGrid,
    toggleCell,
    nextGeneration: calculateNextGeneration,
    startSimulation,
    stopSimulation,
    clearGrid,
    saveConfig,
    loadConfig,
    updateInterval: updateSimulationSpeed
  };
}