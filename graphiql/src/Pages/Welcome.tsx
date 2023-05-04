import { useTranslation, Trans } from 'react-i18next';
import { Button } from '@mantine/core';

const Welcome = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div>
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
