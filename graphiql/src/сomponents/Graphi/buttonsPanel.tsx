import { useEffect, useState } from 'react';
import { Button, Flex, MantineTheme, createStyles } from '@mantine/core';
import { IconNotebook } from '@tabler/icons-react';

export interface IButtonsPanelProps {
  onButtonClick: (bool: boolean) => void;
}
const useStyles = createStyles((theme: MantineTheme) => ({
  buttonPanel: {
    background: theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[1],
  },
}));
const ButtonsPanel = ({ onButtonClick }: IButtonsPanelProps) => {
  const [panelStatus, setPanelStatus] = useState(false);
  const openDocs = () => {
    panelStatus === false ? setPanelStatus(true) : setPanelStatus(false);
  };
  const { classes } = useStyles();
  useEffect(() => {
    onButtonClick(panelStatus);
  }, [panelStatus, onButtonClick]);
  return (
    <Flex w={50} className={classes.buttonPanel} direction="column">
      <Button onClick={openDocs} style={{ padding: '0', marginTop: '34px' }}>
        <IconNotebook size={35} strokeWidth={1.5} color={'#ffffff'} />
      </Button>
    </Flex>
  );
};

export default ButtonsPanel;
