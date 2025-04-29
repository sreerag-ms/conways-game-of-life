import { Typography } from 'antd';

const { Title } = Typography;

function AboutConway() {
  return (
    <div className="flex flex-col items-start px-6 py-6 text-left bg-white rounded-lg shadow-lg">
      <Title level={4} className="mb-4 !text-left">About Conway's Game of Life</Title>
      <div className="w-full space-y-4">
        <div>
          <p className="leading-relaxed text-gray-700">
            Conway's Game of Life is a cellular automaton devised by mathematician John Conway in 1970.
            The game is a zero-player game, meaning that its evolution is determined by its initial state.
          </p>
        </div>
        <div>
          <Title level={5} className="mb-2 !text-left">Rules:</Title>
          <ul className="pl-6 space-y-1 text-gray-700 list-disc">
            <li>Any live cell with fewer than two live neighbors dies (underpopulation)</li>
            <li>Any live cell with two or three live neighbors lives on to the next generation</li>
            <li>Any live cell with more than three live neighbors dies (overpopulation)</li>
            <li>Any dead cell with exactly three live neighbors becomes a live cell (reproduction)</li>
          </ul>
        </div>
        <div>
          <Title level={5} className="mb-2 !text-left">How to Use:</Title>
          <ol className="pl-6 space-y-1 text-gray-700 list-decimal">
            <li>Click on cells to toggle them alive/dead</li>
            <li>Use the controls to start/stop the simulation or step through generations</li>
            <li>Save interesting patterns to the configuration area and load them later</li>
            <li>Experiment with different grid sizes and speeds</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default AboutConway;
