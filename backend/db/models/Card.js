"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    static associate(models) {
      // define association here
      Card.belongsTo(models.Player, {
        foreignKey: "player_id",
        as: "player",
      });
      Card.belongsToMany(models.User, {
        through: models.UserCard,
        foreignKey: "card_id",
        as: "users",
      });
      Card.hasMany(models.Transaction, {
        foreignKey: "card_id",
        as: "transactions",
      });
    }
  }

  Card.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      player_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "players",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Card",
      tableName: "cards",
      underscored: true,
    }
  );

  return Card;
};
