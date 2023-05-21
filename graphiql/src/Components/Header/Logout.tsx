import { Box, Button, Flex, Text, UnstyledButton, Group, Avatar } from '@mantine/core';
import { Trans } from 'react-i18next';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { removeUser } from '../../store/userSlice';

type LogoutProps = {
  buttonType: 'filled' | 'subtle';
  name: string;
};

const Logout = (props: LogoutProps) => {
  const { buttonType, name } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handlerLogout = () => {
    signOut(auth);
    dispatch(removeUser());
    localStorage.removeItem('accessToken');
    navigate('/');
  };
  return (
    <Flex gap={10} justify={'flex-start'}>
      <UnstyledButton>
        <Group>
          {' '}
          <div>
            <Text size="s"> {name} </Text>
          </div>
        </Group>
      </UnstyledButton>
      <Box w={100}>
        <Button onClick={handlerLogout} variant={buttonType} w="100%">
          <Trans i18nKey="header.logout"></Trans>
        </Button>
      </Box>
    </Flex>
  );
};

export default Logout;
