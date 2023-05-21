import { Button, Flex } from '@mantine/core';
import Editor from './Editor';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setHeaders, setRequest, setVaribalse, setResponce } from '../../store/GraphiReduser';
import { IconPlayerPlay } from '@tabler/icons-react';
import getGpahGLresponse from '../../helpers/getGpahGLresponse';
import { useState } from 'react';

export type THeandler = (value: string) => {
  payload: string;
  type: string;
};

const RequestSection = () => {
  const [loading, isLoadToglet] = useState(false);
  const request = useAppSelector((state) => state.graphi.request);
  const variables = useAppSelector((state) => state.graphi.variables);
  const headers = useAppSelector((state) => state.graphi.headers);
  const dispatch = useAppDispatch();
  const setRequestCode = (value: string) => dispatch(setRequest(value));
  const setVaribalseCode = (value: string) => dispatch(setVaribalse(value));
  const setHeadersCode = (value: string) => dispatch(setHeaders(value));
  const submit = async () => {
    isLoadToglet(true);
    const response = await getGpahGLresponse(request, variables);
    dispatch(setResponce(response));
    isLoadToglet(false);
  };

  return (
    <Flex w="50%" direction="column" pos={'relative'}>
      <Button
        w={50}
        h={50}
        radius={25}
        variant="light"
        //variant="subtle"
        compact
        pos={'absolute'}
        top={60}
        left={'calc(100% - 55px)'}
        sx={{ zIndex: 999 }}
        onClick={submit}
        loading={loading}
        loaderPosition="center"
      >
        {!loading && <IconPlayerPlay strokeWidth={2} />}
      </Button>
      <Editor code={request} setCode={setRequestCode} name="request" codeH={300} />
      <Editor code={variables} setCode={setVaribalseCode} name="varibalse" closed codeH={130} />
      <Editor code={headers} setCode={setHeadersCode} name="headers" closed codeH={130} />
    </Flex>
  );
};

export default RequestSection;
