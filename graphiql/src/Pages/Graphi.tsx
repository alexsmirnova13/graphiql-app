import { useState } from 'react';
import ButtonsPanel from '../Components/buttonsPanel';
import DocsExplorer from '../Components/docsExplorer';
import RequestSection from '../Components/requestSection';
import ResultSection from '../Components/resultSection';
import './graphi.scss';

const Graphi = () => {
  const [isOpened, setIsOpened] = useState(false);
  const handleClick = (bool: boolean) => {
    setIsOpened(bool);
  };

  return (
    <div className="graphiContainer">
      <div className="graphiContainer__docs">
        <ButtonsPanel onButtonClick={handleClick} />
        {isOpened && <DocsExplorer />}
      </div>
      <div className="graphiContainer__reqResp">
        <RequestSection />
        <ResultSection />
      </div>
    </div>
  );
};

export default Graphi;
