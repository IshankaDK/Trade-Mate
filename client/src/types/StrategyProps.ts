import * as dayjs from "dayjs";

export interface StrategyProps {
    id: string;
    name: string;
    type: string;
    comment?: string;
    description: string;
    marketType: string;
    marketCondition: string;
    riskLevel: string;
    timeFrame: string;
    backtestData?: string;
    winRate: number;
    totalTrades: number;
    lastModifiedDate: Date;
    userId: number;
    timeFrameStart: dayjs.Dayjs | null;
    timeFrameEnd: dayjs.Dayjs | null;
}