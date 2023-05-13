const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserCard extends Model {
    static associate(models) {
      UserCard.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      UserCard.belongsTo(models.Card, {
        foreignKey: "card_id",
        as: "card",
      });
    }
  }

  UserCard.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      card_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "cards",
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
      purchase_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UserCard",
      tableName: "user_cards",
      timestamps: true,
      underscored: true,
    }
  );

  return UserCard;
};
