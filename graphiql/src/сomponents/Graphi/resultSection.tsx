import { Flex } from '@mantine/core';
import { useAppSelector } from '../../store/hooks';
import Editor from './Editor';
import prettyprint from 'prettyprint';
import { useTranslation } from 'react-i18next';

const ResultSection = () => {
  const response = useAppSelector((state) => state.graphi.response);
  const { t } = useTranslation();

  return (
    <Flex miw="50%" direction="column">
      <Editor
        code={response !== '' ? `${prettyprint(response)}` : t('editor.defaultResponse')}
        name="response"
        closed={false}
        codeH={636}
        readOnly={true}
      />
    </Flex>
  );
};

export default ResultSection;
