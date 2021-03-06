import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TitleBar from './Elements/TitleBar';
import App from './Elements/App';
import reportWebVitals from './reportWebVitals';


const state = window.myAPI.getState()


ReactDOM.render(
  <React.StrictMode>
    <TitleBar/>
    <App state = {state} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
