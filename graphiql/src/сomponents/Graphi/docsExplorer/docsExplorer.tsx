import { Flex, MantineTheme, createStyles } from '@mantine/core';
import { Suspense } from 'react';
import Heading from './Heading';

const useStyles = createStyles((theme: MantineTheme) => ({
  middle: {
    flex: '1',
    border: '1px solid',
    borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[1],
    ['@media (max-width: 1100px)']: {
      width: '100%',
    },
  },
}));

// black #282c34

const DocsExplorer = () => {
  const { classes } = useStyles();

  return (
    <Flex w="200px" direction="column" gap="sm" className={classes.middle}>
      <Suspense fallback={<p>loading...</p>}>
        <Heading />
      </Suspense>
    </Flex>
  );
};

export default DocsExplorer;
