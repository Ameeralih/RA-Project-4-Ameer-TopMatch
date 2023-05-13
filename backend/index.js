const express = require("express");
const app = express();
const usersRoutes = require("./routes/usersRoutes");
const playersRoutes = require("./routes/playersRoutes");
const gameweeksRoutes = require("./routes/gameweeksRoutes");
const cardsRoutes = require("./routes/cardsRoutes");
const userCardsRoutes = require("./routes/userCardsRoutes");
const gameweekTeamsRoutes = require("./routes/gameweekTeamsRoutes");
const availablePlayersRoutes = require("./routes/availablePlayersRoutes");
const formationPositionsRoutes = require("./routes/formationPositionsRoutes");
const myPointsRoutes = require("./routes/myPointsRoutes");
const cors = require("cors");
// require("./tasks/updatePlayers");
// require("./tasks/updateGameweekInfo");

app.use(express.json());
app.use(cors());
app.use("/api/users", usersRoutes);
app.use("/api/players", playersRoutes);
app.use("/api/gameweeks", gameweeksRoutes);
app.use("/api/cards", cardsRoutes);
app.use("/api/user-cards", userCardsRoutes);
app.use("/api/gameweekteams", gameweekTeamsRoutes);
app.use("/api/availablePlayers", availablePlayersRoutes);
app.use("/api/formationPositions", formationPositionsRoutes);
app.use("/api/mypoints", myPointsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
