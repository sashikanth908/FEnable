import React from 'react';
import ReactDom from 'react-dom';
import App from '../src/javascripts/App';

document.addEventListener('DOMContentLoaded', () => {
  ReactDom.render(
    <App />,
    document.getElementById('main-content'),
  );
});
