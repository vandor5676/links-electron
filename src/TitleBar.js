import './TitleBar.css';
import exit from './exit.svg';
import maximize from './maximize.svg';
import minimize from './minimize.svg';

function TitleBar() {
  return (
    <div className="TitleBar ">
        <div className="drag" id="BarP1"></div>
        <div className="drag" id="BarP2"></div>
        <div className="titleBarButton" id="BarMin"><img src={minimize} className="Icon filter-blue" alt="min" /></div>
        <div className="titleBarButton" id="BarMax"><img src={maximize} className="Icon filter-blue" alt="max" /></div>
        <div className="titleBarButton" id="BarExit"><img src={exit} className="Icon filter-blue" alt="exit" /></div>
    </div>
  );
}

export default TitleBar;
