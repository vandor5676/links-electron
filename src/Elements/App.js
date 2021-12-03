import logo from '../svg/logo.svg';
import drawerFolder from '../svg/drawerFolder.svg';
import './App.css';
import { useState } from 'react';



function App() {

  const [drawerItems, setdrawerItems] = useState({
    drawerItems:
      [
        { id: 1, name: "Links", icon: drawerFolder ,selected: true  },
        { id: 2, name: "Explorer", icon: drawerFolder ,selected: false},
        { id: 3, name: "Images", icon: drawerFolder ,selected: false},
      ]
  })
  return (
    <div className="App">
      
      <div className="Drawer">
        {drawerItems.drawerItems.map((item)=>{
          return  <div className={item.selected?"drawerItemWrapperSelected": "drawerItemWrapper" }>
            <img src={item.icon} className="drawerIcon" alt="logo" /> 
            <div  className="drawerItemText">{`${item.name}`}</div>
            </div>
        })}
      </div>
      <header className="App-header">
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
