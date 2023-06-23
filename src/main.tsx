import React from 'react';
import { Provider } from 'react-redux/es/exports';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import store from './store/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
