import { useState } from 'react';
import RequestSection from '../сomponents/Graphi/requestSection';
import ResultSection from '../сomponents/Graphi/resultSection';
import { Flex, createStyles, Button } from '@mantine/core';
import { IconNotebook } from '@tabler/icons-react';
import DocsExplorer from '../сomponents/Graphi/docsExplorer/DocsExplorer';

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

  return (
    <Flex w="100%" className={classes.middle} pos={'relative'} top={0} left={0}>
      <Flex direction="column">
        <Button onClick={() => setIsOpened(!isOpened)} variant="light" radius={0}>
          <IconNotebook size={35} strokeWidth={1} />
        </Button>
        {isOpened && <DocsExplorer />}
      </Flex>

      <Flex w="100%" className={classes.middle}>
        <RequestSection />
        <ResultSection />
      </Flex>
    </Flex>
  );
};

export default Graphi;
