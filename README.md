# Conway's Game of Life

An interactive implementation of Conway's Game of Life using React, Tailwind CSS, and Ant Design.

![Conway's Game of Life Screenshot](https://i.imgur.com/placeholder.png)

## About the Project

Conway's Game of Life is a cellular automaton devised by mathematician John Conway in 1970. It's a zero-player game where evolution is determined by the initial state, following simple rules that create complex emergent behaviors.

### Features

- Interactive grid where cells can be toggled alive/dead
- Adjustable grid dimensions (5x5 to 100x100)
- Control simulation speed
- Start, stop, and step-by-step simulation
- Save and load grid configurations
- Automatic detection when the grid stabilizes
- Responsive design for various screen sizes

## Live Demo

Check out the live demo at: [https://sreerag-ms.github.io/conways-game-of-life](https://sreerag-ms.github.io/conways-game-of-life)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Bun or Yarn package manager

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/sreerag-ms/conways-game-of-life.git
   cd conways-game-of-life
   ```

2. Install dependencies
   ```bash
   # Using Bun
   bun install
   # OR using Yarn
   yarn install
   ```

3. Start the development server
   ```bash
   # Using Bun
   bun run dev
   # OR using Yarn
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Grid Setup**: 
   - Set the number of rows and columns (between 5-100)
   - Click "Generate Grid" to create a new grid

2. **Designing Patterns**:
   - Click on cells to toggle them alive/dead
   - Use the configuration drawer to save/load patterns

3. **Simulation Control**:
   - Start: Begin the simulation
   - Stop: Pause the simulation
   - Next Step: Manually advance one generation
   - Clear Grid: Reset all cells to dead
   - Adjust the interval slider to control simulation speed

## Game Rules

1. Any live cell with fewer than two live neighbors dies (underpopulation)
2. Any live cell with two or three live neighbors lives on to the next generation
3. Any live cell with more than three live neighbors dies (overpopulation)
4. Any dead cell with exactly three live neighbors becomes alive (reproduction)

## Deployment

### GitHub Pages

To deploy to GitHub Pages:

```bash
# Using Bun
bun run deploy
# OR using Yarn
yarn deploy
```

### Server Deployment

To build and start the Express server:

```bash
# Using Bun
bun run start
# OR using Yarn
yarn start
```