const {
  GameweekTeam,
  GameweekTeamPlayer,
  FormationPosition,
} = require("../db/models");

const getFormationPositions = async () => {
  try {
    const formationPositions = await FormationPosition.findAll();
    return formationPositions;
  } catch (error) {
    console.error("Error fetching formation positions:", error);
    throw error;
  }
};

exports.createGameweekTeam = async (req, res) => {
  try {
    const { userId, gameweekId } = req.body;

    const newGameweekTeam = await GameweekTeam.create({
      userId,
      gameweekId,
    });

    res.status(201).json(newGameweekTeam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating gameweek team" });
  }
};

exports.checkGameweekTeamExists = async (req, res) => {
  try {
    const { userId, gameweekId } = req.query;

    const existingGameweekTeam = await GameweekTeam.findOne({
      where: {
        user_id: userId,
        gameweek_id: gameweekId,
      },
    });

    if (existingGameweekTeam) {
      res.status(200).json({ exists: true, message: "Gameweek team found" });
    } else {
      res
        .status(200)
        .json({ exists: false, message: "Gameweek team not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error checking for existing gameweek team" });
  }
};

const positionMap = {
  1: "goalkeeper",
  2: "defender",
  3: "midfielder",
  4: "forward",
};

exports.patchGameweekTeam = async (req, res) => {
  try {
    const { userId, gameweekId } = req.params;
    const { formationId, playersByPosition } = req.body;

    const [gameweekTeam, created] = await GameweekTeam.findOrCreate({
      where: { user_id: userId, gameweek_id: gameweekId },
      defaults: { formation_id: formationId, points: 0 },
    });

    if (!created) {
      await GameweekTeam.update(
        { formationId },
        { where: { id: gameweekTeam.id } }
      );
    }

    // Delete existing GameweekTeamPlayer records for the current gameweekTeam.id
    await GameweekTeamPlayer.destroy({
      where: { gameweek_team_id: gameweekTeam.id },
    });

    const formationPositions = await getFormationPositions();

    for (const position in playersByPosition) {
      const players = playersByPosition[position];
      for (const player of players) {
        const { id: playerId, index } = player;

        const formationPosition = formationPositions.find((fp) => {
          return (
            fp.formation_id === parseInt(formationId, 10) &&
            fp.position_type.toLowerCase() === position.toLowerCase() &&
            fp.position_name.toLowerCase().endsWith(`_${index + 1}`)
          );
        });

        const formation_position_id = formationPosition.id;

        // Create new GameweekTeamPlayer records
        await GameweekTeamPlayer.create({
          gameweek_team_id: gameweekTeam.id,
          player_id: playerId,
          formation_position_id,
          points: 0,
        });
      }
    }

    // Send success response
    res.status(200).send({ status: "success" });
  } catch (error) {
    console.error("Error updating team:", error);
    res.status(500).send({ status: "error", message: "Error updating team" });
  }
};
