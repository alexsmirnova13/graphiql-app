import { Trans } from 'react-i18next';
import './404Styles.scss';
import { Link } from 'react-router-dom';
const Page404 = () => {
  return (
    <div className="body404">
      <h1 className="h1404">404</h1>
      <div className="cloak__wrapper">
        <div className="cloak__container">
          <div className="cloak"></div>
        </div>
      </div>
      <div className="info">
        <h2 className="info__mainInfo">
          <Trans i18nKey="page404.h2" />
        </h2>
        <p className="info__text">
          <Trans i18nKey="page404.p" />
        </p>
        <Link to="/">
          <button className="info__link">
            <Trans i18nKey="page404.button">Home</Trans>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Page404;
