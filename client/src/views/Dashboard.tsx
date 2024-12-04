import {Bar, Line} from "react-chartjs-2";
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
import {BarChart, Info, LineChart, Scale, Star, TrendingUp} from "lucide-react";
import {Equalizer} from "@mui/icons-material";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

export const Dashboard = () => {
    const data = [{x: "January", y: 5000}, {x: "February", y: 5500}, {x: "March", y: 7000}, {
        x: "April", y: 6200
    }, {x: "May", y: 7200}, {x: "June", y: 6800}, {x: "July", y: 7500}, {x: "August", y: 7100}, {
        x: "September", y: 6800
    }, {x: "October", y: 7400}, {x: "November", y: 8000}, {x: "December", y: 8500},];

    const monthlyData = [{
        month: "January", invested: 1000, balance: 50000, positionsValue: 80000, equity: 50000
    }, {month: "February", invested: 1500, balance: 52000, positionsValue: 90000, equity: 52000}, {
        month: "March", invested: 1200, balance: 53000, positionsValue: 95000, equity: 53000
    }, {month: "April", invested: 1300, balance: 54000, positionsValue: 100000, equity: 54000}, {
        month: "May", invested: 1100, balance: 55000, positionsValue: 95000, equity: 55000
    }, {month: "June", invested: 1400, balance: 56000, positionsValue: 105000, equity: 56000}, {
        month: "July", invested: 1250, balance: 57000, positionsValue: 110000, equity: 57000
    }, {month: "August", invested: 1300, balance: 58000, positionsValue: 115000, equity: 58000}, {
        month: "September", invested: 1350, balance: 59000, positionsValue: 120000, equity: 59000
    }, {month: "October", invested: 1450, balance: 60000, positionsValue: 125000, equity: 60000}, {
        month: "November", invested: 1200, balance: 61000, positionsValue: 110000, equity: 61000
    }, {month: "December", invested: 1500, balance: 62000, positionsValue: 130000, equity: 62000},];

    const positionSizeRatio = monthlyData.map((data) => (data.invested / data.balance) * 100);
    const leverageRatio = monthlyData.map((data) => data.positionsValue / data.equity);

    const chartData = {
        labels: data.map((item) => item.x), datasets: [{
            label: "Equity Curve ($)",
            data: data.map((item) => item.y),
            borderColor: "#6577FE",
            backgroundColor: "rgba(101, 119, 254, 0.2)",
            fill: true,
            tension: 0.4,
        },],
    };

    const chartData2 = {
        labels: monthlyData.map((data) => data.month), datasets: [{
            label: "Position Size Ratio (%)",
            data: positionSizeRatio,
            backgroundColor: "rgba(66, 165, 245, 0.8)",
            borderColor: "#42A5F5",
            borderWidth: 1,
        },],
    };

    const chartData3 = {
        labels: monthlyData.map((data) => data.month), datasets: [{
            label: "Leverage Ratio",
            data: leverageRatio,
            borderColor: "#FF7043",
            borderWidth: 2,
            fill: false,
            tension: 0.1,
        },],
    };

    const commonOptions = {
        responsive: true, maintainAspectRatio: false, plugins: {
            legend: {position: "top"},
        }, scales: {
            x: {
                grid: {display: false},
            }, y: {
                grid: {display: true}, beginAtZero: true,
            },
        },
    };

    function greet(): string {
        const hours = new Date().getHours();
        return (hours < 12) ? "Good morning" : (hours < 18) ? "Good afternoon" : "Good evening";
    }

    return (<div className="min-h-screen py-[1vw]">
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
                    <p className="text-sm">Net Profit: <span className="text-green-600 font-medium">+$450</span>
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
                        <TrendingUp className="w-[1.5vw] h-[1.5vw] mr-[0.5vw] text-green-500"/>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">$99.00</div>
                    </div>
                </div>

                {/* Total Balance (Dynamic) */}
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="text-sm font-medium">Total Balance</h3>
                        <BarChart className="w-[1.5vw] h-[1.5vw] mr-[0.5vw] text-blue-500"/>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">${data.reduce((acc, trade) => acc + trade.y, 0)}</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </div>
                </div>

                {/* Strategies Card */}
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="text-sm font-medium">Strategies</h3>
                        <Info className="w-[1.5vw] h-[1.5vw] mr-[0.5vw] text-purple-500"/>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">15</div>
                    </div>
                </div>

                {/* Win/Loss Ratio Card */}
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="text-sm font-medium">Win/Loss Ratio</h3>
                        <TrendingUp className="w-[1.5vw] h-[1.5vw] mr-[0.5vw] text-green-500"/>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">75% / 25%</div>
                        <p className="text-xs text-muted-foreground">
                            3 wins in the last 4 trades
                        </p>
                    </div>
                </div>

                {/* Risk/Reward Ratio Card */}
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="text-sm font-medium">Risk/Reward Ratio</h3>
                        <Scale className="w-[1.5vw] h-[1.5vw] mr-[0.5vw] text-red-500"/>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">1:3</div>
                        <p className="text-xs text-muted-foreground">
                            Your average risk/reward ratio for last 10 trades
                        </p>
                    </div>
                </div>

                {/* Trade Volume Card */}
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="text-sm font-medium">Trade Volume</h3>
                        <BarChart className="w-[1.5vw] h-[1.5vw] mr-[0.5vw] text-blue-500"/>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">32 Trades</div>
                        <p className="text-xs text-muted-foreground">
                            12 trades this month
                        </p>
                    </div>
                </div>

                {/* Equity Curve Card */}
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="text-sm font-medium">Equity Curve</h3>
                        <LineChart className="w-[1.5vw] h-[1.5vw] mr-[0.5vw] text-green-500"/>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">$12,345.67</div>
                        <p className="text-xs text-muted-foreground">
                            +5.2% this week
                        </p>
                    </div>
                </div>

                {/* Highest Win Trade Card */}
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="text-sm font-medium">Highest Win Trade</h3>
                        <TrendingUp className="w-[1.5vw] h-[1.5vw] mr-[0.5vw] text-green-500"/>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">$500.00</div>
                        <p className="text-xs text-muted-foreground">
                            From your last successful trade
                        </p>
                    </div>
                </div>

                {/* Total Trades by Asset Card */}
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="text-sm font-medium">Total Trades by Asset</h3>

                    </div>
                    <div>
                        <div className="text-2xl font-bold">42 Trades</div>
                        <p className="text-xs text-muted-foreground">
                            Most traded asset this month
                        </p>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-4">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="text-sm font-medium">Saved Currency Pairs</h3>
                        <BarChart className="w-[1.5vw] h-[1.5vw] mr-[0.5vw] text-blue-500"/>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">10 Pairs</div>
                    </div>
                </div>

                {/* Performance vs Benchmark Card */}
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="text-sm font-medium">Performance vs Benchmark</h3>
                        <Equalizer className="w-[1.5vw] h-[1.5vw] mr-[0.5vw] text-orange-500"/>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">+3.5%</div>
                        <p className="text-xs text-muted-foreground">
                            Outperforming S&P 500 by 1.5% this month
                        </p>
                    </div>
                </div>

                {/* Monthly Growth Card */}
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="text-sm font-medium">Monthly Growth</h3>
                        <BarChart className="w-[1.5vw] h-[1.5vw] mr-[0.5vw] text-blue-500"/>
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
                        <Star className="w-[1.5vw] h-[1.5vw] mr-[0.5vw] text-yellow-500"/>
                    </div>
                    <div>
                        <div className="text-2xl font-bold">Scalping</div>
                        <p className="text-xs text-muted-foreground">
                            +12% ROI in the last 30 trades
                        </p>
                    </div>
                </div>
            </div>

            {/*Charts*/}
            <div className="p-[1.5vw] bg-white shadow rounded-lg col-span-2">
                <h2 className="text-[1.2vw] font-semibold text-gray-700 mb-[1vw]">Equity Curve</h2>
                <div className="h-[25vw]">
                    {/*@ts-ignore*/}
                    <Line data={chartData} options={commonOptions}/>
                </div>
            </div>
            <div className="p-[1.5vw] bg-white shadow rounded-lg">
                <h2 className="text-[1.2vw] font-semibold text-gray-700 mb-[1vw]">Position Size Ratio</h2>
                <div className="h-[25vw]">
                    {/*@ts-ignore*/}
                    <Bar data={chartData2} options={commonOptions}/>
                </div>
            </div>
            <div className="p-[1.5vw] bg-white shadow rounded-lg">
                <h2 className="text-[1.2vw] font-semibold text-gray-700 mb-[1vw]">Leverage Ratio</h2>
                <div className="h-[25vw]">
                    {/*@ts-ignore*/}
                    <Line data={chartData3} options={commonOptions}/>
                </div>
            </div>
        </div>
    </div>);
};
