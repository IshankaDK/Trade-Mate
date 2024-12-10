import { Request, Response } from "express";
import Strategy from "../models/Strategy";
import { StandardResponse } from "../dto/StandardResponse";
import { getClaimsFromToken } from "../utils/Jwt.utils";
import User from "../models/User";

// Create a new Strategy
export const createStrategy = async (
  req: Request,
  res: Response<StandardResponse<Strategy>>
) => {
  try {
    const strategyData = req.body;
    strategyData.userId = getClaimsFromToken(
      req.headers.authorization?.split(" ")[1] || ""
    ).id;

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
  res: Response<StandardResponse<Strategy[]>>
) => {
  try {
    console.log("Method getAllStrategiesByUser called");
    const token: string = req.headers.authorization?.split(" ")[1] || "";
    const claims = getClaimsFromToken(token);
    const userId = claims.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required.",
      });
    }

    const strategies = await Strategy.findAll({
      where: { userId },
    });

    return res.status(200).json({
      success: true,
      message: "Strategies retrieved successfully.",
      data: strategies,
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
  res: Response<StandardResponse<Strategy>>
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
  res: Response<StandardResponse<Strategy>>
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
  res: Response<StandardResponse<null>>
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
