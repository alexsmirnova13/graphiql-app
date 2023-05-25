import { useEffect, useState } from 'react';
import { Button, Flex } from '@mantine/core';
import getFields, { getSchema } from './../../utils/graphiApi';
import { GraphQLSchema } from 'graphql';

export interface IButtonsPanelProps {
  onButtonClick: (bool: boolean) => void;
  setSchema: (schema: GraphQLSchema | undefined) => void;
}

const ButtonsPanel = ({ onButtonClick, setSchema }: IButtonsPanelProps) => {
  const height = 'calc(100vh - 2rem - 3.75rem)';
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
    <Flex w={70} direction="column" bg="green" h={height}>
      <Button onClick={openDocs}>туть</Button>
      <Button onClick={downloadSchemas}>сють</Button>
    </Flex>
  );
};

export default ButtonsPanel;
