import React from "react";
import { Link, NavLink } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/loginSlice";

export default function Navigation({ logo }) {
  const dispatch = useDispatch();
  const loginStore = useSelector((state) => state.login);
  const token = useSelector((state) => state.login.userToken);

  // Au click sur logout supréssion du token du local storage
  const handleRedirectHome = () => {
    localStorage.removeItem("token");
    console.log("Token suprimé du local storage");
    dispatch(logoutUser());
  };
  return (
    <nav className="main-nav">
      <Link to={`/home`} className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className="login">
        {/* Conditionnellement rendu le lien "Sign In" ou "Sign Out" */}
        {loginStore &&
          loginStore.userProfil &&
          loginStore.userProfil.userName && (
            <Link to="/profile" className="userName">
              <i className="fa fa-user-circle"></i>
              <p>{loginStore.userProfil.userName}</p>
            </Link>
          )}
        {token ? (
          <NavLink
            className="main-nav-item"
            to="/"
            onClick={handleRedirectHome}
          >
            <LuLogOut />
            Sign Out
          </NavLink>
        ) : (
          <NavLink className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
}
