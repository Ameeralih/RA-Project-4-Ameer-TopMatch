const { Card, Player } = require("../db/models");

exports.createCard = async (req, res) => {
  try {
    const { playerId } = req.body;

    const newCard = await Card.create({
      player_id: playerId,
    });

    res.status(201).json(newCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating card" });
  }
};

exports.getPlayerFromCardId = async (req, res) => {
  try {
    const { cardId } = req.query;

    const card = await Card.findOne({
      where: {
        id: cardId,
      },
    });

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Card not found",
      });
    }

    const player = await Player.findOne({
      where: {
        id: card.player_id,
      },
    });

    if (!player) {
      return res.status(404).json({
        success: false,
        message: "Player not found",
      });
    }

    res.status(200).json({
      success: true,
      data: player,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};
