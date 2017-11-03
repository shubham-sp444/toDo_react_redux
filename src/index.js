import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Main from './store'


console.log("THIS IS THE ROOT ELEMENT");
ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
