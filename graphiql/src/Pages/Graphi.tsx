import { useState } from 'react';
import ButtonsPanel from '../сomponents/Graphi/buttonsPanel';
import DocsExplorer from '../сomponents/Graphi/docsExplorer';
import RequestSection from '../сomponents/Graphi/requestSection';
import ResultSection from '../сomponents/Graphi/resultSection';
import { Flex, createStyles } from '@mantine/core';
import ErrorBoundary from '../сomponents/ErrorBoundary';

const useStyles = createStyles({
  // large: {
  //   ['@media (min-width: 1100px)']: {
  //     flexDirection: 'row',
  //   },
  // },
  middle: {
    flex: '1',
    ['@media (max-width: 1025px)']: {
      flexDirection: 'column',
    },
  },
});

const Graphi = () => {
  const [isOpened, setIsOpened] = useState(false);
  const { classes } = useStyles();
  const handleClick = (bool: boolean) => {
    setIsOpened(bool);
  };

  return (
    <ErrorBoundary>
      <Flex w="100%" className={classes.middle}>
        <Flex direction="row">
          <ButtonsPanel onButtonClick={handleClick} />
          {isOpened && <DocsExplorer />}
        </Flex>

        <Flex w="100%" className={classes.middle}>
          <RequestSection />
          <ResultSection />
        </Flex>
      </Flex>
    </ErrorBoundary>
  );
};

export default Graphi;
