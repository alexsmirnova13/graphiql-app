import { useEffect, useState } from 'react';
import { Button, Flex } from '@mantine/core';

export interface IButtonsPanelProps {
  onButtonClick: (bool: boolean) => void;
}

const ButtonsPanel = ({ onButtonClick }: IButtonsPanelProps) => {
  const height = 'calc(100vh - 2rem - 3.75rem)';
  const [panelStatus, setPanelStatus] = useState(false);
  const openDocs = () => {
    panelStatus === false ? setPanelStatus(true) : setPanelStatus(false);
  };
  useEffect(() => {
    onButtonClick(panelStatus);
  }, [panelStatus, onButtonClick]);
  return (
    <Flex w={70} direction="column" bg="green" h={height}>
      <Button onClick={openDocs}>туть</Button>
      <Button>сють</Button>
    </Flex>
  );
};

export default ButtonsPanel;
