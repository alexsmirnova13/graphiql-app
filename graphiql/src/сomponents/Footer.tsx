import { Flex, Box, useMantineTheme, createStyles, MantineTheme } from '@mantine/core';
import { ReactComponent as Logo } from '../assets/svg/rsLogo.svg';
import { IconBrandGithub } from '@tabler/icons-react';
import { Trans } from 'react-i18next';

const useStyles = createStyles((theme: MantineTheme) => ({
  border: {
    borderTop: `0.0625rem solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },
  link: {
    '&:hover': {
      scale: '1.1',
    },
    color: 'inherit',
    textDecoration: 'none',
    lineHeight: '1',
  },
  date: {
    alignSelf: 'flex-end',
  },
}));

const Footer = () => {
  const { classes } = useStyles();
  const year = new Date().getFullYear();
  const theme = useMantineTheme();
  const svgColor = theme.colorScheme === 'dark' ? '#C1C2C5' : 'black';

  return (
    <Flex align={'center'} justify={'space-around'} h={80} className={classes.border}>
      <Box component="a" href="https://rs.school/react/" target="_blank">
        <Logo height={50} fill={svgColor} className={classes.link} />
      </Box>
      <Box className={classes.date}>
        <b>{year}</b>
      </Box>
      <Flex>
        <IconBrandGithub strokeWidth={2} size={60} />
        <Flex direction={'column'} justify={'center'} w={85}>
          <a
            target="_blank"
            href="https://github.com/alexsmirnova13"
            rel="noreferrer"
            className={classes.link}
          >
            <Trans i18nKey={'footer.alex'} />
          </a>
          <a
            target="_blank"
            href="https://github.com/irynakolh "
            rel="noreferrer"
            className={classes.link}
          >
            <Trans i18nKey={'footer.ira'} />
          </a>
          <a
            target="_blank"
            href="https://github.com/AmdreiMash"
            rel="noreferrer"
            className={classes.link}
          >
            <Trans i18nKey={'footer.andrei'} />
          </a>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
