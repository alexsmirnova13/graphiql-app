import { Flex } from '@mantine/core';
import { useAppSelector } from '../../store/hooks';
import Editor from './Editor';
import prettyprint from 'prettyprint';

const ResultSection = () => {
  const response = useAppSelector((state) => state.graphi.response);

  return (
    <Flex miw="50%" direction="column">
      <Editor
        code={`${prettyprint(response)}`}
        name="response"
        closed={false}
        codeH={636}
        readOnly={true}
      />
    </Flex>
  );
};

export default ResultSection;
