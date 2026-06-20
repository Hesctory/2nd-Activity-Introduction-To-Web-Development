import { DataTypes } from "sequelize";
import { sequelize } from "../database.js";

// A Potion has the four fields required by the statement:
// name, description, image (URL or path) and price.
export const Potion = sequelize.define(
  "Potion",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // We store only the image URL / path, as allowed by the statement.
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Price is kept in "coins" (moedas). Stored as a float so prices can be
    // fractional if needed; the sample data uses whole numbers.
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  },
  {
    tableName: "potions",
  }
);
