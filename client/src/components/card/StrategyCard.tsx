import {Pencil, Trash} from "lucide-react";

interface StrategyProps {
    id: string;
    name: string;
    type: string;
    comment: string;
    description: string;
    marketType: string;
    marketCondition: string;
    riskLevel: string;
    timeFrame: string;
    backtestData?: string; // Optional
    winRate: number;
    totalTrades: number;
    lastModifiedDate: Date;
    userId: number;
}

export const StrategyCard: React.FC<StrategyProps> = ({
                                                          name,
                                                          type,
                                                          description,
                                                          marketType,
                                                          marketCondition,
                                                          riskLevel,
                                                          timeFrame,
                                                          winRate,
                                                          totalTrades,
                                                      }) => {
    return (
        <div className="relative max-w-sm bg-white rounded-lg shadow-md p-6">

            <h2 className="text-lg font-bold text-gray-800">{name}</h2>
            <p className="text-sm text-gray-600 italic">{type}</p>
            <p className="text-gray-700 mt-2">{description}</p>
            <div className="my-4">
                <p className="text-sm text-gray-800">
                    <span className="font-semibold">Market Type:</span> {marketType}
                </p>
                <p className="text-sm text-gray-800">
                    <span className="font-semibold">Condition:</span> {marketCondition}
                </p>
                <p className="text-sm text-gray-800">
                    <span className="font-semibold">Risk Level:</span> {riskLevel}
                </p>
                <p className="text-sm text-gray-800">
                    <span className="font-semibold">Time Frame:</span> {timeFrame}
                </p>
                <p className="text-sm text-gray-800">
                    <span className="font-semibold">Win Rate:</span> {winRate}%
                </p>
                <p className="text-sm text-gray-800">
                    <span className="font-semibold">Total Trades:</span> {totalTrades}
                </p>
            </div>
            {/*<p className="text-sm text-gray-600 mt-4">*/}
            {/*    Last Modified: {new Date(lastModifiedDate).toLocaleDateString()}*/}
            {/*</p>*/}

            <div className="flex flex-row gap-2 justify-end">
                <button

                    className="text-blue-600 p-2 hover:text-blue-800 hover:bg-blue-100 rounded-3xl"
                    aria-label="Edit"
                >
                    <Pencil size={18}/>
                </button>
                <button
                    className="text-red-600 p-2 hover:text-red-800 hover:bg-red-100  rounded-3xl"
                    aria-label="Delete"
                >
                    <Trash size={18}/>
                </button>
            </div>
        </div>

    );
};
