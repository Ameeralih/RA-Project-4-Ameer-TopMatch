import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";

const PlayerCard = ({ player, onPurchase }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={player.image}
        alt={player.player_name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {player.player_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Position: {player.position}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Team: {player.team_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: €{player.transfermarkt_value}m
        </Typography>
      </CardContent>
      <Button onClick={() => onPurchase(player)} variant="contained">
        Purchase
      </Button>
    </Card>
  );
};

export default PlayerCard;
