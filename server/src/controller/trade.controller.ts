import {Request, Response} from "express";
import Trade from "../models/Trade";
import {StandardResponse} from "../dto/StandardResponse";
import {getClaimsFromToken} from "../utils/Jwt.utils";
import Strategy from "../models/Strategy";
import {Op, Sequelize} from "sequelize";
import CurrencyPair from "../models/CurrencyPair";

// Create a Trade
export const saveTrade = async (
  req: Request,
  res: Response<StandardResponse<Trade>>,
) => {
  try {
    let tradeData = req.body;
    tradeData.userId = getClaimsFromToken(
      req.headers.authorization?.split(" ")[1] || "",
    ).id;
    console.log("tradeData", tradeData);

    tradeData = {
      ...tradeData,
      profit : (tradeData.exitPrice-tradeData.entryPrice)*tradeData.positionSize,
    }

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
  res: Response<StandardResponse<Trade[]>>,
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
  res: Response<StandardResponse<Trade>>,
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
  res: Response<StandardResponse<null>>,
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

const calculateGeneralStats = (trades: Trade[]) => {
  const totalTrades = trades.length;
  const winTrades = trades.filter((trade) => trade.status === "win").length;
  const lossTrades = trades.filter((trade) => trade.status === "loss").length;

  const totalProfit = trades.reduce((sum, trade) => {
    const profit = trade.exitPrice - trade.entryPrice;
    return sum + (trade.status === "win" ? profit : -Math.abs(profit));
  }, 0);

  const winRate = totalTrades > 0 ? (winTrades / totalTrades) * 100 : 0;

  return {
    totalTrades,
    winTrades,
    lossTrades,
    winRate,
    totalProfit,
  };
};

// Helper method to calculate monthly profits and losses
const calculateMonthlyStats = (trades: Trade[]) => {
  const monthlyStats: Record<string, { profit: number; loss: number }> = {};

  trades.forEach((trade) => {
    const tradeMonth = new Date(trade.closeDate).toISOString().slice(0, 7); // YYYY-MM
    const profit = trade.exitPrice - trade.entryPrice;

    if (!monthlyStats[tradeMonth]) {
      monthlyStats[tradeMonth] = { profit: 0, loss: 0 };
    }

    if (trade.status === "win") {
      monthlyStats[tradeMonth].profit += profit;
    } else {
      monthlyStats[tradeMonth].loss += Math.abs(profit);
    }
  });

  return Object.entries(monthlyStats).map(([month, stats]) => ({
    month,
    profit: stats.profit.toFixed(2),
    loss: stats.loss.toFixed(2),
  }));
};

// Helper method to get total strategy count
const getTotalStrategyCount = async (userId: number): Promise<number> => {
  try {
    const count = await Strategy.count({
      where: { userId },
    });
    return count;
  } catch (error) {
    console.error("Error fetching strategy count:", error);
    return 0;
  }
};

// Helper method to get the most profitable strategy
const getProfitableStrategy = async (
  userId: number,
): Promise<{ strategyId: number; totalProfit: number } | null> => {
  try {
    const trades = await Trade.findAll({
      where: { userId },
      attributes: ["strategyId", "exitPrice", "entryPrice", "status"],
    });

    if (trades.length === 0) {
      return null;
    }

    const strategyProfits: Record<number, number> = {};

    trades.forEach((trade) => {
      const profit = trade.exitPrice - trade.entryPrice;
      const strategyId = trade.strategyId;

      if (!strategyProfits[strategyId]) {
        strategyProfits[strategyId] = 0;
      }

      if (trade.status === "win") {
        strategyProfits[strategyId] += profit;
      } else {
        strategyProfits[strategyId] -= Math.abs(profit);
      }
    });

    let mostProfitableStrategy: { strategyId: number; totalProfit: number } = {
      strategyId: 0,
      totalProfit: -Infinity,
    };

    Object.entries(strategyProfits).forEach(([strategyId, totalProfit]) => {
      if (totalProfit > mostProfitableStrategy.totalProfit) {
        mostProfitableStrategy = {
          strategyId: parseInt(strategyId),
          totalProfit,
        };
      }
    });

    return mostProfitableStrategy;
  } catch (error) {
    console.error("Error fetching profitable strategy:", error);
    return null;
  }
};

const getHighestWinTradeProfit = async (userId: number) => {
  const highestWinTrade = await Trade.findOne({
    where: {
      userId: userId,
    },
    order: [['profit', 'DESC']],
    attributes: ['profit'],
  });

  return highestWinTrade ? highestWinTrade.profit : 0;
};

// Helper method to get the highest loss trade profit
const getHighestLossTradeProfit = async (userId: number) => {
  const highestLossTrade = await Trade.findOne({
    where: {
      userId: userId,
    },
    order: [['profit', 'ASC']],
    attributes: ['profit'],
  });

  return highestLossTrade ? highestLossTrade.profit : 0;
};

const getMostProfitableStrategy = async (userId: number) => {
  const result = await Trade.findOne({
    where: { userId },
    attributes: [
      'strategyId',
      [Sequelize.fn('SUM', Sequelize.col('profit')), 'totalProfit'],
    ],
    group: ['strategyId'],
    order: [[Sequelize.fn('SUM', Sequelize.col('profit')), 'DESC']],
    include: [
      {
        model: Strategy,
        attributes: ['id', 'name', 'type', 'riskLevel', 'winRate'], // Fetch additional details
      },
    ],
  });

  

  return result
      ? result.strategyId
      : null;
};

export { getMostProfitableStrategy };

const getTotalCurrencyPairsCount = async (userId: number) => {
  return await CurrencyPair.count({
    where: { userId: userId },
  });
}

// Method to calculate net daily P&L
const calculateNetDailyPL = async (userId: number, date: Date) => {
  try {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const trades = await Trade.findAll({
      where: {
        userId: userId,
        openDate: {
          [Op.gte]: startOfDay,
          [Op.lte]: endOfDay,
        },
      },
    });

    let totalDailyProfits = 0;
    let totalDailyLosses = 0;

    trades.forEach((trade) => {
      if (trade.status === "win") {
        totalDailyProfits += trade.exitPrice - trade.entryPrice;
      } else if (trade.status === "loss") {
        totalDailyLosses += trade.entryPrice - trade.exitPrice;
      }
    });

    const netDailyPL = totalDailyProfits - totalDailyLosses;
    return netDailyPL;
  } catch (error) {
    console.error("Error calculating net daily P&L:", error);
    throw error;
  }
};

// Method to calculate Average Holding Period
const getAverageHoldingPeriod = async (userId: number) => {
  try {
    const trades = await Trade.findAll({
      where: { userId },
      attributes: ["id", "openDate", "closeDate"],
    });

    if (trades.length === 0) {
      return 0;
    }

    const totalHoldingPeriod = trades.reduce((sum, trade) => {
      const holdingPeriod =
        new Date(trade.closeDate).getTime() -
        new Date(trade.openDate).getTime();
      return sum + holdingPeriod;
    }, 0);

    const averageHoldingPeriod = totalHoldingPeriod / trades.length;
    const averageHoldingPeriodInMinutes = averageHoldingPeriod / (1000 * 60);

    return averageHoldingPeriodInMinutes;
  } catch (error) {
    console.error("Error calculating average holding period:", error);
    return 0;
  }
};

// Endpoint to get User's Trade Statistics
export const getUserTradeStats = async (
  req: Request,
  res: Response<StandardResponse<any>>,
) => {
  try {
    console.log("Method getUserTradeStats called");
    const token: string = req.headers.authorization?.split(" ")[1] || "";
    const claims = getClaimsFromToken(token);
    const userId = claims.id;

    const trades = await Trade.findAll({
      where: { userId },
    });

    const generalStats = calculateGeneralStats(trades);
    const monthlyProfits = calculateMonthlyStats(trades);
    const totalStrategyCount = await getTotalStrategyCount(userId);
    const highestWinTrade = await getHighestWinTradeProfit(userId);
    const dailyPL = await calculateNetDailyPL(userId, new Date());
    const averageHoldingPeriod = await getAverageHoldingPeriod(userId);
    const highestLossTrade = await getHighestLossTradeProfit(userId);
    const totalCurrencyPairsCount = await getTotalCurrencyPairsCount(userId);

    const data = {
      totalTrades: generalStats.totalTrades,
      winTrades: generalStats.winTrades,
      lossTrades: generalStats.lossTrades,
      winRate: generalStats.winRate.toFixed(2),
      totalProfit: generalStats.totalProfit.toFixed(2),
      totalStrategyCount,
      monthlyProfits,
      highestWinTrade,
      dailyPL,
      averageHoldingPeriod,
      highestLossTrade,
      totalCurrencyPairsCount
    };
    console.log(data);

    return res.status(200).json({
      success: true,
      message: "User trade statistics retrieved successfully.",
      data,
    });
  } catch (error) {
    console.error("Error fetching trade statistics:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
// Helper method to calculate the equity curve for a user
const getEquityCurve = async (userId: number, initialBalance: number) => {
  try {
    // Fetch all trades for the user, ordered by openDate
    const trades = await Trade.findAll({
      where: { userId },
      order: [["openDate", "ASC"]],
      attributes: ["id", "entryPrice", "exitPrice", "status", "openDate"],
    });

    // Initialize equity curve starting from the initial balance
    let equity = initialBalance;
    let equityCurve: { date: string; equity: number }[] = [
      { date: new Date(0).toISOString(), equity: initialBalance }, // Start point (epoch)
    ];

    // Iterate over trades to calculate the cumulative equity
    trades.forEach((trade) => {
      const profitOrLoss =
        trade.status === "win"
          ? trade.exitPrice - trade.entryPrice
          : trade.entryPrice - trade.exitPrice;

      // Update the equity
      equity += profitOrLoss;

      // Push the equity at this trade's close date
      equityCurve.push({
        date: new Date(trade.openDate).toISOString(),
        equity: equity,
      });
    });

    return equityCurve;
  } catch (error) {
    console.error("Error fetching equity curve:", error);
    throw error;
  }
};

// Endpoint to get User's Equity Curve
export const getUserEquityCurve = async (
  req: Request,
  res: Response<StandardResponse<any>>,
) => {
  try {
    const token: string = req.headers.authorization?.split(" ")[1] || "";
    const claims = getClaimsFromToken(token);
    const userId = claims.id;
    const initialBalance = 10000; // Example initial balance of $10,000

    const equityCurve = await getEquityCurve(userId, initialBalance);

    if (equityCurve.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No trades found for this user.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Equity curve retrieved successfully.",
      data: equityCurve,
    });
  } catch (error) {
    console.error("Error fetching equity curve:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
