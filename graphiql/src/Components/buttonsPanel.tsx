import { useEffect, useState } from 'react';
import './buttonsPanel.scss';

export interface IButtonsPanelProps {
  onButtonClick: (bool: boolean) => void;
}

const ButtonsPanel = ({ onButtonClick }: IButtonsPanelProps) => {
  const [panelStatus, setPanelStatus] = useState(false);
  const openDocs = () => {
    panelStatus === false ? setPanelStatus(true) : setPanelStatus(false);
  };
  useEffect(() => {
    onButtonClick(panelStatus);
  }, [panelStatus, onButtonClick]);
  return (
    <div className="buttonsPannel">
      <button onClick={openDocs}>туть</button>
      <button>сють</button>
    </div>
  );
};

export default ButtonsPanel;
