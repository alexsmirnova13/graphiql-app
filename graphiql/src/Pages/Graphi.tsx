import { useState } from 'react';
import ButtonsPanel from '../Components/buttonsPanel';
import DocsExplorer from '../Components/docsExplorer';
import RequestSection from '../Components/requestSection';
import ResultSection from '../Components/resultSection';
import { Flex } from '@mantine/core';

const Graphi = () => {
  const [isOpened, setIsOpened] = useState(false);
  const handleClick = (bool: boolean) => {
    setIsOpened(bool);
  };

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
