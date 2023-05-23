import ButtonsPanel from '../сomponents/Graphi/buttonsPanel';
import DocsExplorer from '../сomponents/Graphi/docsExplorer';
import RequestSection from '../сomponents/Graphi/requestSection';
import ResultSection from '../сomponents/Graphi/resultSection';
import { Flex, Drawer, createStyles } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const useStyles = createStyles({
  large: {
    ['@media (min-width: 1100px)']: {
      flexDirection: 'row',
    },
  },
  middle: {
    flex: '1',
    ['@media (max-width: 1100px)']: {
      flexDirection: 'column',
      width: 'calc(100vw - 5rem)',
    },
  },
});

const Graphi = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = useStyles();

  return (
    <Flex w="100%">
      <>
        <Drawer
          opened={opened}
          onClose={close}
          title="Documentation"
          overlayProps={{ opacity: 0.5, blur: 4 }}
        >
          {opened && <DocsExplorer />}
        </Drawer>
        <ButtonsPanel onButtonClick={open} />
      </>

      <Flex w="100%" className={classes.middle}>
        <RequestSection />
        <ResultSection />
      </Flex>
    </Flex>
  );
};

export default Graphi;
