const { UserCard } = require("../db/models");

exports.createUserCard = async (req, res) => {
  try {
    const { cardId, userId, purchasePrice } = req.body;

    const newUserCard = await UserCard.create({
      card_id: cardId,
      user_id: userId,
      purchase_price: purchasePrice,
    });

    res.status(201).json({
      message: "User card created successfully",
      userCard: newUserCard,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user card" });
  }
};

exports.userCards = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log("req.query:", req.query);
    const allUserCards = await UserCard.findAll({
      where: {
        user_id: userId,
      },
    });
    if (!allUserCards) {
      return res.status(404).json({
        success: false,
        message: "No cards found",
      });
    }
    res.status(200).json({
      success: true,
      data: allUserCards,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};
