import { ConfigProvider, Layout, Modal, Typography } from 'antd';
import { useEffect, useState } from 'react';
import './App.css';
import AboutConway from './components/AboutConway';
import Controls from './components/Controls';
import Grid from './components/Grid';
import { useGameOfLife } from './hooks/useGameOfLife';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  const [stabilizedModalOpen, setStabilizedModalOpen] = useState(false);

  const {
    grid,
    rows,
    cols,
    isRunning,
    interval,
    createGrid,
    toggleCell,
    nextGeneration,
    startSimulation,
    stopSimulation,
    clearGrid,
    saveConfig,
    loadConfig,
    updateInterval
  } = useGameOfLife({
    onStabilize: () => setStabilizedModalOpen(true)
  });

  useEffect(() => {
    createGrid(20, 20);
  }, [createGrid]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
        },
      }}
    >
      <Layout className="min-h-screen">
        <Header className="sticky top-0 z-10 flex items-center px-8 py-3 border-b border-blue-200 rounded shadow bg-gradient-to-r from-blue-50 via-white to-blue-100">
          <div className="flex items-center w-full gap-3">
            <span className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full shadow-sm">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="6" y="6" width="20" height="20" rx="6" fill="#1677ff" opacity="0.15"/>
                <rect x="10" y="10" width="12" height="12" rx="3" fill="#1677ff" opacity="0.3"/>
                <rect x="14" y="14" width="4" height="4" rx="1" fill="#1677ff"/>
              </svg>
            </span>
            <Title
              level={3}
              className="m-0 font-semibold tracking-tight text-blue-900"
              style={{ lineHeight: 1.1, marginBottom: 0 }}
            >
              Conway's Game of Life
            </Title>
          </div>
        </Header>
        <Content className="p-6 md:p-12 bg-gradient-to-b from-gray-50 to-gray-100">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <Controls
                rows={rows}
                cols={cols}
                isRunning={isRunning}
                interval={interval}
                onGenerate={createGrid}
                onStart={startSimulation}
                onStop={stopSimulation}
                onStep={nextGeneration}
                onClear={clearGrid}
                onSaveConfig={saveConfig}
                onLoadConfig={loadConfig}
                onUpdateInterval={updateInterval}
              />
              
              <div className="flex justify-center pb-4 overflow-auto">
                <Grid
                  grid={grid}
                  onCellClick={toggleCell}
                  cellSize={Math.max(6, Math.min(15, 600 / Math.max(rows, cols)))}
                />
              </div>
            </div>
            
            <AboutConway />
          </div>
          <Modal
            open={stabilizedModalOpen}
            onOk={() => setStabilizedModalOpen(false)}
            onCancel={() => setStabilizedModalOpen(false)}
            centered
            footer={null}
            width={360}
            bodyStyle={{ textAlign: 'center', padding: '32px 24px' }}
          >
            <div className="flex flex-col items-center">
              <div className="mb-4 text-3xl">🎉</div>
              <Typography.Title level={4} style={{ marginBottom: 8 }}>
                Grid Stabilized
              </Typography.Title>
              <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                No more changes will occur. <br />
                Try a new pattern or reset the grid!
              </Typography.Paragraph>
              <button
                className="px-6 py-2 mt-6 text-white transition bg-blue-600 rounded hover:bg-blue-700"
                onClick={() => setStabilizedModalOpen(false)}
              >
                OK
              </button>
            </div>
          </Modal>
        </Content>
        <Footer className="text-center bg-white">
          Conway's Game of Life ©{new Date().getFullYear()} Created with React, Ant Design, and Tailwind CSS
        </Footer>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
