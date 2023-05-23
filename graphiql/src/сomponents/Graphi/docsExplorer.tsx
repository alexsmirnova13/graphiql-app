import { Flex, Input, createStyles } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

const useStyles = createStyles({
  middle: {
    flex: '1',
    ['@media (max-width: 1100px)']: {
      width: '100%',
    },
  },
});

const DocsExplorer = () => {
  const { classes } = useStyles();
  return (
    <Flex w="200px" direction="column" gap="sm" className={classes.middle}>
      <Input icon={<IconSearch size="1rem" />} placeholder="search" maw="300px" />
      <p>тут инфа разная</p>
    </Flex>
  );
};

export default DocsExplorer;
