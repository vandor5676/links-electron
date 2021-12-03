import './TitleBar.css';
import exitSVG from '../svg/exit.svg';
import maximizeSVG from '../svg/maximize.svg';
import minimizeSVG from '../svg/minimize.svg';

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
        <div onClick={()=>window.myAPI.minimize()} className="titleBarButton" id="BarMin"><img src={minimizeSVG} className="Icon filter-blue" alt="min" /></div>
        <div onClick={()=>window.myAPI.maximize()} className="titleBarButton" id="BarMax"><img src={maximizeSVG} className="Icon filter-blue" alt="max" /></div>
        <div onClick={()=>window.close()} className="titleBarButton" id="BarExit"><img src={exitSVG} className="Icon filter-blue" alt="exit" /></div>
    </div>
  );
}

export default TitleBar;
