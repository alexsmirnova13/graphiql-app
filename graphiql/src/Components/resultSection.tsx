import { Flex } from '@mantine/core';

const ResultSection = () => {
  return (
    <Flex w="50%" bg="violet" direction="column" justify="space-between">
      <p>тут результат</p>
      <div>
        <p>тут возможно код респонс</p>
      </div>
    </Flex>
  );
};

export default ResultSection;
