"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Gameweek extends Model {
    static associate(models) {
      Gameweek.hasMany(models.GameweekTeam, {
        foreignKey: "gameweek_id",
        as: "gameweekTeams",
      });
      Gameweek.hasMany(models.GameweekPlayerPoint, {
        foreignKey: "gameweek_id",
        as: "gameweekPlayerPoints",
      });
    }
  }

  Gameweek.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Gameweek",
      tableName: "gameweeks",
      underscored: true,
    }
  );

  return Gameweek;
};
