import React from "react";

const Card = (props) => {
  return (
    <div className="card_container">
      <div className="card_title_div">
        <p>{props.summary}</p>
      </div>
      <div className="card_time_div">
        <p className="card_time_div_start_time">
          {props.startTime} - {props.endTime}
        </p>
      </div>
      <p>{props.date}</p>
      <div className="card_view_div">
        {props.children}
        <a href={props.view} rel="noreferrer" target="_blank">
          View
        </a>
      </div>
    </div>
  );
};

export default Card;
