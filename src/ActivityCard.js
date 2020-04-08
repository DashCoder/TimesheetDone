import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ActivityCard = ({ activityLabel, activityDuration, id, date, deleteCard }) => {
  const handleDelete = e => {
    deleteCard(id);
  };

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
          </div>

          <button className="ml-2 mb-1 close" onClick={handleDelete}>
            X
          </button>
        </div>
      </div>
    </div>



  );
};

ActivityCard.propTypes = {
  activityLabel: PropTypes.string,
  activityDuration: PropTypes.string,
  id: PropTypes.string,
  date: PropTypes.string,
  deleteCard: PropTypes.func
};

export default ActivityCard;