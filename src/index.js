import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import './styles/main.scss';
import './i18n';
import '@fortawesome/fontawesome-free/css/all.css';

import { StoreProvider } from './store';
import { authReducer } from './reducers/authReducer';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider reducer={authReducer}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
