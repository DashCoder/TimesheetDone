import React, { useState } from 'react';
import './App.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { observer } from "mobx-react";

/* Listen to changes in parent props */
const ActivityForm = observer(({ change, appState }) => {
	const date = new Date().toLocaleString(); 
  	
	const [state, setState] = useState({
		activityLabel: 'Software Dev & Consultancy',
		activityDuration: '60',
		date: date
	});

	const handleChange = e => {
		if (e.target.value > 999) {
			e.target.value = 999;
		}
		const date = new Date().toLocaleString(); 
	
		setState({
			...state,
			[e.target.name]: e.target.value,
			date
		});
	};

	const handleChangeText = e => {
		const date = new Date().toLocaleString(); 
	
	 	setState({
			...state,
			[e.target.name]: e.target.value,
			date
		});
	};

	const handleSubmit = () => {
	    const date = new Date().toLocaleString(); 
	 	/* Update date upon submission also for case when no other changes are made */
	 	setState({
			...state,
			date
		});

	    change(state); 
	};

	return (
		<>
			<div className="row">
				<div className="col m3 s6">
					<label htmlFor="activityLabel">Activity Name:</label>
					<br/>
					<input
						id="activityLabel"
						name="activityLabel"
						type="text"
						value={state.activityLabel}
						onChange={handleChangeText}
					    size="40"
					/>
				</div>
				<div className="col m3 s6">
					<label htmlFor="activityDuration">Duration (in mins) : </label>
					<br/>
					<input
						id="activityDuration"
						name="activityDuration"
						type="number"
						min="1"
						max="600"
						placeholder="60"
						value={state.activityDuration}
						onChange={handleChange}
					/>
				</div>
			</div>

			<hr/>

			<div className="col m6 s12">
				<button
					id="activity-btn"
					className="btn btn-secondary pull-left"
					type="button"
					onClick={handleSubmit}
				>
					Generate Timesheet for {appState.userName} 
				</button>&nbsp;
				<button
					id="activity-btn"
					className="btn btn-primary pull-right"
					type="button"
					onClick={handleSubmit}
				>
					Add activity
				</button>
			</div>
		</>
	);
}); /* Observer rerender then appState changes */
ActivityForm.propTypes = {
	change: PropTypes.func.isRequired,
	appState: PropTypes.object
};
export default ActivityForm;