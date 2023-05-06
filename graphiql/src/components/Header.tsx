import { Header, UnstyledButton, Image, createStyles, Flex, Button } from '@mantine/core';
import { useTranslation, Trans } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/svg/logo.svg';
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
  logo: {
    //flex: '1',
  },
  link: {
    textDecoration: 'none',
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

const AppHeader = () => {
  const { classes } = useStyles();
  const { i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  const them = 'dark';
  const currentPage = useLocation().pathname;
  return (
    <Header height={60} fixed={true} zIndex={2}>
      <Flex justify={'space-between'} align={'center'} px={10} gap={10}>
        <Image width={200} height={60} src={logo} className={classes.logo} />
        <Link to="/" className={classes.home}>
          <IconHome2 size={25} color="#4090bf" strokeWidth={1} />
        </Link>
        {currentPage !== '/singin' && (
          <Button>
            <Link className={classes.link} to="/sing">
              <Trans i18nKey="header.signin"></Trans>
            </Link>
          </Button>
        )}

        {currentPage !== '/singup' && (
          <Button>
            <Link className={classes.link} to="/sing">
              <Trans i18nKey="header.signup"></Trans>
            </Link>
          </Button>
        )}
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
        <UnstyledButton className={classes.theme} p={2} color="blue" h={30} w={30}>
          {them === 'dark' ? (
            <IconSunHigh size={25} strokeWidth={1} color={'#fcfc03'} />
          ) : (
            <IconMoon strokeWidth={1} size={23} />
          )}
        </UnstyledButton>
      </Flex>
    </Header>
  );
};
export default AppHeader;
