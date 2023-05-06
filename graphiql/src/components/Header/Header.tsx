import { Button } from '@mantine/core';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Header = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  return (
    <header>
      <h1>GraphiQL</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <Trans i18nKey="welcome__link"></Trans>
            </Link>
          </li>
          <li>
            <Link to="/graphi">Graphi</Link>
          </li>
        </ul>
      </nav>
      <Button color="lime" radius="md" onClick={() => changeLanguage('en')}>
        English
      </Button>
      <Button color="lime" radius="md" onClick={() => changeLanguage('ru')}>
        Русский
      </Button>
    </header>
  );
};

export default Header;
