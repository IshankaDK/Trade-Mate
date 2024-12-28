import { Request, Response } from "express";
import Trade from "../models/Trade";
import { StandardResponse } from "../dto/StandardResponse";
import { getClaimsFromToken } from "../utils/Jwt.utils";

// Create a Trade
export const saveTrade = async (
    req: Request,
    res: Response<StandardResponse<Trade>>
) => {
    try {
        const tradeData = req.body;
        tradeData.userId = getClaimsFromToken(
            req.headers.authorization?.split(" ")[1] || ""
        ).id;
        console.log("tradeData", tradeData);

        const trade = await Trade.create(tradeData);
        return res.status(201).json({
            success: true,
            message: "Trade created successfully.",
        });
    } catch (error) {
        console.error("Error creating trade:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Get all Trades by User
export const getAllTradesByUser = async (
    req: Request,
    res: Response<StandardResponse<Trade[]>>
) => {
    try {
        const token: string = req.headers.authorization?.split(" ")[1] || "";
        const claims = getClaimsFromToken(token);
        const userId = claims.id;

        const trades = await Trade.findAll({
            where: { userId },
            include: ["strategy", "currencyPair"], // Adjust associations as needed
        });

        return res.status(200).json({
            success: true,
            message: "Trades retrieved successfully.",
            data: trades,
        });
    } catch (error) {
        console.error("Error fetching trades:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Get a Trade by ID
export const getTradeById = async (
    req: Request,
    res: Response<StandardResponse<Trade>>
) => {
    try {
        const { id } = req.params;

        const trade = await Trade.findByPk(id, {
            include: ["strategy", "currencyPair"], // Adjust associations as needed
        });

        if (!trade) {
            return res.status(404).json({
                success: false,
                message: "Trade not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Trade retrieved successfully.",
            data: trade,
        });
    } catch (error) {
        console.error("Error fetching trade:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Delete a Trade by ID
export const deleteTradeById = async (
    req: Request,
    res: Response<StandardResponse<null>>
) => {
    try {
        const { id } = req.params;

        const trade = await Trade.findByPk(id);

        if (!trade) {
            return res.status(404).json({
                success: false,
                message: "Trade not found.",
            });
        }

        await trade.destroy();

        return res.status(200).json({
            success: true,
            message: "Trade deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting trade:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};
