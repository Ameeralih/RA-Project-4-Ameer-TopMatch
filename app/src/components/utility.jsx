// src/helpers/api.js
import axios from "axios";

export const getUserByEmail = async (email) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/users/email/${email}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
};

export const createUser = async (email) => {
  try {
    const { data } = await axios.post("http://localhost:3000/api/users/user", {
      email: email,
    });
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};

export const updateUserNameAndTeam = async (email, name, team_name) => {
  try {
    const { data } = await axios.put(
      "http://localhost:3000/api/users/user/name-team",
      {
        email,
        name,
        team_name,
      }
    );
    return data;
  } catch (error) {
    console.error("Error updating user name and team name:", error);
    return null;
  }
};

export const patchGameweekTeam = async (
  userId,
  gameweekId,
  formationId,
  playersByPosition
) => {
  try {
    const response = await axios.patch(
      `http://localhost:3000/api/gameweekteams/${userId}/${gameweekId}`,
      { formationId, playersByPosition },
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("Gameweek team updated:", response.data);
  } catch (error) {
    console.error("Error updating gameweek team:", error);
  }
};
