"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class GameweekPlayerPoint extends Model {
    static associate(models) {
      GameweekPlayerPoint.belongsTo(models.Gameweek, {
        foreignKey: "gameweek_id",
        as: "gameweek",
      });
      GameweekPlayerPoint.belongsTo(models.Player, {
        foreignKey: "player_id",
        as: "player",
      });
    }
  }

  GameweekPlayerPoint.init(
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
      player_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "players",
          key: "id",
        },
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "GameweekPlayerPoint",
      tableName: "gameweek_player_points",
      underscored: true,
    }
  );

  return GameweekPlayerPoint;
};
