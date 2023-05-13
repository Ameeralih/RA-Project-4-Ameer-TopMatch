"use  strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class GameweekTeam extends Model {
    static associate(models) {
      GameweekTeam.belongsTo(models.Gameweek, {
        foreignKey: "gameweek_id",
        as: "gameweek",
      });
      GameweekTeam.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      GameweekTeam.hasMany(models.GameweekTeamPlayer, {
        foreignKey: "gameweek_team_id",
        as: "gameweekTeamPlayers",
      });
      GameweekTeam.belongsTo(models.Formation, {
        foreignKey: "formation_id",
        as: "formation",
      });
    }
  }

  GameweekTeam.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      gameweek_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "gameweeks",
          key: "id",
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      formation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "formations",
          key: "id",
        },
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "GameweekTeam",
      tableName: "gameweek_teams",
      underscored: true,
    }
  );

  return GameweekTeam;
};
