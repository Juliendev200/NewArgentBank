import Account from "../components/Account";
import Button from "../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { infoUserName } from "../redux/loginSlice";
import { changeUsername } from "../api/api";

export default function EditProfile() {
  const navigate = useNavigate();
  const loginStore = useSelector((state) => state.login);
  const storeUserProfil = loginStore.userProfil;
  const dispatch = useDispatch();
  const [newUserName, setNewUserName] = useState(storeUserProfil.userName);
  const token = loginStore.userToken;
  const handleChangeUserName = (e) => {
    setNewUserName(e.target.value);
  };
  // HandleCancel
  const handleCancel = () => {
    navigate("/profile");
  };
  // HandleForm
  const handleForm = async (e) => {
    e.preventDefault();
    const updateUserName = await changeUsername(newUserName, token);
    if (updateUserName.status === 200) {
      dispatch(infoUserName(newUserName));
      console.log(
        "Le nom d'utilisateur a bien été modifié.",
        updateUserName.status
      );
      navigate("/profile");
    } else {
      console.error("La mise à jour du nom d'utilisateur a échoué.");
    }
  };
  return (
    <main className="main bg-dark">
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
              value={storeUserProfil.firstName}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              disabled
              value={storeUserProfil.lastName}
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
      <div>
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
      </div>
    </main>
  );
}
