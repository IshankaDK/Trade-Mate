import { CurrencyDto } from "./CurrencyDto";
import { StrategyDto } from "./StrategyDto";

export interface Trade {
    id?: number;
    openDate: string;
    closeDate: string;
    duration: number; // in milliseconds
    currencyPair?: CurrencyDto;
    currencyPairId?: number;
    status: "win" | "loss" | "";
    type: "buy" | "sell" | "";
    entryPrice: number;
    exitPrice: number;
    tradeCategories: string[];
    marketTrend: string;

    strategy?: StrategyDto;
    strategyId?: number;

    stopLossPrice: number;
    takeProfitPrice: number;
    transactionCost: number;
    reason?: string;
    comments?: string;

    userId?: number;
}