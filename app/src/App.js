import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import { NavBar } from "../src/components/NavBar";
import { AppFooter } from "../src/components/AppFooter";
import { HomePage } from "../src/components/HomePage";
import { MyTeam } from "./components/MyTeam";
import { Marketplace } from "./components/Marketplace";
import { MyPoints } from "./components/MyPoints";

export const App = () => {
  const { isAuthenticated, user } = useAuth0();
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div style={{ marginTop: "64px" }}>
          <Routes>
            <Route path="/" exact index element={<HomePage />} />
            <Route path="/my-team" exact index element={<MyTeam />} />
            <Route path="/marketplace" exact index element={<Marketplace />} />
            <Route path="/my-points" exact index element={<MyPoints />} />
          </Routes>
        </div>
        {/* <AppFooter /> */}
      </BrowserRouter>
    </div>
  );
};
