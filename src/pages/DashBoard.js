import React, { useState, useEffect } from "react";
import Navigation from "../layout/Navigation";
import { GOOGLE_API_KEY, CALENDAR_ID } from "../config";
// import moment from "moment";

const DashBoard = () => {
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ error: false, message: "" });

  const getEvents = () => {
    let gapi = window.gapi;
    const cb = () => {
      var endofDay = new Date();
      endofDay.setHours(23, 59, 59, 999);
      gapi.client
        .init({
          apiKey: GOOGLE_API_KEY,
        })
        .then(function () {
          return gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?maxResults=11&orderBy=updated&timeMin=${new Date(
              Date.now()
            ).toISOString()}&timeMax=${endofDay.toISOString()}`,
          });
        })
        .then((res) => {
          setEvent(res.result.items);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError({ error: true, message: "Bad Request" });
        });
    };

    gapi.load("client", cb);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <Navigation />
      <div>
        {loading && <p>Loading...</p>}
        {!loading && event.length === 0 && <p>Nothing Palned</p>}
        {!loading &&
          event.length > 0 &&
          event.map((el) => (
            <React.Fragment key={el.id}>
              {" "}
              <p>{el.summary}</p>{" "}
              <a href={`${el.htmlLink}`} rel="noreferrer" target="_blank">
                LINK
              </a>{" "}
            </React.Fragment>
          ))}
      </div>
      <a
        href="https://calendar.google.com/calendar?cid=c3FtMnVkaTFhZGY2ZHM3Z2o5aDgxdHVldDhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ"
        target="_blank"
        rel="noreferrer"
      >
        +
      </a>
    </>
  );
};

export default DashBoard;
