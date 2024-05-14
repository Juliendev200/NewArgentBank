import React from "react";
import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logUser, getUserProfile } from "../api/api";
import { infoUser, loginUser } from "../redux/loginSlice";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remenberMe, setRemenberMe] = useState(false);
  const [erreur, setErreur] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await logUser(email, password);
      const token = userData.body.token;
      await dispatch(loginUser(token));

      if (remenberMe) {
        localStorage.setItem("token", token);
      }

      const userInfo = await getUserProfile(token); // Utilisation de la fonction getUserProfile
      const userInfos = {
        email: userInfo.body.email,
        firstName: userInfo.body.firstName,
        lastName: userInfo.body.lastName,
        userName: userInfo.body.userName,
      };
      await dispatch(infoUser(userInfos));
      navigate("/profile");
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setErreur("Identifiants incorrects");
    }
  };
  const handleRememberMe = (e) => {
    setRemenberMe(e.target.checked);
  };
  return (
    <form onSubmit={handleLogin}>
      <div className="input-wrapper">
        <label htmlFor="userEmail">Email</label>
        <input
          type="email"
          id="userEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder=" Your Email"
          required
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder=" Your Password"
          required
        />
      </div>
      <div className="input-remember">
        <input
          type="checkbox"
          id="remember-me"
          checked={remenberMe}
          onChange={handleRememberMe}
        />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <Button text={"Sign in"} className={"sign-in-button"} />
    </form>
  );
}
