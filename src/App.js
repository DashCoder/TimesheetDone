import React, { useState, useEffect } from 'react'; 
import logo from './hourglass-personaluseok.png';
import './App.css';
import ActivityForm from './ActivityForm'
import ActivityCard from './ActivityCard'
import TimeSummary from './TimeSummary'
const uuidv1 = require('uuid/v4');


const App = () => {

  let initialState = () => JSON.parse(localStorage.getItem('timesheetdata')) || [];
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const handleChange = val => {
    val.id = uuidv1();
    let newVal = [...state, val];
    setState(newVal);
  };

  const handleDelete = id => {
    localStorage.setItem('lastState', JSON.stringify(state));
    let newState = state.filter(i => {
      return i.id !== id;
    });
    setState(newState);
  };

  // Every time rendered with state changed, update graph data
  useEffect(() => {
    localStorage.setItem('timesheetdata', JSON.stringify(state));
    
    let summaryTotal = 0;
    state.forEach((item) => {
       summaryTotal += parseInt(item.activityDuration)/60;
       item.activityTotal = summaryTotal; // Set to total
    });


    const date = state.map(obj => obj.date.toLocaleString());
    const activityLabel = state.map(obj => obj.activityLabel);
    const activityDuration = state.map(obj => obj.activityTotal); 
    let newData = { date, activityLabel, activityDuration };
    setData(newData);
  }, [state]);

  // Every time component mounted/unmounted
  useEffect(() => {
     console.log('start component');
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Remember! Add activities to timesheet every hour.
        </p>

   
        <ActivityForm change={handleChange} />

        <div className='row TileBox'>
            {state.length > 0 ? (
                <>
                  {state.map(info => (
                    <ActivityCard
                      activityLabel={info.activityLabel}
                      activityDuration={info.activityDuration}
                      id={info.id}
                      date={info.date}
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
          GitLab Project
        </a>
      </header>
    </div>
  );
}

export default App;
