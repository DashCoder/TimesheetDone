/* Description: Control panel for training models with 3 faces + no face */
/* Todo: Add lists or textbox to allow unlimited users/faces */

import React, { useState } from 'react';
import './App.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { observer } from "mobx-react";

/* Note: Observer - appState.training value changes controls busy/ready indicator */
const UserSelectForm =  observer(({ appState }) => {

	const mouseDown_User0 = () => {
      appState.training = 0;
      appState.userName = appState.people[appState.training];
	  const runID0 = setInterval(
	      () => {
            appState.training = -1;
	        },
	      3000
	    );
	 }

	const mouseDown_User1 = () => {
      appState.training = 1;
      appState.userName = appState.people[appState.training];
	  const runID1 = setInterval(
	      () => {
            appState.training = -1;
	        },
	      3000
	    );
	 }

	const mouseDown_User2 = () => {
      appState.training = 2;
      appState.userName = appState.people[appState.training];
	  const runID2 = setInterval(
	      () => {
            appState.training = -1;
	        },
	      3000
	    );
	 }

	const mouseDown_User3 = () => {
      appState.training = 3;
      appState.userName = appState.people[appState.training];
	  const runID3 = setInterval(
	      () => {
            appState.training = -1;
	        },
	      3000
	    );
	 }

	return (
      <div className="centerVideo">
        <strong>Register user by pressing on name and look into camera</strong>
        <br/>
        <button type="button" className="btn btn-secondary" onMouseDown={mouseDown_User0}>{appState.people[0]}</button>
        <button type="button" className="btn btn-dark" onMouseDown={mouseDown_User1}>{appState.people[1]}</button>
        <button type="button" className="btn btn-secondary" onMouseDown={mouseDown_User2}>{appState.people[2]}</button>
        <button type="button" className="btn btn-dark" onMouseDown={mouseDown_User3}>{appState.people[3]}</button>
        <p>&nbsp;{appState.training < 0 ? "" : "Please wait..."}</p>
      </div>
	);
});
UserSelectForm.propTypes = {
	appState: PropTypes.object
};
export default UserSelectForm;