const { Card, Player, UserCard } = require("../db/models"); // Import the Card and Player models
const { Sequelize } = require("sequelize");
const sequelize = require("../database");

exports.getUniquePlayers = async (req, res) => {
  try {
    const { userId } = req.params;

    const uniquePlayers = await sequelize.query(
      `
      SELECT DISTINCT ON ("card->player"."id") "card->player"."id",
        "card->player"."player_name",
        "card->player"."position",
        "card->player"."transfermarkt_value",
        "card->player"."team_name",
        "card->player"."image",
        "card->player"."created_at",
        "card->player"."updated_at"
      FROM "user_cards" AS "UserCard"
      LEFT OUTER JOIN "cards" AS "card" ON "UserCard"."card_id" = "card"."id"
      LEFT OUTER JOIN "players" AS "card->player" ON "card"."player_id" = "card->player"."id"
      WHERE "UserCard"."user_id" = :userId
      `,
      {
        replacements: { userId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    res.status(200).json(uniquePlayers);
  } catch (error) {
    console.error("Error fetching unique players:", error);
    res.status(500).json({ message: "Error fetching unique players" });
  }
};
