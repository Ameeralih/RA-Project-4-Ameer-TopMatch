import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { NavBar } from "../src/components/NavBar";
import { AppFooter } from "../src/components/AppFooter";
import { HomePage } from "../src/components/HomePage";
import { MyTeam } from "./components/MyTeam";
import { Marketplace } from "./components/Marketplace";
import { MyPoints } from "./components/MyPoints";
import { Profile } from "./components/Profile";
import { MyCardsPage } from "./components/MyCardsPage";
import backgroundImage from "../src/images/landing-page-bg.jpg";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { createUser, getUserByEmail } from "./components/utility";

const ProtectedRoute = ({ shouldEditProfile, isAuthenticated, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (shouldEditProfile) {
      navigate("/profile");
    }
    if (isAuthenticated) {
      navigate("/my-team");
    }
  }, [shouldEditProfile, isAuthenticated, navigate]);

  return <>{children}</>;
};

export const App = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const [userData, setUserData] = useState(null);
  const [shouldEditProfile, setShouldEditProfile] = useState(false);
  const fetchUserByEmail = async (email) => {
    const foundUser = await getUserByEmail(email);
    if (foundUser) {
      setUserData(foundUser);
    } else {
      const newUser = await createUser(email);
      setUserData(newUser);
    }
  };

  useEffect(() => {
    if (user && !userData) {
      fetchUserByEmail(user.email);
    }
  }, [user, userData]);

  useEffect(() => {
    if (
      userData &&
      (userData.name === null ||
        userData.name === "" ||
        userData.team_name === null ||
        userData.team_name === "")
    ) {
      setShouldEditProfile(true);
    } else {
      setShouldEditProfile(false);
    }
  }, [userData]);

  useEffect(() => {
    console.log("shouldeditprofile:", shouldEditProfile);
  }, [shouldEditProfile]);

  if (isLoading) {
    return (
      <div className="App">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div style={{ marginTop: "63px" }}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  shouldEditProfile={shouldEditProfile}
                  isAuthenticated={isAuthenticated}
                >
                  <HomePage user={userData} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-team"
              element={
                <ProtectedRoute shouldEditProfile={shouldEditProfile}>
                  <MyTeam user={userData} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/marketplace"
              element={
                <ProtectedRoute shouldEditProfile={shouldEditProfile}>
                  <Marketplace user={userData} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-points"
              element={
                <ProtectedRoute shouldEditProfile={shouldEditProfile}>
                  <MyPoints user={userData} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-cards"
              element={
                <ProtectedRoute shouldEditProfile={shouldEditProfile}>
                  <MyCardsPage user={userData} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute shouldEditProfile={false}>
                  <Profile user={user} onUpdateUserData={setUserData} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};
