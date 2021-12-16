import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TitleBar from './Elements/TitleBar';
import App from './Elements/App';
import reportWebVitals from './reportWebVitals';
import drawerFolder from './svg/drawerFolder.svg';

const drawerItems = {
  drawerItems:
    [
      { id: 0, name: "Links", icon: drawerFolder, selected: true },
        { id: 1, name: "Explorer", icon: drawerFolder, selected: false },
        { id: 2, name: "Images", icon: drawerFolder, selected: false },
    ]
}

ReactDOM.render(
  <React.StrictMode>
    <TitleBar/>
    <App drawerItems = {drawerItems} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
