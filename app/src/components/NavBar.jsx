import {
  Avatar,
  AppBar,
  Toolbar,
  Grid,
  TextField,
  Autocomplete,
  Box,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useAuth0, login } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { useState } from "react";

const SearchBar = () => {
  return <TextField label="Search for teams" />;
};

export const NavBar = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    handleClose();
  };

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
        <Grid container spacing={1} alignItems="center">
          <Grid item sx={{ marginRight: 12 }}>
            <Link to={"/"}>
              <img
                src={logo}
                alt="logo"
                style={{ width: "180px", height: "auto" }}
              />
            </Link>
          </Grid>
          <Grid item sx={{ marginRight: 8 }}>
            <Box
              component={Link}
              to={"/my-team"}
              sx={{
                textDecoration: "none",
                color: "white",
                fontFamily: "Roboto",
                ":hover": {
                  color: "grey",
                },
              }}
            >
              {isAuthenticated ? "My Team" : null}
            </Box>
          </Grid>
          <Grid item sx={{ marginRight: 8 }}>
            <Box
              component={Link}
              to={"/marketplace"}
              sx={{
                textDecoration: "none",
                color: "white",
                fontFamily: "Roboto",
                ":hover": {
                  color: "grey",
                },
              }}
            >
              {isAuthenticated ? "Marketplace" : null}
            </Box>
          </Grid>
          <Grid item sx={{ marginRight: 8 }}>
            <Box
              component={Link}
              to={"/my-points"}
              sx={{
                textDecoration: "none",
                color: "white",
                fontFamily: "Roboto",
                ":hover": {
                  color: "grey",
                },
              }}
            >
              {isAuthenticated ? "My Points" : null}
            </Box>
          </Grid>
          <Grid item>
            <Box
              component={Link}
              to={"/my-cards"}
              sx={{
                textDecoration: "none",
                color: "white",
                fontFamily: "Roboto",
                ":hover": {
                  color: "grey",
                },
              }}
            >
              {isAuthenticated ? "My Cards" : null}
            </Box>
          </Grid>
        </Grid>
        {isAuthenticated ? (
          <Grid container spacing={4} alignItems="center">
            {/* <Grid item sx={{ marginRight: 8 }}>
              {isAuthenticated ? <SearchBar /> : null}
            </Grid> */}
            <Grid item>
              <Avatar
                src={user?.picture}
                alt={user?.name}
                sx={{ cursor: "pointer" }}
                onClick={handleMenu}
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem component={Link} to="/profile">
                  <Typography>Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography>Logout</Typography>
                </MenuItem>
              </Menu>
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
                onClick={loginWithRedirect}
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
