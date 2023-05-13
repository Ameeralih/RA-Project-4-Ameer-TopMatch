const axios = require("axios");
const puppeteer = require("puppeteer");
const { Player } = require("../db/models");
const cron = require("node-cron");
require("events").EventEmitter.defaultMaxListeners = Infinity;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const parseTransfermarktValue = (valueStr) => {
  const value = valueStr.replace(/[^\d.-]/g, ""); // Remove non-digit, non-dot, non-minus characters
  const floatValue = parseFloat(value);

  if (valueStr.includes("m") || valueStr.includes("M")) {
    return floatValue * 1000000; // If the value is in millions, multiply by 1,000,000
  } else if (valueStr.includes("k") || valueStr.includes("K")) {
    return floatValue * 1000; // If the value is in thousands, multiply by 1,000
  } else {
    return floatValue;
  }
};

const fetchTransfermarktValue = async (playerName) => {
  let browser;
  try {
    // Add a delay before starting the request
    await delay(100); // 2 seconds

    const browser = await puppeteer.launch({
      timeout: 60000,
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36 (MyBot/1.0)"
    );

    await page.goto(
      `https://www.transfermarkt.com/schnellsuche/ergebnis/schnellsuche?query=${encodeURIComponent(
        playerName
      )}&x=0&y=0`
    );

    const valueSelector = ".items tr.odd .rechts.hauptlink";
    await page.waitForSelector(valueSelector, { timeout: 3000 });
    const value = await page.$eval(valueSelector, (el) => el.textContent);

    await browser.close();
    return value;
  } catch (error) {
    console.error(
      `Error fetching transfermarkt value for ${playerName}:`,
      error
    );
    return 0;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

const fetchPlayersData = async () => {
  try {
    const response = await axios.get(
      "https://fantasy.premierleague.com/api/bootstrap-static/"
    );
    const players = response.data.elements;

    for (const player of players) {
      const playerName = `${player.first_name} ${player.second_name}`;
      const transfermarktValue = await fetchTransfermarktValue(playerName);
      const formattedPlayer = {
        id: player.id,
        player_name: playerName,
        position: player.element_type,
        team_name: player.team, // You may need another API or a mapping function to fetch the actual team name
        image: `https://resources.premierleague.com/premierleague/photos/players/110x140/p${player.code}.png`,
        transfermarkt_value: transfermarktValue,
      };
      if (transfermarktValue === "-") {
        formattedPlayer.transfermarkt_value = 0;
      }
      if (transfermarktValue !== 0) {
        // Only update the transfermarkt value if it is not null
        formattedPlayer.transfermarkt_value =
          parseTransfermarktValue(transfermarktValue);
      }
      // Upsert the player data as soon as it is fetched and formatted
      await Player.upsert(formattedPlayer);
      console.log(formattedPlayer);
    }
  } catch (error) {
    console.error(error);
  }
};

const updatePlayers = async () => {
  const playersData = await fetchPlayersData();

  // Update each player in the database using a transaction
  for (const player of playersData) {
    await Player.upsert(player);
  }

  console.log("Players data updated.");
};

// Call the function immediately when the backend starts.
fetchPlayersData();

// Set up the cron schedule for the updatePlayers function.
cron.schedule("0 3 * * MON", updatePlayers); // For example, every Monday at 3:00 AM.
