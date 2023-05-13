"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class GameweekTeamPlayer extends Model {
    static associate(models) {
      GameweekTeamPlayer.belongsTo(models.GameweekTeam, {
        foreignKey: "gameweek_team_id",
        as: "gameweekTeam",
      });
      GameweekTeamPlayer.belongsTo(models.Player, {
        // Updated this line
        foreignKey: "player_id", // Updated this line
        as: "player", // Updated this line
      });
      GameweekTeamPlayer.belongsTo(models.FormationPosition, {
        foreignKey: "formation_position_id",
        as: "formationPosition",
      });
    }
  }

  GameweekTeamPlayer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      gameweek_team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "gameweek_teams",
          key: "id",
        },
      },
      player_id: {
        // Updated this line
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "players", // Updated this line
          key: "id",
        },
      },
      formation_position_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "formation_positions",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "GameweekTeamPlayer",
      tableName: "gameweek_team_players",
      underscored: true,
    }
  );

  return GameweekTeamPlayer;
};
