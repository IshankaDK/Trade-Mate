import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Strategy extends Model {
  public id!: number; // Auto-incremented integer primary key
  public name!: string; // Name of the strategy
  public type!: "Scalping" | "Swing Trading" | "Day Trading" | "Range Trading"; // Type of trading strategy
  public comment?: string; // Optional comment or note about the strategy
  public description!: string; // Detailed description of the strategy
  public marketType!: "Forex" | "Crypto" | "Stocks" | "Commodities" | "Other"; // Type of market this strategy targets
  public marketCondition!: "Bullish" | "Bearish" | "Volatile" | "Sideways"; // Expected market conditions
  public riskLevel!: "Low" | "Medium" | "High"; // Risk level
  public timeFrame!:
    | "1 Minute"
    | "5 Minutes"
    | "15 Minutes"
    | "1 Hour"
    | "4 Hours"
    | "Daily"; // Trading time frame
  public winRate!: number; // Percentage of successful trades
  public totalTrades!: number; // Total number of trades executed
  public lastModifiedDate!: Date; // Date of last modification
  public userId!: number; // Reference to the user who created the strategy
}

Strategy.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // Enables auto-increment
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(
        "Scalping",
        "Swing Trading",
        "Day Trading",
        "Range Trading"
      ),
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    marketType: {
      type: DataTypes.ENUM("Forex", "Crypto", "Stocks", "Commodities", "Other"),
      allowNull: false,
    },
    marketCondition: {
      type: DataTypes.ENUM("Bullish", "Bearish", "Volatile", "Sideways"),
      allowNull: false,
    },
    riskLevel: {
      type: DataTypes.ENUM("Low", "Medium", "High"),
      allowNull: false,
    },
    winRate: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    totalTrades: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    lastModifiedDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Strategy",
    tableName: "strategies",
    timestamps: true,
    updatedAt: "lastModifiedDate",
  }
);

export default Strategy;
