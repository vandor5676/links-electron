import logo from '../svg/logo.svg';
import drawerFolder from '../svg/drawerFolder.svg';
// shape for the top and bottom of the drawer
import drawerStylisticShape from '../Images/Polygon.png';
import './App.css';
import { useState } from 'react';


function App() {

  const toggleSelected = index=>
  {
    let copy= [...drawerItems.drawerItems]
    copy.forEach(element => {
      element.selected=false
    });
    copy[index].selected = true
    setDrawerItems({drawerItems:copy})
  }

  const [drawerItems, setDrawerItems] = useState({
    drawerItems:
      [
        { id: 0, name: "Links", icon: drawerFolder ,selected: true  },
        { id: 1, name: "Explorer", icon: drawerFolder ,selected: false},
        { id: 2, name: "Images", icon: drawerFolder ,selected: false},
      ]
  })
  return (
    <div className="App">
      
      <div className="Drawer">
      <img className="DrawerTopShape" src={drawerStylisticShape} alt=""/>
      <div className="top-spacer"> </div>
      {/* <div className="DrawerBottomShape"></div> */}


        {/* populate Drawer */}
        { drawerItems.drawerItems.map((item)=>{
          return  <div key={item.id} onClick={()=>toggleSelected(item.id)} className={item.selected?"drawerItemWrapperSelected": "drawerItemWrapper" }>
            <img src={item.icon} className={item.selected?"drawerIconSelected": "drawerIcon" } alt="logo" /> 
            <div  className="drawerItemText">{`${item.name}`}</div>
            </div>
        })}
        <img className="drawer-bottom-shape" src={drawerStylisticShape} alt=""/>
      </div>
      <header className="app-body">
        <img src={logo} className="App-logo drag" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
