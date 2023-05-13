"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Formation extends Model {
    static associate(models) {
      Formation.hasMany(models.GameweekTeam, {
        foreignKey: "formation_id",
        as: "gameweekTeams",
      });
      Formation.hasMany(models.FormationPosition, {
        foreignKey: "formation_id",
        as: "formationPositions",
      });
    }
  }

  Formation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Formation",
      tableName: "formations",
      underscored: true,
    }
  );

  return Formation;
};
