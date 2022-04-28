import React, { useEffect } from "react";
import { GOOGLE_API_KEY, CLIENT_ID, DISCOVERY_DOCS, SCOPES } from "../config";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const gapi = window.gapi;

  const logoutHandler = () => {
    gapi.auth2
      .getAuthInstance()
      .signOut()
      .then((res) => {
        navigate("/");
        localStorage.clear();
      });
  };

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        apiKey: GOOGLE_API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });
    });
  }, []);
  return (
    <nav className="nav_container">
      <div className="nav_logo_container">
        <p className="nav_logo">LOGO</p>
      </div>
      <div className="nav_logout_container">
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </nav>
  );
};

export default Navigation;
