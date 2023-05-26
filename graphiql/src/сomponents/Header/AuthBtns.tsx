import { Box, Button, Flex } from '@mantine/core';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IconLogin, IconUserPlus } from '@tabler/icons-react';

type AuthBtnsProps = {
  currentPage: string;
  buttonType: string;
};

const AuthBtns = ({ currentPage, buttonType }: AuthBtnsProps) => {
  const color = buttonType === 'subtle' ? '#228be6' : '#ffffff';
  return (
    <Flex gap={10} justify={'flex-start'}>
      {currentPage !== '/singin' && (
        <Box w={100}>
          <Link to="/signin">
            <Button onClick={close} variant={buttonType} w="100%">
              <IconLogin size={30} strokeWidth={1.5} color={color} />
              <Trans i18nKey="header.signin"></Trans>
            </Button>
          </Link>
        </Box>
      )}

      {currentPage !== '/singup' && (
        <Box w={150}>
          <Link to="/signup">
            <Button onClick={close} variant={buttonType} w="100%">
              <IconUserPlus size={26} strokeWidth={1.5} color={color} />
              <Trans i18nKey="header.signup"></Trans>
            </Button>
          </Link>
        </Box>
      )}
    </Flex>
  );
};

export default AuthBtns;
