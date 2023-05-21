import { useState } from 'react';
import ButtonsPanel from '../сomponents/Graphi/buttonsPanel';
import DocsExplorer from '../сomponents/Graphi/docsExplorer';
import RequestSection from '../сomponents/Graphi/requestSection';
import ResultSection from '../сomponents/Graphi/resultSection';
import { Flex } from '@mantine/core';

const Graphi = () => {
  const [isOpened, setIsOpened] = useState(false);
  const handleClick = (bool: boolean) => {
    setIsOpened(bool);
  };
  //const [variables, setVariables] = useState('variables');
  //const [response, setResponse] = useState('response');
  //const [headers, setHeaders] = useState('headers');

  return (
    <Flex direction="row" w="100%">
      <Flex direction="row">
        <ButtonsPanel onButtonClick={handleClick} />
        {isOpened && <DocsExplorer />}
      </Flex>
      <Flex direction="row" w="100%">
        <RequestSection />
        <ResultSection />
      </Flex>
    </Flex>
  );
};

export default Graphi;
