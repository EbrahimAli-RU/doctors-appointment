import React, { useState, useEffect } from "react";
import Navigation from "../layout/Navigation";
import { CALENDAR_ID, GOOGLE_API_KEY } from "../config";
import Patient from "../component/Patient";
import { useSelector } from "react-redux";

const DashBoard = () => {
  const { role, email, events, accessRole } = useSelector(
    (state) => state.auth
  );
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ error: false, message: "" });
  let gapi = window.gapi;

  const getEvents = () => {
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
          const events = res.result.items.filter(
            (event) => event.creator.email === email
          );
          setEvent(events);
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
    if (role === "patient") {
      const event = events;
      setEvent(event);
      setLoading(false);
    } else {
      getEvents();
    }
  }, []);

  function deleteEvent(event_id, i) {
    gapi.client.load("calendar", "v3", function () {
      var request = gapi.client.calendar.events.delete({
        calendarId: CALENDAR_ID,
        eventId: event_id,
      });
      request.execute(function (response) {
        if (response.error || response === false) {
          alert("Error");
        } else {
          alert("Success");
          const copyEvent = [...event];
          copyEvent.splice(i, 1);
          setEvent(copyEvent);
        }
      });
    });
  }

  return (
    <>
      <Navigation />
      {role === "doctor" && (
        <Patient
          loading={loading}
          event={event}
          deleteEvent={deleteEvent}
          show
          secondCheck={
            accessRole === "writer" || accessRole === "owner" ? true : false
          }
          title="Upcoming Appoinment For Today"
          notFound={
            accessRole === "writer" || accessRole === "owner"
              ? "No Appointment are scheduled for Today."
              : "We will process your account.please stay with us."
          }
        />
      )}
      {role === "patient" && (
        <div style={{ marginTop: "7rem" }}>
          <Patient
            loading={loading}
            event={event}
            deleteEvent={deleteEvent}
            title="Upcoming Appoinment"
            notFound="No Appointment are scheduled."
          />
        </div>
      )}
    </>
  );
};

export default DashBoard;
