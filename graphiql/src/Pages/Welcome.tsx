
import { Trans } from 'react-i18next';
import { useTranslation, Trans } from 'react-i18next';
import { Button } from '@mantine/core';
import './../styles.scss';

const Welcome = () => {
  return (
    <div>
      <Trans i18nKey="welcome"></Trans>
      <h1> ALO ЁPTA</h1>
      <Trans i18nKey="welcome">Welcome to my app!</Trans>
      <Button color="lime" radius="md" onClick={() => changeLanguage('en')}>
        English
      </Button>
      <Button color="lime" radius="md" onClick={() => changeLanguage('ru')}>
        Русский
      </Button>
    </div>
  );
};

export default Welcome;
