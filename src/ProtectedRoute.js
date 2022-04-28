import { Outlet } from "react-router";
import HomePage from "./pages/HomePage";
import { useLayoutEffect } from "react";
// import { au } from "./redux/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";

const useAuth = () => {
  const { token } = useSelector((state) => state.auth);
  const localToken = localStorage.getItem("token");
  return localToken !== null && token !== null;
};

const ProtectedRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <HomePage />;
};

export default ProtectedRoute;
