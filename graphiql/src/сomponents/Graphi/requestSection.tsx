import { Flex } from '@mantine/core';
import Editor from './Editor';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setHeaders, setRequest, setVaribalse } from '../../store/GraphiReduser';

export type THeandler = (value: string) => {
  payload: string;
  type: string;
};

const RequestSection = () => {
  const request = useAppSelector((state) => state.graphi.request);
  const variables = useAppSelector((state) => state.graphi.variables);
  const headers = useAppSelector((state) => state.graphi.headers);
  const dispatch = useAppDispatch();
  const setRequestCode = (value: string) => dispatch(setRequest(value));
  const setVaribalseCode = (value: string) => dispatch(setVaribalse(value));
  const setHeadersCode = (value: string) => dispatch(setHeaders(value));

  return (
    <Flex w="50%" direction="column">
      <Editor code={request} setCode={setRequestCode} name="request" codeH={300} />
      <Editor code={variables} setCode={setVaribalseCode} name="varibalse" closed codeH={130} />
      <Editor code={headers} setCode={setHeadersCode} name="headers" closed codeH={130} />
    </Flex>
  );
};

export default RequestSection;
