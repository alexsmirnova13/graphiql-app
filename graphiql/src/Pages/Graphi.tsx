import ButtonsPanel from '../Components/buttonsPanel';
import DocsExplorer from '../Components/docsExplorer';
import RequestSection from '../Components/requestSection';
import ResultSection from '../Components/resultSection';
import './graphi.scss';

const Graphi = () => {
  return (
    <div className="graphiContainer">
      <ButtonsPanel />
      <DocsExplorer />
      <RequestSection />
      <ResultSection />
    </div>
  );
};

export default Graphi;
