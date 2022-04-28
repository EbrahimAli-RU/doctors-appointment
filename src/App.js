import React, { useLayoutEffect, useEffect, useState } from "react";
import "./assets/sass/main.scss";
import { Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import HomePage from "./pages/HomePage";
import { useDispatch } from "react-redux";
import { authHandler } from "./redux/auth";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(false);
  useLayoutEffect(() => {
    dispatch(
      authHandler({
        email: localStorage.getItem("email"),
        role: localStorage.getItem("role"),
        accessRole: localStorage.getItem("accessRole"),
        events: JSON.parse(localStorage.getItem("events")),
        token: localStorage.getItem("token"),
      })
    );
  }, []);
  useEffect(() => {
    setFlag(true);
  }, []);
  return (
    <>
      {flag ? (
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashBoard />} />
          </Route>
          <Route path="/" element={<HomePage />} />
        </Routes>
      ) : (
        <p>Loading....</p>
      )}
    </>
  );
}

export default App;
