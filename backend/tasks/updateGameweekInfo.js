const axios = require("axios");
const { Gameweek } = require("../db/models");

const fetchGameweeks = async () => {
  try {
    const response = await axios.get(
      "https://fantasy.premierleague.com/api/bootstrap-static/"
    );
    return response.data.events;
  } catch (error) {
    console.error(error);
  }
};

const processGameweeks = (gameweeks) => {
  return gameweeks.map((gameweek) => ({
    id: gameweek.id,
    start_date: gameweek.deadline_time,
    end_date: null, // End date is not provided by the API, so you might need to calculate it based on the start date of the next gameweek
  }));
};

const storeGameweeks = async (gameweekData) => {
  try {
    await Gameweek.bulkCreate(gameweekData, {
      updateOnDuplicate: ["start_date", "end_date"],
    });
  } catch (error) {
    console.error(error);
  }
};

const main = async () => {
  const gameweeksData = await fetchGameweeks();
  const processedGameweeks = processGameweeks(gameweeksData);
  await storeGameweeks(processedGameweeks);
};

main();
