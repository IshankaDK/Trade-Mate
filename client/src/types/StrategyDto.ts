export interface StrategyDto {
  id: number;
  name: string;
  type: string;
  comment?: string;
  description: string;
  marketType: string;
  marketCondition: string;
  riskLevel: string;
  winRate: number;
  totalTrades: number;
  lastModifiedDate: Date;
  userId: number;
}
