"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class FormationPosition extends Model {
    static associate(models) {
      FormationPosition.belongsTo(models.Formation, {
        foreignKey: "formation_id",
        as: "formation",
      });
      FormationPosition.hasMany(models.GameweekTeamPlayer, {
        foreignKey: "formation_position_id",
        as: "gameweekTeamPlayers",
      });
    }
  }

  FormationPosition.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      formation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "formations",
          key: "id",
        },
      },
      position_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      position_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "FormationPosition",
      tableName: "formation_positions",
      underscored: true,
    }
  );

  return FormationPosition;
};
