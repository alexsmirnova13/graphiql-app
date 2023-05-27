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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IconSunHigh, IconMoon, IconHome2 } from '@tabler/icons-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, logout } from '../../firebase';
import AuthBtns from './AuthBtns';
import Logout from './Logout';
import { useEffect, useState } from 'react';
import { query, collection, getDocs, where } from 'firebase/firestore';

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
  scroll?: number;
};

const Menu = (props: MenuProps) => {
  const { close, scroll } = props;
  const { classes } = useStyles();
  const { i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  const currentPage = useLocation().pathname;
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const buttonType = scroll === 0 ? 'subtle' : 'filled';

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState('');
  const [dbError, setDbError] = useState<JSX.Element | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.email);
      } catch (err) {
        if (err instanceof Error) {
          if (err) setDbError(<Trans i18nKey={'formError.dbError'} />);
          navigate('/');
          logout();
        }
        setTimeout(() => {
          setDbError(null);
        }, 3000);
      }
    };
    if (loading) return;
    if (!user) return navigate('/');
    getUser();
  }, [user, loading, navigate]);

  return (
    <>
      <div className={classes.home}>
        {currentPage !== '/' && (
          <Box component={Link} to="/">
            <Button
              variant={buttonType}
              color="#4090bf"
              leftIcon={
                <IconHome2 size={25} color={scroll === 0 ? '#4090bf' : '#fff'} strokeWidth={1} />
              }
              onClick={close}
            >
              <Trans i18nKey="header.home" />
            </Button>
          </Box>
        )}
      </div>

      <Flex justify={'flex-start'} gap={10} wrap={'wrap'}>
        {user !== null ? (
          <Logout
            buttonType={buttonType}
            name={name}
            error={error}
            errorDB={dbError}
            loading={loading}
            close={close}
          />
        ) : (
          <AuthBtns {...{ buttonType, currentPage, close }}></AuthBtns>
        )}

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
            onLabel={
              <IconSunHigh
                color={'#fcfc03'}
                size="1.25rem"
                stroke={1.5}
                style={{ cursor: 'pointer' }}
              />
            }
            offLabel={<IconMoon size="1.25rem" stroke={1.5} style={{ cursor: 'pointer' }} />}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default Menu;
