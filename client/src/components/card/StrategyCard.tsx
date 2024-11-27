import {CalendarIcon, Pencil, Trash, UserIcon} from "lucide-react";

interface StrategyProps {
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
}

const riskLevelColors: { [key: string]: string } = {
    "Low": "text-green-500",
    "Medium": "text-yellow-500",
    "High": "text-red-500"
};

const mapRiskLevelToColor = (riskLevel: string) => riskLevelColors[riskLevel] || "";

export const StrategyCard: React.FC<StrategyProps> = ({
                                                          name,
                                                          type,
                                                          comment,
                                                          description,
                                                          marketType,
                                                          marketCondition,
                                                          riskLevel,
                                                          timeFrame,
                                                          backtestData,
                                                          winRate,
                                                          totalTrades,
                                                          lastModifiedDate,
                                                          userId,
                                                      }) => {
    return (
        <div className="w-full max-w-md bg-white grid shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 ">
                <h2 className="text-xl font-bold text-gray-800">{name}</h2>
                <p className="text-sm text-gray-600 mt-1">{description}</p>
            </div>
            <div className="px-6 py-4 ">
                <div className="flex flex-wrap gap-2">
                    {[type, marketType, marketCondition].map((badge, index) => (
                        <span key={index}
                              className="px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full">
                            {badge}
                        </span>
                    ))}
                </div>
                <div className="border-t border-gray-200 my-4"></div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Risk Level</p>
                        <p className={`text-lg font-semibold ${mapRiskLevelToColor(riskLevel)}`}>{riskLevel}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Time Frame</p>
                        <p className="text-lg font-semibold text-gray-800">{timeFrame}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Win Rate</p>
                        <p className="text-lg font-semibold text-gray-800">{winRate.toFixed(2)}%</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Trades</p>
                        <p className="text-lg font-semibold text-gray-800">{totalTrades}</p>
                    </div>
                </div>
                {backtestData && (
                    <div className="mt-4">
                        <p className="text-sm font-medium text-gray-500">Backtest Data</p>
                        <p className="text-sm text-gray-700">{backtestData}</p>
                    </div>
                )}
                <div className="mt-4">
                    <p className="text-sm font-medium text-gray-500">Comment</p>
                    <p className="text-sm text-gray-700">{comment}</p>
                </div>
                <div className="flex flex-row gap-2 justify-end">
                    <button
                        className="text-blue-600 p-2 hover:text-blue-800 hover:bg-blue-100 rounded-3xl"
                        aria-label="Edit"
                    >
                        <Pencil size={18}/>
                    </button>
                    <button
                        className="text-red-600 p-2 hover:text-red-800 hover:bg-red-100 rounded-3xl"
                        aria-label="Delete"
                    >
                        <Trash size={18}/>
                    </button>
                </div>
            </div>
            <div className="px-6 py-4 bg-blue-50 flex justify-between text-sm text-gray-600 ">
                <div className="flex items-center">
                    <CalendarIcon className="mr-1 h-4 w-4"/>
                    Last modified: {lastModifiedDate.toLocaleDateString()}
                </div>
                <div className="flex items-center">
                    <UserIcon className="mr-1 h-4 w-4"/>
                    User ID: {userId}
                </div>
            </div>
        </div>
    );
};
