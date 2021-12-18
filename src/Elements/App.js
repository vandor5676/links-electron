import logo from '../svg/logo.svg';
import drawerFolder from '../svg/drawerFolder.svg';
// shape for the top and bottom of the drawer
import explorerIcon from '../Images/explorerIcon.png';
import drawerStylisticShape from '../Images/Polygon.png';
import './App.css';
import { useState, useEffect } from 'react';

function App(props) {
  console.log("App Page Loaded")

  const toggleSelected = index => {
    let copy = drawerItems.drawerItems
    copy.forEach(element => {
      element.selected = false
    });
    copy[index].selected = true
    setDrawerItems({drawerItems: copy})

  }

  const [drawerItems, setDrawerItems] = useState(
    {drawerItems: props.drawerItems}
  )
  const [listItems, setlistItems] = useState({
    listItems:
      [
        { id: 0, name: "drw", icon: explorerIcon, selected: true },
        { id: 1, name: "PSs", icon: explorerIcon, selected: false },
        { id: 2, name: "ImageFiles5.0", icon: explorerIcon, selected: false },
      ]
  })

  //returns an icon because i cant use the import inside the json file that the prop is populated with
  function getIcon(icon) {
    switch (icon) {
      case "drawerFolder":
        return drawerFolder
      case "explorerIcon":
        return explorerIcon

      default:
        return drawerFolder

    }

  }


  return (
    <div className="App">

      <div className="Drawer">
        <img className="DrawerTopShape" src={drawerStylisticShape} alt="" />
        <div className="top-spacer"> </div>

        {/* populate Drawer */}
        {drawerItems.drawerItems.map((item) => {
          return <div key={item.id} onClick={() => toggleSelected(item.id)} className={item.selected ? "drawerItemWrapperSelected" : "drawerItemWrapper"}>
            <img src={getIcon(item.icon)} className={item.selected ? "drawerIconSelected" : "drawerIcon"} alt="logo" />
            <div className="drawerItemText">{`${item.name}`}</div>
          </div>
        })}
        <img className="drawer-bottom-shape" src={drawerStylisticShape} alt="" />
      </div>
      <header className="app-body">
        {/* populate app body content */}
        <div className="list-wrapper">

          {populateMainItems(drawerItems)}
        </div>

      </header>
    </div>
  );

  function populateMainItems(state)
  {
    //find selected //use some?
    let selectedIndex;
    state.drawerItems.forEach(element => {
      if (element.selected === true)
      {
      selectedIndex = element.id
      }
    });
    // return items
    return state.drawerItems[selectedIndex].items.map((item) => {
      return <div>
        <div className="list-item">
          <img className="list-icon" src={getIcon(item.icon)} alt="Folder Icon" ></img>
          <div className="list-name"> {item.name}</div>
        </div>
        <div className="list-divider"></div>
      </div>
    })
  }
}

export default App;
