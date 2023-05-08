import {
  UnstyledButton,
  createStyles,
  Button,
  Switch,
  useMantineColorScheme,
  Flex,
  Box,
} from '@mantine/core';
import { useTranslation, Trans } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { IconSunHigh, IconMoon, IconHome2 } from '@tabler/icons-react';

const useStyles = createStyles({
  button: {
    borderRadius: '50%',
    backgroundColor: 'rgba(135, 131, 131, 0.1)',
    padding: '2px',
    transition: 'all 0.3s',

    '&:hover': {
      backgroundColor: 'rgba(2, 190, 242, 0.4)',
      scale: '1.1',
    },
  },
  theme: {
    transition: 'all 0.3s',
    '&:hover': {
      scale: '1.1',
    },
  },
  home: {
    flex: '1',
  },
});

type MenuProps = {
  close?: () => void;
};

const Menu = (props: MenuProps) => {
  const { close } = props;
  const { classes } = useStyles();
  const { i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  const currentPage = useLocation().pathname;
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <>
      <div className={classes.home}>
        {currentPage !== '/' && (
          <Link to="/">
            <Button
              variant="subtle"
              color="#4090bf"
              compact
              leftIcon={<IconHome2 size={25} color="#4090bf" strokeWidth={1} />}
              onClick={close}
            >
              Home
            </Button>
          </Link>
        )}
      </div>

      <Flex justify={'space-between'} gap={10} wrap={'wrap'}>
        <Flex gap={10} justify={'flex-start'}>
          {currentPage !== '/singin' && (
            <Box w={110}>
              <Link to="/sing">
                <Button onClick={close}>
                  <Trans i18nKey="header.signin"></Trans>
                </Button>
              </Link>
            </Box>
          )}

          {currentPage !== '/singup' && (
            <Box w={85}>
              <Link to="/sing">
                <Button onClick={close}>
                  <Trans i18nKey="header.signup"></Trans>
                </Button>
              </Link>
            </Box>
          )}
        </Flex>

        <Flex gap={10} justify={'flex-end'} align={'center'}>
          <UnstyledButton
            className={classes.button}
            color="blue"
            onClick={() => changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')}
            h={30}
            w={30}
            ta={'center'}
          >
            {i18n.language.toUpperCase()}
          </UnstyledButton>

          <Switch
            checked={colorScheme === 'dark'}
            onChange={() => toggleColorScheme()}
            size="lg"
            onLabel={<IconSunHigh color={'#fcfc03'} size="1.25rem" stroke={1.5} />}
            offLabel={<IconMoon size="1.25rem" stroke={1.5} />}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default Menu;
