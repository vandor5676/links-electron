import logo from '../svg/logo.svg';
import drawerFolder from '../svg/drawerFolder.svg';
// shape for the top and bottom of the drawer
import explorerIcon from '../Images/explorerIcon.png';
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
      ],
      listItems:
      [
        { id: 0, name: "drw", icon: explorerIcon ,selected: true  },
        { id: 1, name: "PSs", icon: explorerIcon ,selected: false},
        { id: 2, name: "ImageFiles5.0", icon: explorerIcon ,selected: false},
      ]
  })
  const [listItems, setlistItems] = useState({
    listItems:
      [
        { id: 0, name: "drw", icon: explorerIcon ,selected: true  },
        { id: 1, name: "PSs", icon: explorerIcon ,selected: false},
        { id: 2, name: "ImageFiles5.0", icon: explorerIcon ,selected: false},
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
        {/* populate app body content */}
        <div className = "list-wrapper">

        { listItems.listItems.map((item)=>{
          return  <div>
          <div className="list-item">
          <img className = "list-icon" src ={item.icon} alt="Folder Icon" ></img>
            <div className = "list-name"> {item.name}</div>          
          </div>
          <div className = "list-divider"></div>
          </div>
        })}
        </div>
      
      </header>
    </div>
  );
}

export default App;
