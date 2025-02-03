import { Request, Response } from "express";
import Strategy from "../models/Strategy";
import { StandardResponse } from "../dto/StandardResponse";
import { getClaimsFromToken } from "../utils/Jwt.utils";
import User from "../models/User";
import Trade from "../models/Trade";

// Create a new Strategy
export const createStrategy = async (
  req: Request,
  res: Response<StandardResponse<Strategy>>,
) => {
  try {
    console.log("Method createStrategy called");
    const strategyData = req.body;
    console.log(strategyData);
    strategyData.userId = getClaimsFromToken(
      req.headers.authorization?.split(" ")[1] || "",
    ).id;

    // Validate that all required fields are provided
    const existingStrategy = await Strategy.findOne({
      where: {
        name: strategyData.name,
        userId: strategyData.userId,
        type: strategyData.type,
      },
    });

    if (existingStrategy) {
      return res.status(400).json({
        success: false,
        message: "Strategy with this name already exists for user.",
      });
    }

    const strategy = await Strategy.create(strategyData);
    return res.status(201).json({
      success: true,
      message: "Strategy created successfully.",
      data: strategy,
    });
  } catch (error) {
    console.error("Error creating strategy:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
// Get all Strategies

export const getAllStrategiesByUser = async (
  req: Request,
  res: Response<StandardResponse<any[]>>,
) => {
  try {
    console.log("Method getAllStrategiesByUser called");

    const token: string | undefined = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token is missing.",
      });
    }

    const claims = getClaimsFromToken(token);
    if (!claims || !claims.id) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Invalid token.",
      });
    }

    const userId = claims.id;
    const strategies = await Strategy.findAll({ where: { userId } });

    // Fetch trades and calculate win rate concurrently
    const strategiesWithWinRate = await Promise.all(
      strategies.map(async (strategy) => {
        const trades = await Trade.findAll({
          where: { strategyId: strategy.id },
        });
        const totalTrades: number = trades.length;
        const winningTrades = trades.filter(
          (trade) => trade.status === "win",
        ).length;
        const winRate =
          totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;

        return {
          ...strategy.get(), // Convert to plain object
          winRate: parseFloat(winRate.toFixed(2)), // Ensure numeric type
          totalTrades,
        };
      }),
    );

    return res.status(200).json({
      success: true,
      message: "Strategies retrieved successfully.",
      data: strategiesWithWinRate,
    });
  } catch (error) {
    console.error("Error fetching strategies:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get a Strategy by ID
export const getStrategyById = async (
  req: Request,
  res: Response<StandardResponse<Strategy>>,
) => {
  try {
    const { id } = req.params;
    const strategy = await Strategy.findByPk(id);
    if (!strategy) {
      return res.status(404).json({
        success: false,
        message: "Strategy not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Strategy retrieved successfully.",
      data: strategy,
    });
  } catch (error) {
    console.error("Error fetching strategy:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Update a Strategy by ID
export const updateStrategyById = async (
  req: Request,
  res: Response<StandardResponse<Strategy>>,
) => {
  try {
    console.log("Method updateStrategyById called");
    console.log(req.body);
    const { id, userId } = req.body;
    const updatedData = req.body;

    // Validate that id and userId are provided
    if (!id || !userId) {
      return res.status(400).json({
        success: false,
        message: "Strategy ID and User ID are required.",
      });
    }

    // Check if the user exists in the database
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Find the strategy by ID
    const strategy = await Strategy.findByPk(id);
    if (!strategy) {
      return res.status(404).json({
        success: false,
        message: "Strategy not found.",
      });
    }

    // Update the strategy
    await strategy.update(updatedData);

    // Respond with the updated strategy data
    return res.status(200).json({
      success: true,
      message: "Strategy updated successfully.",
      data: strategy,
    });
  } catch (error) {
    console.error("Error updating strategy:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Delete a Strategy by ID
export const deleteStrategyById = async (
  req: Request,
  res: Response<StandardResponse<null>>,
) => {
  try {
    const { id } = req.params;
    const strategy = await Strategy.findByPk(id);

    if (!strategy) {
      return res.status(404).json({
        success: false,
        message: "Strategy not found.",
      });
    }

    await strategy.destroy();
    return res.status(200).json({
      success: true,
      message: "Strategy deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting strategy:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Endpoint to get trades by strategy id
export const getAssociatedTrades = async (
  req: Request,
  res: Response<StandardResponse<any>>,
) => {
  try {
    const { strategyId } = req.body;

    // Fetch trades associated with the given strategyId
    const trades = await Trade.findAll({
      where: {
        strategyId, // Query trades by strategyId
      },
    });

    if (!trades || trades.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No trades found for the given strategy ID.",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Trades fetched successfully.",
      data: trades,
    });
  } catch (error) {
    console.error("Error fetching trades by strategy ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
