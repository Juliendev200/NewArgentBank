import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import WelcomeBack from "../components/WelcomeBack";
import Account from "../components/Account";
import Button from "../components/Button";
import { infoUserName } from "../redux/loginSlice";
import { changeUsername } from "../api/api";

export default function Profile() {
  const dispatch = useDispatch();
  const loginStore = useSelector((state) => state.login);
  const [isEditing, setIsEditing] = useState(false);
  const [newUserName, setNewUserName] = useState("");

  const handleEditName = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };
  // HandleCancel
  const handleChangeUserName = (e) => {
    setNewUserName(e.target.value);
  };
  // HandleForm
  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const updateUserName = await changeUsername(
        newUserName,
        loginStore.userToken
      );
      if (updateUserName.status === 200) {
        dispatch(infoUserName(newUserName));
        console.log(
          "Le nom d'utilisateur a bien été modifié.",
          updateUserName.status
        );
        setIsEditing(false);
      } else {
        console.error("La mise à jour du nom d'utilisateur a échoué.");
      }
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la modification du nom d'utilisateur :",
        error
      );
    }
  };

  return (
    <main className="main bg-dark">
      {isEditing ? (
        <>
          <section className="sign-in-content">
            <h1>Edit user info</h1>
            <form
              onSubmit={handleForm}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input
                  value={newUserName}
                  onChange={handleChangeUserName}
                  type="text"
                  id="username"
                  placeholder="Tapez votre username"
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  id="firstname"
                  disabled
                  value={loginStore.userProfil.firstName}
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  id="lastname"
                  disabled
                  value={loginStore.userProfil.lastName}
                />
              </div>
              <Button text={"Save"} className={"sign-in-button"} />
              <Button
                text={"Cancel"}
                onClick={handleCancel}
                className={"sign-in-button"}
              />
            </form>
          </section>
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
        </>
      ) : (
        <>
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
        </>
      )}
    </main>
  );
}
