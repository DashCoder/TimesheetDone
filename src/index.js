import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { observable, computed, action, decorate } from "mobx";
import { observer } from "mobx-react";
import './App.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const appState = observable({userName:'Demo', training: -1, people:['Mr Axel','Mr Stone','Yan Zuo','Show your face']});

/* Observer rerender when appState changes */
const DebugView = observer(props => <div className="alert alert-primary">User: {props.appState.userName} , Training: {props.appState.training}</div>);

ReactDOM.render(
  <React.StrictMode>
    <App appState={appState} />
    <DebugView appState={appState}/>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
