import { useEffect, useState } from 'react';
import { Button, Flex } from '@mantine/core';
import { IconClipboardText, IconBrandGraphql, IconNotebook } from '@tabler/icons-react';

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
    // <Flex w={70} direction="column" h={height}>
    <Button onClick={openDocs}>
      <IconBrandGraphql size={35} strokeWidth={1.5} color={'#ffffff'} />
      <IconClipboardText size={35} strokeWidth={1.5} color={'#ffffff'} />
      <IconNotebook size={35} strokeWidth={1.5} color={'#ffffff'} />
    </Button>
    // </Flex>
  );
};

export default ButtonsPanel;
