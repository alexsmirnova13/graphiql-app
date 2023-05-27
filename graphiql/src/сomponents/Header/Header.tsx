import { Header, Image, createStyles, Flex, Burger, Drawer, useMantineTheme } from '@mantine/core';
import logo from '../../assets/svg/logo.svg';
import { useDisclosure, useWindowScroll } from '@mantine/hooks';
import Menu from './Menu';

const useStyles = createStyles({
  hiddenDesktop: {
    ['@media (min-width: 669px)']: {
      display: 'none',
    },
  },
  hiddenMobile: {
    flex: '1',
    ['@media (max-width: 668px)']: {
      display: 'none',
    },
  },
});

const AppHeader = () => {
  const theme = useMantineTheme();
  const [scroll] = useWindowScroll();
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);

  const hederStyles =
    scroll.y === 0
      ? {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        }
      : { borderBottom: 0 };

  return (
    <Header height={60} fixed={true} zIndex={2} sx={{ ...hederStyles }}>
      <Flex justify={'space-between'} align={'center'} px={10} gap={10}>
        <Image width={150} height={60} src={logo} />
        <Flex className={classes.hiddenMobile} justify={'space-between'} align={'center'}>
          <Menu scroll={scroll.y} />
        </Flex>
        <Burger opened={opened} onClick={open} className={classes.hiddenDesktop} />
      </Flex>

      <Drawer.Root opened={opened} onClose={close} size="100%">
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>
              <Image width={200} height={60} src={logo} />
            </Drawer.Title>
            <Drawer.CloseButton />
          </Drawer.Header>
          <Drawer.Body>
            <Flex direction={'column-reverse'} gap={15}>
              <Menu close={close} />
            </Flex>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </Header>
  );
};
export default AppHeader;
