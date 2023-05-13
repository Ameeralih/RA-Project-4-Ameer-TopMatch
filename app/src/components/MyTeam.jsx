import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Modal,
  Input,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import backgroundImage from "../images/landing-page-bg.jpg";
import axios from "axios";
import { patchGameweekTeam } from "./utility";

const positionMap = {
  1: "Goalkeeper",
  2: "Defender",
  3: "Midfielder",
  4: "Forward",
};

const formationMap = {
  1: "3-5-2",
  2: "3-4-3",
  3: "4-3-3",
  4: "4-4-2",
  5: "4-5-1",
  6: "5-3-2",
  7: "5-4-1",
};

const getFormationId = (formationString, formationMap) => {
  return Object.keys(formationMap).find(
    (key) => formationMap[key] === formationString
  );
};

const getPositionString = (positionValue) => {
  return positionMap[positionValue];
};

const getPositionCoordinates = (position, index, count) => {
  const yPositionMap = {
    Goalkeeper: 89,
    Defender: 72,
    Midfielder: 47,
    Forward: 18,
  };

  const xPositionMap = {
    Goalkeeper: { 1: [50] },
    Defender: {
      1: [50],
      2: [33, 67],
      3: [25, 50, 75],
      4: [15, 15 + 23.333, 15 + 23.333 + 23.333, 85],
      5: [10, 30, 50, 70, 90],
      // Add more if needed
    },
    Midfielder: {
      1: [50],
      2: [33, 67],
      3: [25, 50, 75],
      4: [15, 15 + 23.333, 15 + 23.333 + 23.333, 85],
      5: [10, 30, 50, 70, 90],
      // Add more if needed
    },
    Forward: {
      1: [50],
      2: [33.33, 100 - 33.33],
      3: [25, 50, 75],
      4: [20, 40, 60, 80],
      5: [10, 30, 50, 70, 90],
      // Add more if needed
    },
  };

  const playerCount = count;
  return {
    top: yPositionMap[position],
    left: xPositionMap[position][playerCount][index],
  };
};

const PositionSlot = ({
  position,
  player,
  onAddPlayer,
  onRemovePlayer,
  top,
  left,
}) => {
  const widthPercentage = (60 / 851) * 100;
  const heightPercentage = (60 / 1304) * 100;
  const widthPercentagePlayer = (100 / 851) * 100;
  const slotWidthOffset = widthPercentage / 2;
  const slotHeightOffset = heightPercentage / 2;
  const playerSlotWidthOffset = widthPercentagePlayer / 2;
  const topOffsetEmptySlot = top - slotHeightOffset;
  const leftOffsetEmptySlot = left - slotWidthOffset;
  const leftOffsetPlayerSlot = left - playerSlotWidthOffset;
  return player ? (
    <div
      style={{
        position: "absolute",
        left: `${leftOffsetPlayerSlot}%`,
        top: `${topOffsetEmptySlot}%`,
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
      <div
        style={{
          position: "absolute",
          top: "-5px",
          right: "-5px",
          background: "red",
          borderRadius: "50%",
          width: "15px",
          height: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "12px",
          cursor: "pointer",
        }}
        onClick={() => onRemovePlayer(player.id)}
      >
        x
      </div>
      <img src={player.image} alt={player.name} style={{ width: "40px" }} />
      <div style={{ width: "60px", textAlign: "center" }}>
        {player.player_name}
      </div>
    </div>
  ) : (
    <div
      style={{
        width: `${widthPercentage}%`,
        height: `${heightPercentage}%`,
        border: "1px solid black",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        position: "absolute",
        top: `${topOffsetEmptySlot}%`,
        left: `${leftOffsetEmptySlot}%`,
      }}
      onClick={() => onAddPlayer(position)}
    >
      +
    </div>
  );
};

export const MyTeam = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [upcomingGameweek, setUpcomingGameweek] = useState(null);
  const [currentFormation, setFormation] = useState("4-4-2");
  const [playersByPosition, setPlayersByPosition] = useState(() => {
    const savedPlayersByPosition = localStorage.getItem("playersByPosition");

    if (savedPlayersByPosition) {
      return JSON.parse(savedPlayersByPosition);
    } else {
      return {
        Goalkeeper: [],
        Defender: [],
        Midfielder: [],
        Forward: [],
      };
    }
  });

  const [players, setPlayers] = useState([]);
  const [addPlayerModal, setAddPlayerModal] = useState({
    open: false,
    position: null,
  });

  const removePlayer = (playerId) => {
    setPlayersByPosition((prevState) => {
      const updatedState = { ...prevState };
      const position = Object.keys(updatedState).find((key) =>
        updatedState[key].some((player) => player.id === playerId)
      );
      if (position) {
        updatedState[position] = updatedState[position].filter(
          (player) => player.id !== playerId
        );
      }
      return updatedState;
    });
  };

  const handleSaveTeam = async () => {
    if (!user || !upcomingGameweek) {
      console.log("User or upcomingGameweek does not exist");
      return;
    }
    try {
      const formationId = getFormationId(currentFormation, formationMap);
      await patchGameweekTeam(
        user.id,
        upcomingGameweek.id,
        formationId,
        playersByPosition
      );
    } catch (error) {
      console.error("Error saving team:", error);
    }
  };

  const fetchAvailablePlayers = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/availablePlayers/uniquePlayers/${userId}`
      );

      setPlayers(response.data);
    } catch (error) {
      console.error("Error fetching available players:", error);
    }
  };

  useEffect(() => {
    console.log("playersByPosition updated:", playersByPosition);
  }, [playersByPosition, currentFormation]);

  useEffect(() => {
    setPlayersByPosition({
      Goalkeeper: [],
      Defender: [],
      Midfielder: [],
      Forward: [],
    });
  }, [currentFormation]);

  useEffect(() => {
    localStorage.setItem(
      "playersByPosition",
      JSON.stringify(playersByPosition)
    );
  }, [playersByPosition]);

  useEffect(() => {
    if (user) {
      fetchAvailablePlayers(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (players) {
    }
  }, [players]);

  const onAddPlayer = (position) => {
    setAddPlayerModal({ open: true, position });
  };

  const getAvailablePlayersByPosition = (position) => {
    return players.filter(
      (player) => getPositionString(player.position) === position
    );
  };

  const handlePlayerSelect = (player) => {
    setPlayersByPosition((prevState) => {
      const newPositionPlayers = prevState[addPlayerModal.position].slice();
      const emptySlotIndex = newPositionPlayers.findIndex((p) => p === null);

      // Add the unique index to the player object
      const playerWithIndex = {
        ...player,
        index:
          emptySlotIndex === -1 ? newPositionPlayers.length : emptySlotIndex,
      };

      if (emptySlotIndex === -1) {
        newPositionPlayers.push(playerWithIndex);
      } else {
        newPositionPlayers[emptySlotIndex] = playerWithIndex;
      }

      return { ...prevState, [addPlayerModal.position]: newPositionPlayers };
    });
    setAddPlayerModal({ open: false, position: null });
  };

  const renderPositionSlots = (position, count) => {
    const slots = [];
    for (let i = 0; i < count; i++) {
      const { top, left } = getPositionCoordinates(position, i, count);
      slots.push(
        <PositionSlot
          key={`${position}-${i}`}
          position={position}
          player={playersByPosition[position][i]}
          onAddPlayer={onAddPlayer}
          onRemovePlayer={removePlayer}
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

  const formationPositions = currentFormation
    ? getFormationPositions(currentFormation)
    : null;

  const checkGameweekTeamExists = async (userId, gameweekId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/gameweekteams/checkgameweekteamexists?userId=${userId}&gameweekId=${gameweekId}`
      );

      if (response.data.exists) {
        console.log("Gameweek team exists");
      } else {
        console.log("Gameweek team does not exist");
      }
    } catch (error) {
      console.error("Error checking for existing gameweek team:", error);
    }
  };

  const fetchUpcomingGameweek = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/gameweeks/currentgameweek"
      );
      setUpcomingGameweek(response.data);
    } catch (error) {
      console.error("Error fetching upcoming gameweek:", error);
    }
  };
  useEffect(() => {
    fetchUpcomingGameweek();
  }, []);

  const handleOpen = (player) => {
    setOpen(true);
    setSelectedPlayer(player);
  };
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
      {selectedPlayer && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "auto",
              background: "white",
              borderRadius: "30px",
              padding: "30px",
            }}
          >
            <img
              src={selectedPlayer.image}
              alt={selectedPlayer.name}
              style={{ width: "300px", marginBottom: "3vh" }}
            />
            <Typography variant="h4">{selectedPlayer.player_name}</Typography>
            <Typography variant="h6">
              {getPositionString(selectedPlayer.position)}
              {selectedPlayer.club}
            </Typography>
            <Typography variant="subtitle1">
              Price: €{selectedPlayer.transfermarkt_value}
            </Typography>
          </div>
        </Modal>
      )}
      {addPlayerModal.position && (
        <Modal
          open={addPlayerModal.open}
          onClose={() => setAddPlayerModal({ open: false, position: null })}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "auto",
              background: "white",
              borderRadius: "30px",
              padding: "30px",
            }}
          >
            <Typography variant="h4">
              Select a {addPlayerModal.position}
            </Typography>
            {getAvailablePlayersByPosition(addPlayerModal.position).map(
              (player) => (
                <div
                  style={{ cursor: "pointer" }}
                  key={player.id}
                  onClick={() => handlePlayerSelect(player)}
                >
                  <img
                    src={player.image}
                    alt={player.name}
                    style={{ width: "50px" }}
                  />
                  <div>{player.player_name}</div>
                </div>
              )
            )}
          </div>
        </Modal>
      )}
      <Grid container>
        <Grid item xs={12} sm={4}>
          <div
            style={{
              maxHeight: "92vh",
              overflowY: "scroll",
              padding: "8px 32px",
            }}
          >
            {players.map((player) => (
              <Card
                style={{ cursor: "pointer" }}
                onClick={() => handleOpen(player)}
                key={player.id}
                sx={{
                  margin: "24px 8px",
                  padding: "28px",
                  border: 1,
                  borderColor: "grey.500",
                  borderRadius: "16px",
                  boxShadow: "5px 5px 5px #888888",
                  height: "10vh",
                }}
              >
                <Grid container>
                  <Grid item xs={2.5}>
                    <CardMedia component="img" image={player.image} />
                  </Grid>
                  <Grid item xs={9}>
                    <CardContent sx={{ margin: "0px 48px", padding: "0px" }}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        align="left"
                      >
                        {player.player_name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        align="left"
                      >
                        {getPositionString(player.position)}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        align="left"
                      >
                        Price: €{player.transfermarkt_value}
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            ))}
          </div>
        </Grid>
        <Grid item xs={12} sm={8} style={{ height: "92vh" }}>
          <div
            style={{
              position: "relative",
              width: "38%",
              height: "100%",
              margin: "0 auto",
            }}
          >
            <FormControl
              style={{ width: "50%", margin: "2%" }}
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
              <InputLabel id="demo-simple-select-label">Formation</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currentFormation}
                onChange={(event) => setFormation(event.target.value)}
              >
                {Object.keys(formationMap).map((key) => (
                  <MenuItem key={key} value={formationMap[key]}>
                    {formationMap[key]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div
              style={{
                position: "relative",
                paddingTop: "153%",
                overflow: "hidden",
                margin: "1%",
              }}
            >
              <img
                src="/images/soccer-field.jpg"
                alt="Football pitch"
                style={{
                  objectFit: "contain",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
              {formationPositions && (
                <>
                  {renderPositionSlots("Goalkeeper", 1)}
                  {renderPositionSlots(
                    "Defender",
                    formationPositions.defenders
                  )}
                  {renderPositionSlots(
                    "Midfielder",
                    formationPositions.midfielders
                  )}
                  {renderPositionSlots("Forward", formationPositions.forwards)}
                </>
              )}
            </div>

            <Button onClick={handleSaveTeam} variant="contained">
              Save Team
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
