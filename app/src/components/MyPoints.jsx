import React, { useState, useEffect } from "react";
import axios from "axios";
import backgroundImage from "../images/landing-page-bg.jpg";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const MyPoints = ({ user }) => {
  const [gameweeks, setGameweeks] = useState([]);
  const [selectedGameweek, setSelectedGameweek] = useState();
  const [squad, setSquad] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [formation, setFormation] = useState("");

  useEffect(() => {
    console.log("Selected gameweek: ", selectedGameweek);
    console.log("Squad: ", squad);
  }, [selectedGameweek, squad]);

  useEffect(() => {
    fetchGameweeks();
  }, []);

  const fetchGameweeks = async () => {
    const dummyGameweeks = [
      { id: 32, name: "Gameweek 32" },
      { id: 33, name: "Gameweek 33" },
      { id: 34, name: "Gameweek 34" },
    ];
    setGameweeks(dummyGameweeks);
  };

  const fetchSquadAndPoints = async (gameweekId, userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/mypoints/getsquadandpoints/${userId}/gameweek/${gameweekId}`
      );
      setSquad(response.data.data.squad);
      setTotalPoints(response.data.data.totalPoints);
      setFormation(response.data.data.formation);
    } catch (error) {
      setSquad([]);
      setTotalPoints(0);
      console.error("Error fetching squad and points data:", error);
    }
  };

  const handleGameweekChange = (e) => {
    const gameweekId = e.target.value;
    setSelectedGameweek(gameweekId);
    fetchSquadAndPoints(gameweekId, user.id);
  };

  // Custom functions for MyPoints
  const PositionSlot = ({ player, top, left }) => {
    return player ? (
      <div
        style={{
          position: "absolute",
          top,
          left,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255, 255, 255, 0.7)", // Add translucent white background
          borderRadius: "5px", // Add rounded edges
          padding: "5px", // Add padding around content
          textAlign: "center", // Center the text
          maxWidth: "80px", // Set a maximum width for the box
          wordWrap: "break-word", // Break words if they exceed the box width
        }}
      >
        <img src={player.image} alt={player.name} style={{ width: "40px" }} />
        <div>{player.name}</div>
        <div>{player.points}</div>
      </div>
    ) : null;
  };

  const getPositionCoordinates = (position, index, count) => {
    const yPositionMap = {
      goalkeeper: 93,
      defender: 75,
      midfielder: 48,
      forward: 18,
    };

    const xPositionMap = {
      goalkeeper: { 1: [50] },
      defender: {
        1: [50],
        2: [33, 67],
        3: [25, 50, 75],
        4: [15, 38, 63, 86],
        5: [10, 30, 50, 70, 90],
      },
      midfielder: {
        1: [50],
        2: [33, 67],
        3: [25, 50, 75],
        4: [15, 38, 63, 86],
        5: [10, 30, 50, 70, 90],
      },
      forward: {
        1: [50],
        2: [33, 69],
        3: [25, 50, 75],
        4: [20, 40, 60, 80],
        5: [10, 30, 50, 70, 90],
      },
    };

    const y = yPositionMap[position];
    const x = xPositionMap[position][count][index];
    return { top: `${y}%`, left: `${x}%` };
  };

  const renderPositionSlots = (position, count) => {
    const slots = [];
    for (let i = 0; i < count; i++) {
      const { top, left } = getPositionCoordinates(position, i, count);
      const player = squad.find(
        (p) => p.position === position && p.index === i
      );
      slots.push(
        <PositionSlot
          key={`${position}-${i}`}
          player={player}
          top={top}
          left={left}
        />
      );
    }
    return slots;
  };

  const getFormationPositions = (formation) => {
    const [defenders, midfielders, forwards] = formation.split("-").map(Number);
    return { defenders, midfielders, forwards };
  };

  const formationPositions = formation
    ? getFormationPositions(formation)
    : null;
  return (
    <div
      style={{
        height: "93.9vh",
        backgroundImage: `linear-gradient(rgba(50, 50, 50, 0.9), rgba(50, 50, 50, 0.9)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        zIndex: "-1",
      }}
    >
      <FormControl
        style={{ width: "20%", margin: "1%" }}
        sx={{
          color: "#F5F5F5",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          "& .MuiInputBase-input": {
            color: "#F5F5F5",
          },
          "& .MuiInputLabel-root": {
            color: "#F5F5F5",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#F5F5F5",
            },
            "&:hover fieldset": {
              borderColor: "#F5F5F5",
            },
            "& fieldset": {
              borderColor: "#F5F5F5",
            },
          },
          "& .MuiSelect-icon": {
            color: "#F5F5F5",
          },
        }}
      >
        <InputLabel id="gameweek-label">Select a gameweek</InputLabel>
        <Select
          labelId="gameweek-label"
          id="gameweek"
          value={selectedGameweek}
          onChange={handleGameweekChange}
        >
          <MenuItem value="" disabled>
            Select a gameweek
          </MenuItem>
          {gameweeks.map((gw) => (
            <MenuItem key={gw.id} value={gw.id}>
              {gw.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedGameweek && (
        <>
          <h2 style={{ margin: 0, color: "white" }}>
            Total Points: {totalPoints}
          </h2>
          <div
            style={{
              position: "relative",
              paddingTop: "34%",
              width: "100%",
              maxWidth: "500px",
              margin: "0 auto",
              transform: "translate(0%, 0%)",
            }}
          >
            <img
              src="/images/soccer-field.jpg"
              alt="Football pitch"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "110%",
                width: "110%",
                objectFit: "contain",
                transform: "translate(4%, 3%)",
              }}
            />
            {formationPositions && (
              <>
                {renderPositionSlots("goalkeeper", 1)}
                {renderPositionSlots("defender", formationPositions.defenders)}
                {renderPositionSlots(
                  "midfielder",
                  formationPositions.midfielders
                )}
                {renderPositionSlots("forward", formationPositions.forwards)}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
