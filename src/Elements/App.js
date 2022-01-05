import logo from '../svg/logo.svg';
import drawerFolder from '../svg/drawerFolder.svg';
// shape for the top and bottom of the drawer
import explorerIcon from '../Images/explorerIcon50px.png';
import drawerStylisticShape from '../Images/Polygon.png';
import './App.css';
import './Menu.css';
import Menu from "./Menu";
import { useState, useEffect, useRef } from 'react';

function App(props) {
  console.log("App Page Loaded")
  let selectedMainContentItemID


  //set up listeners that run once 
  useEffect(() => {
    document.addEventListener('drop', (event) => {
      event.preventDefault();
      event.stopPropagation();
      for (const f of event.dataTransfer.files) {
        // Using the path attribute to get absolute file path
        addItem(f.path)
      }

    });
    window.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      //alert(window.myAPI.showContextMenu('showContextMenu'))
    })

    //drag enter leave over used for dragging in a file to the main content area
    listWrapper.current.addEventListener('dragenter', (e) => {
      e.preventDefault()
      console.log(`dragenter`)
    })
    listWrapper.current.addEventListener('dragleave', (e) => {
      e.preventDefault()
      console.log(`dragleave`)
    })
    listWrapper.current.addEventListener('dragover', (e) => {
      e.preventDefault()
      console.log(`dragover`)
    })

  }, [])

  //used to access listWrapper in the on mount lifecycle event 
  const listWrapper = useRef(null)

  //adds new item to state and saves state locally
  function addItem(item) {
    item = item.replace("\\", "\\\\")//escape the slashes
    const name = item.substring(item.lastIndexOf("\\") + 1, item.length)
    const id = Date.now()

    state.drawerItems[selectedDrawerItem].items.push({ id: id, name: name, icon: 'explorerIcon', path: item, })
    setState({ drawerItems: state.drawerItems })
    window.myAPI.saveState(state.drawerItems)
  }
  //removes item in state and saves state locally
  function removeItem() {
    const index = state.drawerItems[selectedDrawerItem].items.findIndex(x => x.id === selectedMainContentItemID);
    state.drawerItems[selectedDrawerItem].items.splice(index, 1)
    setState({ drawerItems: state.drawerItems })
    window.myAPI.saveState(state.drawerItems)
    selectedMainContentItemID = null;
  }



  // used to select different drawer items
  const toggleSelected = index => {
    let state = window.myAPI.getOpenExplorers()
    let copy = state.drawerItems
    copy.forEach(element => {
      element.selected = false
    });
    copy[index].selected = true
    setSelectedDrawerItem(index)
    setState({ drawerItems: copy })
  }

  // hook for all the items that can be displayed (drawer items and main items)
  const [state, setState] = useState(
    { drawerItems: props.drawerItems }
  )
  const [selectedDrawerItem, setSelectedDrawerItem] = useState(0)



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
    <div className="App" id='app'>
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
        <div className="list-wrapper-relative" >
          <div className="list-wrapper" ref={listWrapper}>
            {populateMainItems(state)}
          </div>
        </div>

      </header>
      <Menu state={state} removeItem={removeItem} />
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
    // return main content items
    return state.drawerItems[selectedIndex].items.map((item) => {
      return <div id={`MainContentItem${item.id}`} key={item.id} >
        <div className="list-item" onContextMenu={() => { selectedMainContentItemID = item.id }} onClick={() => window.myAPI.openFolder(item.path)}>
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
