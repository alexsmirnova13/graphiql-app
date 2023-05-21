import { Flex } from '@mantine/core';
import { useAppSelector } from '../../store/hooks';
import Editor from './Editor';

const ResultSection = () => {
  const response = useAppSelector((state) => state.graphi.response);

  return (
    <Flex w="50%" direction="column">
      <Editor code={response} name="response" closed={false} codeH={636} readOnly={true} />
    </Flex>
  );
};

export default ResultSection;
