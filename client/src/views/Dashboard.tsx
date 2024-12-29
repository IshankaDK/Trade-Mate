import { Bar, Line } from "react-chartjs-2";
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import {
    BarChart,
    Info,
    LineChart,
    Scale,
    Star,
    TrendingUp,
} from "lucide-react";
import { Equalizer } from "@mui/icons-material";
import { useEffect, useState } from "react";
import APIClient from "../util/APIClient";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface TradeData {
    tradeId: number;
    profit: number;
}
interface MonthlyProfits {
    month: string;
    profit: number;
    loss: number;
}

interface StatProps {
    totalTrades: number;
    winTrades: number;
    lossTrades: number;
    totalProfit: number;
    totalStrategyCount: number;
    monthlyProfits: MonthlyProfits[];
    tradeData: TradeData;
    dailyPL: number;
    averageHoldingPeriod: number;
}

interface EquityData {
    date: string;
    equity: number;
}

export const Dashboard = () => {
    const [stats, setStats] = useState<StatProps | null>(null);
    const [equityData, setEquityData] = useState<EquityData[]>([]);

    const data = equityData.map((data) => ({
        x: new Date(data.date).toLocaleString("default", {
            month: "short",
            year: "numeric",
        }),
        y: data.equity,
    }));

    useEffect(() => {
        APIClient.get("/trades/users/trade-stats", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }).then((response) => {
            console.log(response.data.data);
            setStats(response.data.data);
        });

        APIClient.get("/trades/users/trade-stats/equity", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }).then((response) => {
            console.log(response.data.data);
            setEquityData(response.data.data);
        });
    }, []);

    useEffect(() => { }, []);

    const chartData = {
        labels: data.map((item) => item.x),
        datasets: [
            {
                label: "Equity Curve ($)",
                data: data.map((item) => item.y),
                borderColor: "#6577FE",
                backgroundColor: "rgba(101, 119, 254, 0.2)",
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: "top" },
        },
        scales: {
            x: {
                grid: { display: false },
            },
            y: {
                grid: { display: true },
                beginAtZero: true,
            },
        },
    };

    function greet(): string {
        const hours = new Date().getHours();
        return hours < 12
            ? "Good morning"
            : hours < 18
                ? "Good afternoon"
                : "Good evening";
    }
    const [isDays, setIsDays] = useState(true); // To toggle between days and minutes
    const handleToggle = (unit: string) => {
        setIsDays(unit === "days");
    };

    return (
        <div className="min-h-screen py-[1vw]">
            <div className="flex items-center justify-between  p-[1.5vw] rounded-lg shadow-sm">
                {/* Greeting Message */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        {greet()} <span className="text-blue-600">Kasun DK</span> 👋
                    </h1>
                    <p className="text-gray-600 mt-[0.5vw]">
                        Analyze your trading performance and stay on top of your goals.
                    </p>
                </div>

                {/* Profile/Quick Stats Section */}
                <div className="flex items-center space-x-[1vw]">
                    <div className="text-gray-700">
                        <p className="font-semibold">Today's Performance</p>
                        <p className="text-sm">
                            Net Profit:{" "}
                            <span className="text-green-600 font-medium">+$450</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-2 grid grid-cols-1 lg:grid-cols-4 gap-[2vw]">
                <div className="grid grid-cols-1 col-span-4 md:grid-cols-2 lg:grid-cols-4 gap-[2vw]">
                    {/* Total Balance Card */}
                    <div className="bg-white shadow-lg rounded-lg p-4">
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="text-sm font-medium">Total Balance</h3>
                            <TrendingUp className="w-[1.5vw] h-[1.5vw] mr-[0.5vw] text-green-500" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{stats?.totalProfit}</div>
                        </div>
                    </div>

                    {/* Strategies Card */}
                    <div className="bg-white shadow-lg rounded-lg p-4">
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="text-sm font-medium">Strategies</h3>
                            <Info className="w-[1.5vw] h-[1.5vw] mr-[0.5vw] text-purple-500" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">
                                {stats?.totalStrategyCount ? stats.totalStrategyCount : 0}
                            </div>
                        </div>
                    </div>

                    {/* Win/Loss Ratio Card */}
                    <div className="bg-white shadow-lg rounded-lg p-4">
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="text-sm font-medium">Win/Loss Ratio</h3>
                            <TrendingUp className="w-[1.5vw] h-[1.5vw] mr-[0.5vw] text-green-500" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">
                                {stats?.winTrades}/{stats?.lossTrades}
                            </div>
                        </div>
                    </div>


                    {/* Trade Volume Card */}
                    <div className="bg-white shadow-lg rounded-lg p-4">
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="text-sm font-medium">Trade Volume</h3>
                            <BarChart className="w-[1.5vw] h-[1.5vw] mr-[0.5vw] text-blue-500" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">
                                {`${stats?.totalTrades} Trades`}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {/* 12 trades this month */}
                            </p>
                        </div>
                    </div>

                    {/* Equity Curve Card */}
                    <div className="bg-white shadow-lg rounded-lg p-4">
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="text-sm font-medium">Equity Curve</h3>
                            <LineChart className="w-[1.5vw] h-[1.5vw] mr-[0.5vw] text-green-500" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">$12,345.67</div>
                            <p className="text-xs text-muted-foreground">+5.2% this week</p>
                        </div>
                    </div>

                    {/* Highest Win Trade Card */}
                    <div className="bg-white shadow-lg rounded-lg p-4">
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="text-sm font-medium">Highest Win Trade</h3>
                            <TrendingUp className="w-[1.5vw] h-[1.5vw] mr-[0.5vw] text-green-500" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">$500.00</div>
                            <p className="text-xs text-muted-foreground">
                                From your last successful trade
                            </p>
                        </div>
                    </div>

                    {/* Highest Loss Trade Card */}
                    <div className="bg-white shadow-lg rounded-lg p-4">
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="text-sm font-medium">Highest Loss Trade</h3>
                            <TrendingUp className="w-[1.5vw] h-[1.5vw] mr-[0.5vw] text-red-500" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{ }</div>
                            <p className="text-xs text-muted-foreground">
                                From your last unsuccessful trade
                            </p>
                        </div>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-4">
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="text-sm font-medium">Saved Currency Pairs</h3>
                            <Equalizer className="w-[1.5vw] h-[1.5vw] mr-[0.5vw] text-orange-500" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">10 Pairs</div>
                        </div>
                    </div>

                    {/* Monthly Growth Card */}
                    <div className="bg-white shadow-lg rounded-lg p-4">
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="text-sm font-medium">Monthly Growth</h3>
                            <BarChart className="w-[1.5vw] h-[1.5vw] mr-[0.5vw] text-blue-500" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">+5.7%</div>
                            <p className="text-xs text-muted-foreground">
                                Growth from last month
                            </p>
                        </div>
                    </div>

                    {/* Most Profitable Strategy Card */}
                    <div className="bg-white shadow-lg rounded-lg p-4">
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="text-sm font-medium">Most Profitable Strategy</h3>
                            <Star className="w-[1.5vw] h-[1.5vw] mr-[0.5vw] text-yellow-500" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">Scalping</div>
                            <p className="text-xs text-muted-foreground">
                                +12% ROI in the last 30 trades
                            </p>
                        </div>
                    </div>

                    {/* averageHoldingPeriod */}
                    <div className="bg-white shadow-lg rounded-lg p-4">
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="text-sm font-medium">Average Holding Period</h3>
                            <Star className="w-[1.5vw] h-[1.5vw] mr-[0.5vw] text-yellow-500" />
                        </div>
                        <div className="flex space-x-2 mb-2">
                            <button
                                onClick={() => handleToggle("days")}
                                className={`px-1 py-0.5 text-xs rounded-lg ${isDays ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
                            >
                                Days
                            </button>
                            <button
                                onClick={() => handleToggle("minutes")}
                                className={`px-1 py-0.5 text-xs rounded-lg ${!isDays ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
                            >
                                Minutes
                            </button>
                        </div>


                        <div>
                            <div className="text-2xl font-bold">
                                {isDays
                                    ? `${((stats?.averageHoldingPeriod ?? 0) / 24 / 60).toFixed(1)} Days`
                                    : `${stats?.averageHoldingPeriod} Minutes`}
                            </div>
                        </div>
                    </div>

                    {/* Daily P/L */}
                    <div className="bg-white shadow-lg rounded-lg p-4">
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="text-sm font-medium">Daily P/L</h3>
                            <Star className="w-[1.5vw] h-[1.5vw] mr-[0.5vw] text-yellow-500" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">{stats?.dailyPL}</div>
                            <p className="text-xs text-muted-foreground">
                                Daily P/L for last 10 trades
                            </p>
                        </div>
                    </div>
                </div>

                {/*Charts*/}
                <div className="p-[1.5vw] bg-white shadow rounded-lg col-span-2">
                    <h2 className="text-[1.2vw] font-semibold text-gray-700 mb-[1vw]">
                        Equity Curve
                    </h2>
                    <div className="h-[25vw]">
                        {/*@ts-ignore*/}
                        <Line data={chartData} options={commonOptions} />
                    </div>
                </div>
                <div className="p-[1.5vw] bg-white shadow rounded-lg">
                    <h2 className="text-[1.2vw] font-semibold text-gray-700 mb-[1vw]">
                        Position Size Ratio
                    </h2>
                    <div className="h-[25vw]">
                        {/*@ts-ignore*/}
                        {/* <Bar data={chartData2} options={commonOptions} /> */}
                    </div>
                </div>
                <div className="p-[1.5vw] bg-white shadow rounded-lg">
                    <h2 className="text-[1.2vw] font-semibold text-gray-700 mb-[1vw]">
                        Leverage Ratio
                    </h2>
                    <div className="h-[25vw]">
                        {/*@ts-ignore*/}
                        {/* <Line data={chartData3} options={commonOptions} /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};
