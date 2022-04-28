import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authHandler } from "../redux/auth";
import { useDispatch } from "react-redux";
import {
  CALENDAR_ID,
  CLIENT_ID,
  GOOGLE_API_KEY as API_KEY,
  DISCOVERY_DOCS,
  SCOPES,
} from "../config";
import BackSpinner from "../component/BackSpinner";

const HomePage = () => {
  const dispatch = useDispatch();
  const gapi = window.gapi;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const loginHandler = () => {
    gapi.auth2
      .getAuthInstance()
      .signIn()
      .then((res) => {
        localStorage.setItem("token", `${res.xc.access_token}`);
        localStorage.setItem("email", `${res.Lu.Bv}`);
        localStorage.setItem("role", "doctor");
        dispatch(authHandler({ email: res.Lu.Bv, role: "doctor" }));
        listUpcomingEvents(false, res.Lu.Bv, "doctor");
      });
  };

  function listUpcomingEvents(flag, email, role) {
    setLoading(true);
    gapi.client.calendar.events
      .list({
        calendarId: CALENDAR_ID,
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 40,
        orderBy: "startTime",
      })
      .then(function (response) {
        var events = response.result.items;
        localStorage.setItem("accessRole", response.result.accessRole);
        if (flag) {
          const filterEvent = [];
          events.forEach((element) => {
            if (element.hasOwnProperty("attendees")) {
              for (let i = 0; i < element.attendees.length; i++) {
                if (element.attendees[i].email === email) {
                  filterEvent.push(element);
                }
              }
            }
          });
          localStorage.setItem("events", JSON.stringify(filterEvent));
          dispatch(
            authHandler({
              email: email,
              role: role,
              events: filterEvent,
              accessRole: response.result.accessRole,
            })
          );
        } else {
          if (response.result.accessRole === "reader") {
            alert(`We will process you account. Please stay with Us.`);
          }
          localStorage.setItem("events", JSON.stringify([]));

          dispatch(
            authHandler({
              email: email,
              role: role,
              events: [],
              accessRole: response.result.accessRole,
            })
          );
        }
        setLoading(false);
        navigate("/dashboard");
      });
  }

  const patientLoginHandler = () => {
    gapi.auth2
      .getAuthInstance()
      .signIn()
      .then((res) => {
        localStorage.setItem("token", `${res.xc.access_token}`);
        localStorage.setItem("email", `${res.Lu.Bv}`);
        localStorage.setItem("role", "patient");
        dispatch(authHandler({ email: res.Lu.Bv, role: "patient" }));
        listUpcomingEvents(true, res.Lu.Bv, "patient");
      });
  };

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });
    });
  }, []);

  return (
    <>
      {loading && <BackSpinner />}
      <div className="home_wrapper">
        <div className="home_title_wrapper">
          <div className="home_title_div">
            <h1>Doctor Appoinment</h1>
          </div>
        </div>
        <div className="home_container">
          <p className="home_login">Login</p>
          <div className="home_info_container">
            <div className="home_info_div">
              <div className="home_info_div_content">
                <p className="home_info_div_title">For Doctor</p>
                <p>
                  Doctors all over the world are given the stature next to God.
                  It happens so mostly because they are lifesavers who work
                  tirelessly for mankind.
                </p>
                <div className="home_btn_div">
                  <button className="btn" onClick={loginHandler}>
                    Login
                  </button>
                </div>
              </div>
            </div>
            <div className="home_info_div">
              <div className="home_info_div_content">
                <p className="home_info_div_title">For Patient</p>
                <p>
                  Doctors all over the world are given the stature next to God.
                  It happens so mostly because they are lifesavers who work
                  tirelessly for mankind.
                </p>
                <div className="home_btn_div">
                  <button className="btn" onClick={patientLoginHandler}>
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="home_copyright_div">
            <p>Copyright © 2022 Doctor Appointment </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
