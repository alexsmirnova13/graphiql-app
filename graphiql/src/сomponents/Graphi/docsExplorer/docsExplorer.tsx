import { Button, Flex, MantineTheme, createStyles } from '@mantine/core';
import getScheme from './getScheme';
import { useState } from 'react';

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
  const [scheme, setScheme] = useState();
  const submit = async () => {
    const response = await getScheme();
    setScheme(response);
    console.log(response);
  };
  return (
    <Flex w="200px" direction="column" gap="sm" className={classes.middle}>
      <Button onClick={() => submit()}></Button>
      {JSON.stringify(scheme)}
    </Flex>
  );
};

export default DocsExplorer;
