import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ThemeContext, { themes } from './contexts';

ReactDOM.render(
  <React.StrictMode>
    <ThemeContext.Provider value={themes.dark}>
      <App />
    </ThemeContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
