import { Box, Button, Flex } from '@mantine/core';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

type AuthBtnsProps = {
  currentPage: string;
  buttonType: string;
};

const AuthBtns = ({ currentPage, buttonType }: AuthBtnsProps) => {
  return (
    <Flex gap={10} justify={'flex-start'}>
      {currentPage !== '/singin' && (
        <Box w={70}>
          <Link to="/signin">
            <Button onClick={close} variant={buttonType} w="100%">
              <Trans i18nKey="header.signin"></Trans>
            </Button>
          </Link>
        </Box>
      )}

      {currentPage !== '/singup' && (
        <Box w={130}>
          <Link to="/signup">
            <Button onClick={close} variant={buttonType} w="100%">
              <Trans i18nKey="header.signup"></Trans>
            </Button>
          </Link>
        </Box>
      )}
    </Flex>
  );
};

export default AuthBtns;
