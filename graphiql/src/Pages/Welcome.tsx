import { Trans } from 'react-i18next';
import { Box, Button, Flex, MantineTheme, createStyles } from '@mantine/core';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme: MantineTheme) => ({
  box: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    margin: '0 auto',
    padding: '10px',
    borderRadius: '10px',
  },
}));

const Welcome = () => {
  const { classes } = useStyles();

  return (
    <Flex direction={'column'} gap={15}>
      <Box className={classes.box} w={'85%'}>
        <h1>
          <Trans i18nKey="welcome.h1" />
        </h1>
        <p>
          <Trans i18nKey="welcome.p1" />
        </p>
        <Flex justify={'center'}>
          {/* !добавить условный рендоринг */}
          <Box component={Link} to={'/graphi'}>
            <Button variant="gradient" gradient={{ from: 'orange', to: 'red' }} size="xl">
              <Trans i18nKey="welcome.start" />
            </Button>
          </Box>
        </Flex>
      </Box>
      <Box className={classes.box} w={'85%'}>
        <h2>
          <Trans i18nKey="welcome.h2" />
        </h2>
        <ol>
          <li>
            <Trans i18nKey="welcome.li1" />
          </li>
          <li>
            <Trans i18nKey="welcome.li2" />
          </li>
          <li>
            <Trans i18nKey="welcome.li3" />
          </li>
          <li>
            <Trans i18nKey="welcome.li4" />
          </li>
          <li>
            <Trans i18nKey="welcome.li5" />
          </li>
        </ol>
      </Box>
      <Box className={classes.box} w={'85%'}>
        <p>
          <Trans i18nKey="welcome.p2" />
        </p>
      </Box>
    </Flex>
  );
};

export default Welcome;
