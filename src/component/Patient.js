import React from "react";
import Spinner from "./Spinner";
import Card from "./Card";
import CreateButton from "./CreateButton";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Patient = (props) => {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formateDate = (date) => {
    let tmpDate = new Date(date).toLocaleString().split(",")[0];
    tmpDate = tmpDate.split("/");
    return `${tmpDate[1]} ${months[tmpDate[0] - 1]},${tmpDate[2]}`;
  };

  return (
    <div className="dashboard_container">
      {props.show && props.secondCheck && <CreateButton />}
      {props.loading && <Spinner />}
      {!props.loading && props.event.length === 0 && (
        <div className="dashboard_nothing_found">
          <h2>{props.notFound}</h2>
          {props.show && props.secondCheck && (
            <h5>To Create One click Create button.</h5>
          )}
        </div>
      )}
      {!props.loading && props.event.length > 0 && (
        <div className="dashboard_upcoming_app">
          <p className="dashboard_upcoming_app_title">{props.title}</p>
          <div className="dashboard_card_container">
            {props.event.map((el, i) => (
              <Card
                key={el.id}
                summary={el.summary}
                startTime={formatTime(el.start.dateTime)}
                endTime={formatTime(el.end.dateTime)}
                date={formateDate(el.start.dateTime)}
                view={el.htmlLink}
                id={el.id}
                deleteEvent={props.deleteEvent}
              >
                {props.show && (
                  <button
                    className="delete_btn"
                    onClick={() => props.deleteEvent(el.id, i)}
                  >
                    Delete
                  </button>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Patient;
