import {
  Avatar,
  AppBar,
  Toolbar,
  Grid,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

export const NavBar = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <AppBar sx={{ bgcolor: "#002884", height: "6vh" }}>
      <Toolbar
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item sx={{ marginRight: 2 }}>
            <Link to={"/"}>
              <img
                src={logo}
                alt="logo"
                style={{ width: "180px", height: "auto" }}
              />
            </Link>
          </Grid>
          <Grid item sx={{ flexGrow: 1 }}>
            {isAuthenticated ? "Searchbar" : null}
          </Grid>
          <Grid item sx={{ flexGrow: 1 }}>
            {isAuthenticated ? "My Team" : null}
          </Grid>
          <Grid item sx={{ flexGrow: 1 }}>
            {isAuthenticated ? "MarketPlace" : null}
          </Grid>
          <Grid item sx={{ flexGrow: 1 }}>
            {isAuthenticated ? "My Points" : null}
          </Grid>
        </Grid>
        {isAuthenticated ? (
          <Grid container spacing={4} alignItems="center">
            <Grid item>
              {/* <Link to={loggedInUserUrl}> */}
              "user avatar"
              {/* </Link> */}
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={4} alignItems="center">
            <Grid item>
              <button
                style={{
                  fontFamily: "Roboto",
                  fontSize: "1rem",
                  fontWeight: "500",
                  backgroundColor: "#ffa857",
                  color: "#000",
                  padding: "0.6rem 1rem",
                  borderRadius: "24px",
                  border: "none",
                }}
              >
                Log In / Sign Up
              </button>
            </Grid>
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  );
};
