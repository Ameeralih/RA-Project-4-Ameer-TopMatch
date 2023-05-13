const {
  GameweekTeam,
  GameweekTeamPlayer,
  GameweekPlayerPoint,
  Player,
  Formation,
} = require("../db/models");

exports.getSquadAndPoints = async (req, res) => {
  const userId = req.params.userId;
  const gameweekId = req.params.gameweekId;

  const positionMap = {
    1: "goalkeeper",
    2: "defender",
    3: "midfielder",
    4: "forward",
  };

  try {
    const gameweekTeam = await GameweekTeam.findOne({
      where: {
        user_id: userId,
        gameweek_id: gameweekId,
      },
      include: [
        {
          model: Formation,
          as: "formation",
        },
      ],
    });

    if (!gameweekTeam) {
      return res.status(404).json({
        status: "fail",
        message: "Gameweek team not found",
      });
    }

    const gameweekTeamPlayers = await GameweekTeamPlayer.findAll({
      where: {
        gameweek_team_id: gameweekTeam.id,
      },
      include: [
        {
          model: Player,
          as: "player",
        },
      ],
    });

    const squad = [];
    let totalPoints = 0;

    for (const gtp of gameweekTeamPlayers) {
      const pointsRecord = await GameweekPlayerPoint.findOne({
        where: {
          gameweek_id: gameweekId,
          player_id: gtp.player_id,
        },
      });

      const points = pointsRecord ? pointsRecord.points : 0;
      totalPoints += points;

      squad.push({
        id: gtp.player.id,
        name: gtp.player.player_name,
        position: gtp.player.position,
        points: points,
        image: gtp.player.image,
      });
    }
    const squadWithIndex = [];

    squad.forEach((player) => {
      const position = positionMap[player.position];
      const existingPlayersInPosition = squadWithIndex.filter(
        (p) => p.position === position
      );
      player.index = existingPlayersInPosition.length;
      player.position = position;
      squadWithIndex.push(player);
    });

    const formation = gameweekTeam.formation.name;
    res.status(200).json({
      status: "success",
      data: {
        squad: squadWithIndex,
        totalPoints,
        formation,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "An error occurred while fetching the squad and points",
      error,
    });
  }
};
