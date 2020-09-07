import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { RoutesState } from './context/RoutesContext';

ReactDOM.render(
  <RoutesState>
    <App />
  </RoutesState>,
  document.getElementById('root')
);
