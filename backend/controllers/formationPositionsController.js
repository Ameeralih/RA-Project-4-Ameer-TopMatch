const { FormationPosition } = require("../db/models"); // Import your FormationPosition model

exports.getFormationPositions = async (req, res) => {
  try {
    const formationPositions = await FormationPosition.findAll();

    res.status(200).json({
      status: "success",
      data: {
        formationPositions,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Error fetching formation positions",
      error,
    });
  }
};
