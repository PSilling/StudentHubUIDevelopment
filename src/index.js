import React from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
//import theme from '../assets/react-toolbox/theme';
import theme from './toolbox/theme';
import App from './App';
//import '../assets/react-toolbox/theme.css';
import './toolbox/theme.css';
import './index.css';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
