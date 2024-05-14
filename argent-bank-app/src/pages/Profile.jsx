import React from "react";
import WelcomeBack from "../components/WelcomeBack";
import Account from "../components/Account";
import Button from "../components/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const loginStore = useSelector((state) => state.login);
  const navigate = useNavigate();
  const handleEditName = (e) => {
    e.preventDefault();
    navigate("/editprofile");
  };
  return (
    <main className="main bg-dark">
      <div className="header">
        <WelcomeBack
          firstName={loginStore.userProfil.firstName}
          lastName={loginStore.userProfil.lastName}
        />
        <Button
          text={"Edit Name"}
          className={"edit-button"}
          onClick={handleEditName}
        />
      </div>
      <h2 className="sr-only">Accounts</h2>
      <Account
        title="Argent Bank Checking (x8349)"
        amount="$2,082.79"
        description="Available Balance"
      />
      <Account
        title="Argent Bank Savings (x6712)"
        amount="$10,928.42"
        description="Available Balance"
      />
      <Account
        title="Argent Bank Credit Card (x8349)"
        amount="$184.30"
        description="Current Balance"
      />
    </main>
  );
}
