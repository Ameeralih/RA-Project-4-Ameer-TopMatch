import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { grey } from "@mui/material/colors";

const MarketplaceListPlayerCard = ({ player, onPurchase }) => {
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

  return (
    <Grid container alignItems="center" justifyContent="center">
      <Card
        sx={{
          maxWidth: 345,
          minWidth: 345,
          backgroundColor: "#e3e3e3",
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {player.player_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Position: {positionNumberToName(player.position)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Team: {teamNumberToName(player.team_name)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: €{player.transfermarkt_value}m
          </Typography>
          <Button
            style={{ marginTop: "10px" }}
            onClick={() => onPurchase(player)}
            variant="contained"
          >
            Purchase
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default MarketplaceListPlayerCard;
