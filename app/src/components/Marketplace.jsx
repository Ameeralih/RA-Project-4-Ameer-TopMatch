import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import PlayerCard from "./PlayerCard";
import backgroundImage from "../images/landing-page-bg.jpg";
import MarketplaceListPlayerCard from "./MarketplaceListPlayerCard";
import SearchFilter from "./PlayerSearchFilter";

export const Marketplace = ({ user }) => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userBalance, setUserBalance] = useState();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [resultDialogOpen, setResultDialogOpen] = useState(false);
  const [resultDialogTitle, setResultDialogTitle] = useState("");
  const [resultDialogContent, setResultDialogContent] = useState("");
  const [playerToPurchase, setPlayerToPurchase] = useState(null);

  const openConfirmDialog = (player) => {
    setPlayerToPurchase(player);
    setConfirmDialogOpen(true);
  };

  const closeConfirmDialog = () => {
    setPlayerToPurchase(null);
    setConfirmDialogOpen(false);
  };

  const openResultDialog = (title, content) => {
    setResultDialogTitle(title);
    setResultDialogContent(content);
    setResultDialogOpen(true);

    setTimeout(() => {
      setResultDialogOpen(false);
    }, 2000);
  };

  useEffect(() => {
    if (user) {
      setUserBalance(user.balance);
      console.log(user);
    }
  }, [user]);
  useEffect(() => {
    console.log("change");
    setFilteredPlayers(
      players.filter((player) =>
        player.player_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [players, searchQuery]);

  useEffect(() => {
    console.log("fetch players");
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/players/players"
    );
    setPlayers(response.data);
  };

  const handlePurchase = (player) => {
    openConfirmDialog(player);
  };

  const handleConfirmPurchase = async (player) => {
    closeConfirmDialog();
    if (player.transfermarkt_value < userBalance) {
      try {
        const response = await axios.post("http://localhost:3000/api/cards/", {
          playerId: player.id,
        });

        console.log("Card created:", response.data);

        const updatedBalance = userBalance - player.transfermarkt_value;

        await axios.put("http://localhost:3000/api/users/update-balance", {
          userId: user.id,
          newBalance: updatedBalance,
        });
        console.log("Updated user balance:", updatedBalance);
        setUserBalance(updatedBalance);

        const userCardResponse = await axios.post(
          "http://localhost:3000/api/user-cards/create",
          {
            cardId: response.data.id,
            userId: user.id,
            purchasePrice: player.transfermarkt_value,
          }
        );
        console.log("User card created:", userCardResponse.data);
        openResultDialog("Success", "Purchase successful!");
      } catch (error) {
        console.error("Error while purchasing player:", error);
      }
    } else {
      console.log("Insufficient balance to purchase player:", player);
      openResultDialog("Error", "Insufficient balance!");
    }
  };

  const handleFilter = (currentSearchQuery) => {
    setSearchQuery(currentSearchQuery);
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
      <Dialog
        open={confirmDialogOpen}
        onClose={closeConfirmDialog}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">Confirm Purchase</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Are you sure you want to purchase {playerToPurchase?.player_name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDialog} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmPurchase} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={resultDialogOpen}
        onClose={() => setResultDialogOpen(false)}
        aria-labelledby="result-dialog-title"
        aria-describedby="result-dialog-description"
      >
        <DialogTitle id="result-dialog-title">{resultDialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="result-dialog-description">
            {resultDialogContent}
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <SearchFilter onFilter={handleFilter} />
      <div
        style={{ maxHeight: "80vh", overflowY: "scroll", marginTop: "10px" }}
      >
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          {filteredPlayers.map((player) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={player.id}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <MarketplaceListPlayerCard
                player={player}
                onPurchase={handlePurchase}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Marketplace;
