import logo from '../svg/logo.svg';
import drawerFolder from '../svg/drawerFolder.svg';
// shape for the top and bottom of the drawer
import explorerIcon from '../Images/explorerIcon.png';
import drawerStylisticShape from '../Images/Polygon.png';
import './App.css';
import { useState, useEffect, componentDidMount } from 'react';

const myEvent = new Event('build');
//event listener for dropping a file


document.addEventListener('build', function (e) { alert("my listener") }, false);

function App(props) {
  console.log("App Page Loaded")

  //set up listeners that run once 
  useEffect(() => {
    document.addEventListener('drop', (event) => {
      event.preventDefault();
      event.stopPropagation();
      for (const f of event.dataTransfer.files) {
        // Using the path attribute to get absolute file path
        addItem(f.path)
      }

      window.addEventListener('contextmenu', (e) => {
        alert("contextmenu event!")
        e.preventDefault()
        window.myAPI.showContextMenu('showContextMenu')
      })

    });
  }, [])

  //adds new item to state and saves it locally
  function addItem(item) {
    //escape the slashes
    item = item.replace("\\", "\\\\")
    const name = item.substring(item.lastIndexOf("\\") + 1, item.length)
    const id = state.drawerItems[selectedDrawerItem].items.length
    state.drawerItems[selectedDrawerItem].items.push({ id: id, name: name, icon: 'explorerIcon', path: item, })
    setState({ drawerItems: state.drawerItems })
    window.myAPI.saveState(state.drawerItems)
  }
  //removes new item to state and saves it locally
  function removeItem(index) {

  }

  // used to select different drawer items
  const toggleSelected = index => {
    let copy = state.drawerItems
    copy.forEach(element => {
      element.selected = false
    });
    copy[index].selected = true
    setSelectedDrawerItem(copy[index])
    setState({ drawerItems: copy })
  }

  // hook for all the items that can be displayed (drawer items and main items)
  const [state, setState] = useState(
    { drawerItems: props.drawerItems }
  )
  const [selectedDrawerItem, setSelectedDrawerItem] = useState(0)

  // const [listItems, setlistItems] = useState({
  //   listItems:
  //     [
  //       { id: 0, name: "drw", icon: explorerIcon, selected: true },
  //       { id: 1, name: "PSs", icon: explorerIcon, selected: false },
  //       { id: 2, name: "ImageFiles5.0", icon: explorerIcon, selected: false },
  //     ]
  // })

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
        {state.drawerItems.map((item) => {
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

          {populateMainItems(state)}
        </div>

        <input id="dropInput" type="file" id="fileElem" multiple accept="image/*" class="visually-hidden"></input>
        <label for="fileElem">Select some files</label>

      </header>
    </div>
  );

  function populateMainItems(state) {
    //find selected //use some?
    let selectedIndex;
    state.drawerItems.forEach(element => {
      if (element.selected === true) {
        selectedIndex = element.id
      }
    });
    // return items
    return state.drawerItems[selectedIndex].items.map((item) => {
      return <div>
        <div className="list-item" onClick={() => window.myAPI.openFolder(item.path)}>
          <img className="list-icon" src={getIcon(item.icon)} alt="Folder Icon" ></img>
          <div className="list-name"> {item.name}</div>
        </div>
        <div className="divider-wrapper">
          <div className="list-divider"></div>
        </div>
      </div>
    })
  }


}

export default App;
