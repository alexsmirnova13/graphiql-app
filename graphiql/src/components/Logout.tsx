import { Box, Button, Flex } from '@mantine/core';
import { Trans } from 'react-i18next';
import { signOut } from 'firebase/auth';
import { auth } from './../firebase';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './../store/hooks';
import { removeUser } from './../store/userSlice';

type LogoutProps = {
  btnType: string;
};

const Logout = ({ btnType }: LogoutProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handlerLogout = () => {
    signOut(auth);
    dispatch(removeUser());
    sessionStorage.removeItem('accessToken');
    navigate('/');
  };
  return (
    <Flex gap={10} justify={'flex-start'}>
      <Box w={100}>
        <Button onClick={handlerLogout} variant={btnType} w="100%">
          <Trans i18nKey="header.logout"></Trans>
        </Button>
      </Box>
    </Flex>
  );
};

export default Logout;
