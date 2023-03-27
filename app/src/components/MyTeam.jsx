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
} from "@mui/material";
import { useState } from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

const players = [
  {
    name: "Granit Xhaka",
    position: "Forward",
    club: "Arsenal",
    price: "100",
    face: "/players-images/p84450.png",
  },
  {
    name: "Mohamed Elneny",
    position: "Midfielder",
    club: "Arsenal",
    price: "150",
    face: "/players-images/p153256.png",
  },
  {
    name: "Thomas Partey",
    position: "Defender",
    club: "Arsenal",
    price: "150",
    face: "/players-images/p167199.png",
  },
  {
    name: "Player 4",
    position: "Midfielder",
    club: "Club B",
    price: "150",
    face: "/players-images/p232653.png",
  },
  {
    name: "Player 5",
    position: "Midfielder",
    club: "Club B",
    price: "150",
    face: "/players-images/p84450.png",
  },
  {
    name: "Player 6",
    position: "Midfielder",
    club: "Club B",
    price: "150",
    face: "/players-images/p84450.png",
  },
  {
    name: "Player 7",
    position: "Midfielder",
    club: "Club B",
    price: "150",
    face: "/players-images/p84450.png",
  },
  {
    name: "Player 8",
    position: "Midfielder",
    club: "Club B",
    price: "150",
    face: "/players-images/p84450.png",
  },
  {
    name: "Player 9",
    position: "Midfielder",
    club: "Club B",
    price: "150",
    face: "/players-images/p84450.png",
  },
  // Add more player objects as needed
];

export const MyTeam = () => {
  const [open, setOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handleOpen = (player) => {
    setOpen(true);
    setSelectedPlayer(player);
  };
  return (
    <div>
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
              src={selectedPlayer.face}
              alt={selectedPlayer.name}
              style={{ width: "300px", marginBottom: "3vh" }}
            />
            <Typography variant="h4">{selectedPlayer.name}</Typography>
            <Typography variant="h6">
              {selectedPlayer.position} - {selectedPlayer.club}
            </Typography>
            <Typography variant="subtitle1">
              Price: {selectedPlayer.price}
            </Typography>
            <Typography variant="subtitle1">Age: </Typography>
            <Typography variant="subtitle1">Nationality:</Typography>
            <Typography variant="subtitle1">Height:</Typography>
            <Typography variant="subtitle1">Weight:</Typography>
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
                key={player.name}
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
                    <CardMedia component="img" image={player.face} />
                  </Grid>
                  <Grid item xs={9}>
                    <CardContent sx={{ margin: "0px 48px", padding: "0px" }}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        align="left"
                      >
                        {player.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        align="left"
                      >
                        {player.position} - {player.club}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        align="left"
                      >
                        Price: {player.price}
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            ))}
          </div>
        </Grid>
        <Grid item xs={12} sm={8}>
          <div>
            Formation:{" "}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem>Ten</MenuItem>
                <MenuItem>Twenty</MenuItem>
                <MenuItem>Thirty</MenuItem>
              </Select>
            </FormControl>
            <img
              src="/images/soccer-field.jpg"
              alt="Football pitch"
              style={{
                height: "75vh",
                transform: "translate(0%, 10%)",
              }}
            />
            <div
              style={{
                position: "relative",
              }}
            >
              <AddCircleOutlineRoundedIcon />
            </div>
            <div
              style={{
                position: "relative",
                transform: "translate(0%, -12.5%)",
              }}
            >
              <AddCircleOutlineRoundedIcon />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
