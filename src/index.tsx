import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Headerx from './components/Headerx';
import MobileManager from './modules/MobileManager';
import reportWebVitals from './reportWebVitals';
import 'primereact/resources/themes/lara-light-green/theme.css';  
import 'primereact/resources/primereact.min.css';         
import 'primeicons/primeicons.css';                      
import 'primeflex/primeflex.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Headerx />
    <MobileManager />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
