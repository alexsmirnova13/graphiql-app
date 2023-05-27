import { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import { IconNotebook } from '@tabler/icons-react';
import getFields, { getSchema } from './../../utils/graphiApi';
import { GraphQLSchema } from 'graphql';

export interface IButtonsPanelProps {
  onButtonClick: (bool: boolean) => void;
  setSchema: (schema: GraphQLSchema | undefined) => void;
}

const ButtonsPanel = ({ onButtonClick, setSchema }: IButtonsPanelProps) => {
  const [panelStatus, setPanelStatus] = useState(false);
  const openDocs = () => {
    panelStatus === false ? setPanelStatus(true) : setPanelStatus(false);
  };
  const downloadSchemas = async () => {
    const schema = await getSchema();
    setSchema(schema);
  };
  useEffect(() => {
    onButtonClick(panelStatus);
  }, [panelStatus, onButtonClick]);
  return (
    <Button onClick={openDocs}>
      <IconNotebook size={35} strokeWidth={1.5} color={'#ffffff'} />
    </Button>
  );
};

export default ButtonsPanel;
