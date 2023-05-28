import { Button, Flex, createStyles } from '@mantine/core';
import Editor from './Editor';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setRequest, setVaribalse, setResponce } from '../../store/graphiSlice';
import { IconPlayerPlay } from '@tabler/icons-react';
import getGpahGLresponse from '../../helpers/getGpahGLresponse';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export type THeandler = (value: string) => {
  payload: string;
  type: string;
};

const useStyles = createStyles({
  small: {
    flex: '1',
    ['@media (max-width: 600px)']: {
      width: '40px',
      height: '40px',
      border: '1px solid #228be6',
      top: '0px',
    },
  },
});

const RequestSection = () => {
  const [loading, isLoadToglet] = useState(false);
  const request = useAppSelector((state) => state.graphi.request);
  const variables = useAppSelector((state) => state.graphi.variables);
  const { t } = useTranslation();
  const headers = t('editor.headersMessage');
  const dispatch = useAppDispatch();
  const setRequestCode = (value: string) => dispatch(setRequest(value));
  const setVaribalseCode = (value: string) => dispatch(setVaribalse(value));
  const { classes } = useStyles();

  const submit = async () => {
    isLoadToglet(true);
    const response = await getGpahGLresponse(request, variables);
    dispatch(setResponce(response));
    isLoadToglet(false);
  };

  return (
    <Flex miw="50%" direction="column" pos={'relative'}>
      <Button
        w={50}
        h={50}
        radius={25}
        variant="light"
        compact
        pos={'absolute'}
        top={60}
        left={'calc(100% - 80px)'}
        sx={{ zIndex: 1 }}
        onClick={submit}
        loading={loading}
        loaderPosition="center"
        className={classes.small}
      >
        {!loading && <IconPlayerPlay strokeWidth={2} />}
      </Button>
      <Editor code={request} setCode={setRequestCode} name="request" codeH={300} />
      <Editor code={variables} setCode={setVaribalseCode} name="varibalse" closed codeH={130} />
      <Editor code={headers} name="headers" closed codeH={130} />
    </Flex>
  );
};

export default RequestSection;
