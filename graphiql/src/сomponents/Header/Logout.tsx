import { Box, Button, Flex, Text, UnstyledButton, Group, Avatar } from '@mantine/core';
import { Trans } from 'react-i18next';
import { logout } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { removeUser } from '../../store/userSlice';
import { IconLogout } from '@tabler/icons-react';

type LogoutProps = {
  buttonType: 'filled' | 'subtle';
  name: string;
  error: Error | undefined;
  errorDB: JSX.Element | null;
  loading: boolean;
};

const Logout = (props: LogoutProps) => {
  const { buttonType, name, errorDB } = props;
  const color = buttonType === 'subtle' ? '#228be6' : '#ffffff';
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handlerLogout = () => {
    logout();
    dispatch(removeUser());
    navigate('/');
  };
  return (
    <Flex gap={10} justify={'flex-start'}>
      <UnstyledButton>
        <Group>
          <Avatar radius="xl" color="blue" />
          <div>
            <Text size="s"> {name} </Text>
            {errorDB !== null && <Text size="s"> {errorDB} </Text>}
          </div>
        </Group>
      </UnstyledButton>
      <Box w={100}>
        <Button onClick={handlerLogout} variant={buttonType} w="100%">
          <IconLogout size={30} strokeWidth={1.5} color={color} />
          <Trans i18nKey="header.logout"></Trans>
        </Button>
      </Box>
    </Flex>
  );
};

export default Logout;
