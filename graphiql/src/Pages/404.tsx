// import { useTranslation, Trans } from 'react-i18next';
import './404Styles.scss';
const Welcome = () => {
  //   const { i18n } = useTranslation();
  //   const changeLanguage = (lng: string) => {
  //     i18n.changeLanguage(lng);
  //   };
  return (
    <div className="body404">
      <h1 className="h1404">404</h1>
      <div className="cloak__wrapper">
        <div className="cloak__container">
          <div className="cloak"></div>
        </div>
      </div>
      <div className="info">
        <h2 className="info__mainInfo">We can not find that page</h2>
        <p className="info__text">
          We are fairly sure that page used to be here, but seems to have gone missing. We do
          apologise on it is behalf.
        </p>
        <a className="info__link" href="https://jhey.dev" target="_blank" rel="noreferrer noopener">
          Home
        </a>
      </div>
    </div>
  );
};

export default Welcome;
