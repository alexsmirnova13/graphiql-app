import { useState, lazy, Suspense } from 'react';
import ButtonsPanel from '../сomponents/Graphi/buttonsPanel';
import RequestSection from '../сomponents/Graphi/requestSection';
import ResultSection from '../сomponents/Graphi/resultSection';
import { Flex, createStyles } from '@mantine/core';
import { fetchSchema } from '../utils/graphiApi';

const DocsExplorer = lazy(() => import('../сomponents/Graphi/docsExplorer'));
const response = fetchSchema();
const useStyles = createStyles({
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
  const schema = response.read();
  return (
    <Flex w="100%" className={classes.middle}>
      <Flex direction="row">
        <ButtonsPanel onButtonClick={handleClick} />
        {isOpened && (
          <Suspense fallback={<div>Loading</div>}>
            <DocsExplorer schema={schema} />
          </Suspense>
        )}
      </Flex>

      <Flex w="100%" className={classes.middle}>
        <RequestSection />
        <ResultSection />
      </Flex>
    </Flex>
  );
};

export default Graphi;
