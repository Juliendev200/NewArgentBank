import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SecurityPath from "./Securitypath.jsx";
import { useSelector } from "react-redux";
import Navigation from "./components/Navigation.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/LogIn.jsx";
import Profile from "./pages/Profile.jsx";
import Footer from "./components/Footer.jsx";
import EditProfile from "./pages/EditProfile.jsx";

export default function App() {
  const userProfil = useSelector((state) => state.login.userProfil);
  const userToken = useSelector((state) => state.login.userToken);
  // Fonction pour effectuer la redirection si l'utilisateur est déjà connecté
  const redirectIfLoggedIn = () => {
    console.log("Valeur du token " + userToken);
    if (userProfil) {
      return <Navigate to="/profile" />;
    }
    return null;
  };
  return (
    <BrowserRouter>
      <Navigation logo="/img/argentBankLogo.png" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route index path="/Home" element={<Home />} />
        <Route
          path="/sign-in"
          element={
            <>
              {redirectIfLoggedIn()}
              <Login />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <SecurityPath>
              <Profile />
            </SecurityPath>
          }
        />
        <Route
          path="/editprofile"
          element={
            <SecurityPath>
              <EditProfile />
            </SecurityPath>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
