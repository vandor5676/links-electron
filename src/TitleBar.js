import './TitleBar.css';
import exit from './exit.svg';

function TitleBar() {
  return (
    <div className="TitleBar drag">
        <div id="BarP1"></div>
        <div id="BarP2"></div>
        <div className="titleBarButton" id="BarMin"></div>
        <div className="titleBarButton" id="BarMax"></div>
        <div className="titleBarButton" id="BarExit"><img src={exit} className="Icon filter-green" alt="exit" /></div>
    </div>
  );
}

export default TitleBar;
