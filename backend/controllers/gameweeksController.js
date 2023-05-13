const { Gameweek } = require("../db/models");
const { Op } = require("sequelize");

exports.getUpcomingGameweek = async (req, res) => {
  try {
    const currentDate = new Date();
    const upcomingGameweek = await Gameweek.findOne({
      where: {
        start_date: {
          [Op.gt]: currentDate,
        },
      },
      order: [["start_date", "ASC"]],
    });

    if (upcomingGameweek) {
      res.status(200).json(upcomingGameweek);
    } else {
      res.status(404).json({ message: "No upcoming gameweek found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching the upcoming gameweek",
    });
  }
};
