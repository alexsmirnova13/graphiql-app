import { Header, Image, createStyles, Flex, Burger, Drawer } from '@mantine/core';
import logo from '../../assets/svg/logo.svg';
import { useDisclosure } from '@mantine/hooks';
import Menu from './Menu';

const useStyles = createStyles({
  hiddenDesktop: {
    ['@media (min-width: 601px)']: {
      display: 'none',
    },
  },
  hiddenMobile: {
    flex: '1',
    ['@media (max-width: 600px)']: {
      display: 'none',
    },
  },
});

const AppHeader = () => {
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Header height={60} fixed={true} zIndex={2}>
      <Flex justify={'space-between'} align={'center'} px={10} gap={10}>
        <Image width={150} height={60} src={logo} />
        <Flex className={classes.hiddenMobile} justify={'space-between'} align={'center'}>
          <Menu />
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
