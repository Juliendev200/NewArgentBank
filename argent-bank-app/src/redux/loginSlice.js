import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    userToken: null,
    userProfil: null,
  },
  reducers: {
    // Authentification
    loginUser: (state, action) => {
      state.userToken = action.payload;
    },
    // Déconnection
    logoutUser: (state) => {
      state.userToken = null;
      state.userProfil = null;
    },
    // Charge le profil utilisateur
    infoUser: (state, action) => {
      state.userProfil = action.payload;
    },
    // Modifie nom utilisateur
    infoUserName: (state, action) => {
      console.log("voici le payload info user Name :", action.payload);
      state.userProfil.userName = action.payload; //
    },
  },
});

export const { loginUser, logoutUser, infoUser, infoUserName } =
  loginSlice.actions;

export default loginSlice;
