import { Card, CardContent } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const positionNumberToName = (positionNumber) => {
  const positionMap = {
    1: "Goalkeeper",
    2: "Defender",
    3: "Midfielder",
    4: "Forward",
  };
  return positionMap[positionNumber];
};

const teamNumberToName = (teamNumber) => {
  const teamMap = {
    1: "Arsenal",
    2: "Aston Villa",
    3: "Bournemouth",
    4: "Brentford",
    5: "Brighton",
    6: "Chelsea",
    7: "Crystal Palace",
    8: "Everton",
    9: "Fulham",
    10: "Leicester",
    11: "Leeds",
    12: "Liverpool",
    13: "Man City",
    14: "Man Utd",
    15: "Newcastle",
    16: "Nott'm Forest",
    17: "Southampton",
    18: "Spurs",
    19: "West Ham",
    20: "Wolves",
  };
  return teamMap[teamNumber];
};

export const MyCardsPageCard = ({ cardId }) => {
  const [player, setPlayer] = useState({});
  const [playerPosition, setPlayerPosition] = useState("");
  const [playerTeam, setPlayerTeam] = useState("");

  const getPlayerDataFromCardId = async (cardId) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/cards/playerfromcard",
        {
          params: {
            cardId: cardId,
          },
        }
      );

      if (response.data.success) {
        return response.data.data;
      } else {
        console.error("Error fetching player data:", response.data.message);
        return null;
      }
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  };

  useEffect(() => {
    if (cardId) {
      const fetchPlayerData = async () => {
        const response = await getPlayerDataFromCardId(cardId);
        setPlayer(response);
        setPlayerPosition(positionNumberToName(response.position));
        setPlayerTeam(teamNumberToName(response.team_name));
        console.log("player", player);
      };
      fetchPlayerData();
    }
  }, [cardId]);

  return (
    player && (
      <div className="card">
        <div className="card-id">ID: {cardId}</div>
        <img
          className="player-image"
          src={player.image}
          alt={player.player_name}
        />
        <div className="player-info">
          <div className="player-name">{player.player_name}</div>
          <div className="player-position">{playerPosition}</div>
          <div className="player-team">{playerTeam}</div>
        </div>
      </div>
    )
  );
};
