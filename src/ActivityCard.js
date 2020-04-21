import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ActivityCard = ({ activityLabel, activityDuration, id, date, contractorName, deleteCard }) => {
  const handleDelete = e => {
    deleteCard(id);
  };

if (activityDuration) {
  return (
      <div className="col m6 s12">
      <div>&nbsp;</div>
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <span className="badge badge-pill badge-dark">{activityLabel}</span>
          </div>
          <div className="card-text">

            <span className="badge badge-pill badge-light">Duration: {activityDuration} mins</span>
            <br/>
            <span className="badge badge-pill badge-light">Date: {date}</span>
            <br/>
            <span className="badge badge-pill badge-light">Added By: {contractorName}</span>
           </div>

          <button className="ml-2 mb-1 close" onClick={handleDelete}>
            X
          </button>
        </div>
      </div>
    </div>
  );} else {return (<button className="ml-2 mb-1 close" onClick={handleDelete}>{contractorName}</button>)}
};

ActivityCard.propTypes = {
  activityLabel: PropTypes.string,
  activityDuration: PropTypes.string,
  id: PropTypes.string,
  date: PropTypes.string,
  contractorName: PropTypes.string,
  deleteCard: PropTypes.func
};

export default ActivityCard;