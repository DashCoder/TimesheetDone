/* Decription: Main timesheet app with facial recognition */
/* Future improvements: Nested list. Multiple users have multiple timesheet data */

import React, { useState, useEffect } from 'react'; 
import { observer } from "mobx-react";
import logo from './hourglass-personaluseok.png';
import ActivityForm from './ActivityForm'
import ActivityCard from './ActivityCard'
import IdentityForm from './IdentifyUser'
import UserSelectForm from './UserSelectForm'
import Stopwatch from './Stopwatch'
import './App.css';
const uuidv1 = require('uuid/v4');

const App = observer(props => {

  const appState = props.appState;
  let initialState = () => JSON.parse(localStorage.getItem('timesheetdata')) || [];
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  /* Adding of new timesheet row(s) */
  const handleChange = val => {
    val.id = uuidv1();
    val.contractorName = appState.userName;
    let newVal = [...state, val];
    setState(newVal);
  };

  const handleChangeUser = val => {
    appState.userName = val.contractorName;
  };
 
  const idChangeHandler = (val) => {
    /* alert('Facial recognition for ' + JSON.stringify(val) ); */
    appState.userName = val;
  };

  const handleDelete = id => {
    localStorage.setItem('lastState', JSON.stringify(state));
    let newState = state.filter(i => {
      return i.id !== id;
    });
    setState(newState);
  };

  /* Every time rendered with state changed, update e.g. graph data */
  useEffect(() => {

    localStorage.setItem('timesheetdata', JSON.stringify(state));
    
    let summaryTotal = 0;
    state.forEach((item) => {
       summaryTotal += parseInt(item.activityDuration)/60;
       item.activityTotal = summaryTotal; // Set to total
    });

    /* Iterate through all and do transformations */
    const contractorName = state.map(obj => obj.contractorName);
    const date = state.map(obj => obj.date.toLocaleString());
    const activityLabel = state.map(obj => obj.activityLabel);
    const activityDuration = state.map(obj => obj.activityTotal); 
    let newData = { date, activityLabel, activityDuration, contractorName};
    setData(newData);

  }, [state]);

  /* Every time component mounted/unmounted */
  useEffect(() => {
     console.log('start component');
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <IdentityForm idChangeHandler={idChangeHandler} appState={appState} />
        
        <UserSelectForm appState={appState} />
        <Stopwatch change={handleChange} />
  
        <p>
         Remember! Camera identification works best with Firefox.
        </p>
         
        <ActivityForm change={handleChange} appState={appState} />

        <div className='row TileBox'>
            {state.length > 0 ? (
                <>
                  {state.map(info => (
                    <ActivityCard
                      activityLabel={info.activityLabel}
                      activityDuration={info.activityDuration}
                      id={info.id}
                      date={info.date}
                      contractorName={info.contractorName}
                      deleteCard={handleDelete}
                    />
                  ))}
                </>
              ) : (
                <div className='center white-text'>No data found</div>
              )}
            </div>

        <a
          className="App-link"
          href="https://github.com/DashCoder/TimesheetDone"
          target="_blank"
          rel="noopener noreferrer"
        >
          Link to GitLab Project 
        </a>

      </header>
    </div>
  );
}); /* observer ends here */

export default App;
