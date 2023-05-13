import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { updateUserNameAndTeam } from "./utility";

export const Profile = ({ user, onUpdateUserData }) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    name: "",
    team_name: "",
  });
  const [edit, setEdit] = useState(false);
  const userEmail = user.email;

  const fetchUser = async (userEmail) => {
    // Replace this with the actual API call to get the user's data
    const { data } = await axios.get(
      `http://localhost:3000/api/users/email/${userEmail}`
    );
    setUserInfo(data);
  };

  useEffect(() => {
    if (userEmail !== "") {
      fetchUser(userEmail);
    }
  }, [userEmail]);

  useEffect(() => {
    if (userInfo.email && (!userInfo.name || !userInfo.team_name)) {
      setEdit(true);
      console.log(userInfo);
    }
  }, [userInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const response = await updateUserNameAndTeam(
      userInfo.email,
      userInfo.name,
      userInfo.team_name
    );
    if (response && response.message === "Update successful") {
      console.log("User name and team name updated successfully");
      // Perform any additional actions you want after a successful update
      onUpdateUserData(userInfo);
    } else {
      console.error("Error updating user name and team name");
    }

    setEdit(false);
  };

  return (
    <div>
      <h2>Profile</h2>
      <div>
        <TextField
          style={{ width: "50%", margin: "10px" }}
          label="Name"
          name="name"
          value={userInfo.name || ""}
          onChange={handleInputChange}
          disabled={!edit}
          fullWidth
        />
      </div>
      <div>
        <TextField
          style={{ width: "50%", margin: "10px" }}
          label="Email"
          name="email"
          value={userInfo.email || ""}
          disabled
          fullWidth
        />
      </div>
      <div>
        <TextField
          style={{ width: "50%", margin: "10px" }}
          label="Team Name"
          name="team_name"
          value={userInfo.team_name || ""}
          onChange={handleInputChange}
          disabled={!edit}
          fullWidth
        />
      </div>

      {edit ? (
        <Button
          style={{ margin: "10px" }}
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Save
        </Button>
      ) : (
        <Button
          style={{ margin: "10px" }}
          variant="contained"
          color="primary"
          onClick={() => setEdit(true)}
        >
          Edit
        </Button>
      )}
    </div>
  );
};
