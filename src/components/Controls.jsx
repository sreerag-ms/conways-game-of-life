import {
  ClearOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  ReloadOutlined,
  SaveOutlined,
  SettingOutlined,
  StepForwardOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { Button, Drawer, Input, InputNumber, message, Space, Tooltip } from 'antd';
import React, { useRef, useState } from 'react';

const Controls = ({ 
  rows,
  cols, 
  isRunning, 
  interval,
  onGenerate,
  onStart,
  onStop,
  onStep,
  onClear,
  onSaveConfig,
  onLoadConfig,
  onUpdateInterval
}) => {
  const [rowInput, setRowInput] = useState(rows);
  const [colInput, setColInput] = useState(cols);
  const [intervalInput, setIntervalInput] = useState(interval);
  const [configDrawerOpen, setConfigDrawerOpen] = useState(false);
  const textAreaRef = useRef(null);
  const [configText, setConfigText] = useState('');

  const handleGenerate = () => {
    if (rowInput < 5 || colInput < 5) {
      message.error('Grid dimensions should be at least 5x5');
      return;
    }
    if (rowInput > 100 || colInput > 100) {
      message.error('Grid dimensions should not exceed 100x100');
      return;
    }
    onGenerate(rowInput, colInput);
  };

  const handleSaveConfig = () => {
    const config = onSaveConfig();
    setConfigText(config);
    setConfigDrawerOpen(true);
    message.success('Configuration saved to text area');
  };

  const handleLoadConfig = () => {
    const result = onLoadConfig(configText);
    if (result.success) {
      message.success('Configuration loaded successfully');
      setConfigDrawerOpen(false);
    } else {
      message.error(result.message);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4 mb-4 md:flex-row">
        <Space>
          <Tooltip title="Number of rows">
            <InputNumber 
              min={5} 
              max={100} 
              value={rowInput} 
              onChange={setRowInput}
              addonBefore="Rows"
            />
          </Tooltip>
          <Tooltip title="Number of columns">
            <InputNumber 
              min={5} 
              max={100} 
              value={colInput} 
              onChange={setColInput}
              addonBefore="Cols"
            />
          </Tooltip>
          <Button 
            type="primary" 
            icon={<ReloadOutlined />}
            onClick={handleGenerate}
          >
            Generate Grid
          </Button>
        </Space>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <Button
          type="primary"
          icon={<PlayCircleOutlined />}
          onClick={onStart}
          disabled={isRunning}
        >
          Start
        </Button>
        <Button
          danger
          icon={<PauseCircleOutlined />}
          onClick={onStop}
          disabled={!isRunning}
        >
          Stop
        </Button>
        <Button
          icon={<StepForwardOutlined />}
          onClick={onStep}
          disabled={isRunning}
        >
          Next Step
        </Button>
        <Button
          icon={<ClearOutlined />}
          onClick={onClear}
        >
          Clear Grid
        </Button>
        <Button
          icon={<SettingOutlined />}
          onClick={() => setConfigDrawerOpen(true)}
        >
          Configurations
        </Button>

        <Tooltip title="Simulation speed (milliseconds)">
          <InputNumber
            addonBefore="Interval (ms)"
            min={10}
            max={2000}
            step={10}
            value={intervalInput}
            onChange={(val) => {
              setIntervalInput(val);
              onUpdateInterval(val);
            }}
          />
        </Tooltip>
      </div>

      <Drawer
        title="Grid Configuration"
        placement="right"
        onClose={() => setConfigDrawerOpen(false)}
        open={configDrawerOpen}
        width={400}
      >
        <div className="flex flex-col gap-4">
          <p className="text-gray-600">
            Use 0's and 1's to define your pattern. Each row must match the grid width.
          </p>
          <Input.TextArea
            ref={textAreaRef}
            value={configText}
            onChange={(e) => setConfigText(e.target.value)}
            rows={12}
            placeholder="Initial configuration: use 0/1 rows"
            className="font-mono"
          />
          <div className="flex justify-end gap-2">
            <Button
              icon={<SaveOutlined />}
              onClick={handleSaveConfig}
            >
              Save Current Grid
            </Button>
            <Button
              type="primary"
              icon={<UploadOutlined />}
              onClick={handleLoadConfig}
            >
              Load Configuration
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Controls;