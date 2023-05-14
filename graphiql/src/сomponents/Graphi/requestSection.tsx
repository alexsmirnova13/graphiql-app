import { Button, Flex } from '@mantine/core';

const RequestSection = () => {
  return (
    <Flex w="50%" bg="yellow" direction="column" justify="space-between">
      <Flex direction="row" justify="space-between" h="50%">
        <p>код тут</p>
        <Button>плей</Button>
      </Flex>
      <Flex direction="row" justify="space-between" h="50%" bg="cyan">
        <div>Вариаблес</div>
        <div>Хедерс</div>
      </Flex>
    </Flex>
  );
};

export default RequestSection;
