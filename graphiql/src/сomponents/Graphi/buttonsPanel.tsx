import { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import { IconNotebook } from '@tabler/icons-react';

export interface IButtonsPanelProps {
  onButtonClick: (bool: boolean) => void;
}

const ButtonsPanel = ({ onButtonClick }: IButtonsPanelProps) => {
  // const height = 'calc(100vh - 2rem - 3.75rem)';
  const [panelStatus, setPanelStatus] = useState(false);
  const openDocs = () => {
    panelStatus === false ? setPanelStatus(true) : setPanelStatus(false);
  };

  useEffect(() => {
    onButtonClick(panelStatus);
  }, [panelStatus, onButtonClick]);
  return (
<<<<<<< HEAD
    <Flex w={70} direction="column" bg="green" h={height}>
      <Button onClick={openDocs}>туть</Button>
    </Flex>
=======
    <Button onClick={openDocs}>
      <IconNotebook size={35} strokeWidth={1.5} color={'#ffffff'} />
    </Button>
>>>>>>> develop
  );
};

export default ButtonsPanel;
