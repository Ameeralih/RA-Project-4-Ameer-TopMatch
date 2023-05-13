"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.User, {
        foreignKey: "buyer_id",
        as: "buyer",
      });
      Transaction.belongsTo(models.User, {
        foreignKey: "seller_id",
        as: "seller",
      });
      Transaction.belongsTo(models.Card, {
        foreignKey: "card_id",
        as: "card",
      });
    }
  }

  Transaction.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      buyer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      seller_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      card_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "cards",
          key: "id",
        },
      },
      transaction_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      date_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Transaction",
      tableName: "transactions",
      underscored: true,
    }
  );

  return Transaction;
};
