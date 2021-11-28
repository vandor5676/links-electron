import './TitleBar.css';
import exitSVG from './exit.svg';
import maximizeSVG from './maximize.svg';
import minimizeSVG from './minimize.svg';

// const { app, BrowserWindow } = require('electron');

function exit()
{
    window.close();
}

function TitleBar() {

  return (
    <div className="TitleBar ">
        <div className="drag" id="BarP1"></div>
        <div className="drag" id="BarP2"></div>
        <div className="titleBarButton" id="BarMin"><img src={minimizeSVG} className="Icon filter-blue" alt="min" /></div>
        <div className="titleBarButton" id="BarMax"><img src={maximizeSVG} className="Icon filter-blue" alt="max" /></div>
        <div onClick={exit} className="titleBarButton" id="BarExit"><img src={exitSVG} className="Icon filter-blue" alt="exit" /></div>
    </div>
  );
}

export default TitleBar;
