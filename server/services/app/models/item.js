"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.Category, {
        foreignKey: "categoryId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      // Item.belongsTo(models.User, {
      //   foreignKey: "authorId",
      //   onDelete: "CASCADE",
      //   onUpdate: "CASCADE",
      // });
      Item.hasMany(models.Ingredient, {
        foreignKey: "itemId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Item.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Item name should be filled",
          },
          notNull: {
            msg: "Item name should be filled",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Item description should be filled",
          },
          notNull: {
            msg: "Item description should be filled",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            msg: "Minimum price should be 1",
            args: 1,
          },
          notEmpty: {
            msg: "Item price should be filled",
          },
          notNull: {
            msg: "Item price should be filled",
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Image link should be filled",
          },
          notNull: {
            msg: "Image link should be filled",
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Item price should be filled",
          },
          notNull: {
            msg: "Item price should be filled",
          },
        },
      },
      authorId: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  Item.beforeValidate((instance) => {
    instance.stock = 999;
  });
  return Item;
};
