"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    static associate(models) {
      // define associations here
      Player.hasMany(models.Card, {
        foreignKey: "player_id",
        as: "cards",
      });
      Player.hasMany(models.GameweekPlayerPoint, {
        foreignKey: "player_id",
        as: "gameweek_player_points",
      });
    }
  }
  Player.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      player_name: DataTypes.STRING,
      position: DataTypes.STRING,
      transfermarkt_value: DataTypes.FLOAT,
      team_name: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Player",
      tableName: "players",
      underscored: true,
    }
  );
  return Player;
};
