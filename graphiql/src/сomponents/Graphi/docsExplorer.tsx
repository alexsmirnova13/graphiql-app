import { Flex, Input } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

const DocsExplorer = () => {
  const weigth = 'calc(30vw - 2rem)';
  return (
    <Flex w={weigth} direction="column">
      <Input icon={<IconSearch size="1rem" />} placeholder="search" />
      <p>тут инфа разная</p>
    </Flex>
  );
};

export default DocsExplorer;
