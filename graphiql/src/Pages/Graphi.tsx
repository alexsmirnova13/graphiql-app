import { useState } from 'react';
import ButtonsPanel from '../сomponents/Graphi/buttonsPanel';
import DocsExplorer from '../сomponents/Graphi/docsExplorer';
import RequestSection from '../сomponents/Graphi/requestSection';
import ResultSection from '../сomponents/Graphi/resultSection';
import { Flex } from '@mantine/core';
import { GraphQLSchema } from 'graphql';

const Graphi = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [schema, setSchema] = useState<GraphQLSchema>();
  const handleClick = (bool: boolean) => {
    setIsOpened(bool);
  };

  return (
    <Flex direction="row" w="100%">
      <Flex direction="row">
        <ButtonsPanel onButtonClick={handleClick} setSchema={setSchema} />
        {isOpened && <DocsExplorer schema={schema} />}
      </Flex>
      <Flex direction="row" w="100%">
        <RequestSection />
        <ResultSection />
      </Flex>
    </Flex>
  );
};

export default Graphi;
