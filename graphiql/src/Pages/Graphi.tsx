import { useState } from 'react';
import DocsExplorer from '../сomponents/Graphi/docsExplorer/docsExplorer';
import RequestSection from '../сomponents/Graphi/requestSection';
import ResultSection from '../сomponents/Graphi/resultSection';
import { Flex, createStyles, Button } from '@mantine/core';
import { IconNotebook } from '@tabler/icons-react';

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

  return (
    <Flex w="100%" className={classes.middle} pos={'relative'} top={0} left={0}>
      <Flex direction="column">
        <Button onClick={() => setIsOpened(!isOpened)} variant="subtle">
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
