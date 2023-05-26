import { Box, Button, Flex, Text, UnstyledButton, Group } from '@mantine/core';
import { Trans } from 'react-i18next';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { removeUser } from '../../store/userSlice';
import ErrorBoundary from '../ErrorBoundary';

type LogoutProps = {
  buttonType: 'filled' | 'subtle';
  name: string;
  error: Error | undefined;
  errorDB: JSX.Element | null;
  loading: boolean;
};

const Logout = (props: LogoutProps) => {
  const { buttonType, name, errorDB } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handlerLogout = () => {
    signOut(auth);
    dispatch(removeUser());
    localStorage.removeItem('accessToken');
    navigate('/');
  };
  return (
    <ErrorBoundary>
      <Flex gap={10} justify={'flex-start'}>
        <UnstyledButton>
          <Group>
            <div>
              <Text size="s"> {name} </Text>
              {errorDB !== null && <Text size="s"> {errorDB} </Text>}
            </div>
          </Group>
        </UnstyledButton>
        <Box w={100}>
          <Button onClick={handlerLogout} variant={buttonType} w="100%">
            <Trans i18nKey="header.logout"></Trans>
          </Button>
        </Box>
      </Flex>
    </ErrorBoundary>
  );
};

export default Logout;
