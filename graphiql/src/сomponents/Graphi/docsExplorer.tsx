import { Flex, Input } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

const DocsExplorer = () => {
  return (
    <Flex w={350} direction="column">
      <Input icon={<IconSearch size="1rem" />} placeholder="search" />
      <p>тут инфа разная</p>
    </Flex>
  );
};

export default DocsExplorer;
