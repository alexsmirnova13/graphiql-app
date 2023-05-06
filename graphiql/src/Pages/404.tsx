// import { useTranslation, Trans } from 'react-i18next';
const Welcome = () => {
  //   const { i18n } = useTranslation();
  //   const changeLanguage = (lng: string) => {
  //     i18n.changeLanguage(lng);
  //   };
  return (
    <div>
      <h1>404</h1>
      <div className="cloak__wrapper">
        +s
        <div className="cloak__container">
          <div className="cloak"></div>
        </div>
      </div>
      <div className="info">
        <h2>We can not find that page</h2>
        <p>
          We are fairly sure that page used to be here, but seems to have gone missing. We do
          apologise on it is behalf.
        </p>
        <a href="https://jhey.dev" target="_blank" rel="noreferrer noopener">
          Home
        </a>
      </div>
    </div>
  );
};

export default Welcome;
