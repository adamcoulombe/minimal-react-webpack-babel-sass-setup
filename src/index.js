import React from 'react';
import ReactDOM from 'react-dom';
import styles from './sass/styles.scss';

const title = 'My Minamal React Webpack Babel Setup';

ReactDOM.render(
  <div>{title}</div>,
  document.getElementById('app')
);

module.hot.accept();