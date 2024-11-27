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

export const Dashboard = () => {
    const data = [
        {x: "January", y: 5000},
        {x: "February", y: 5500},
        {x: "March", y: 7000},
        {x: "April", y: 6200},
        {x: "May", y: 7200},
        {x: "June", y: 6800},
        {x: "July", y: 7500},
        {x: "August", y: 7100},
        {x: "September", y: 6800},
        {x: "October", y: 7400},
        {x: "November", y: 8000},
        {x: "December", y: 8500},
    ];

    const monthlyData = [
        {month: "January", invested: 1000, balance: 50000, positionsValue: 80000, equity: 50000},
        {month: "February", invested: 1500, balance: 52000, positionsValue: 90000, equity: 52000},
        {month: "March", invested: 1200, balance: 53000, positionsValue: 95000, equity: 53000},
        {month: "April", invested: 1300, balance: 54000, positionsValue: 100000, equity: 54000},
        {month: "May", invested: 1100, balance: 55000, positionsValue: 95000, equity: 55000},
        {month: "June", invested: 1400, balance: 56000, positionsValue: 105000, equity: 56000},
        {month: "July", invested: 1250, balance: 57000, positionsValue: 110000, equity: 57000},
        {month: "August", invested: 1300, balance: 58000, positionsValue: 115000, equity: 58000},
        {month: "September", invested: 1350, balance: 59000, positionsValue: 120000, equity: 59000},
        {month: "October", invested: 1450, balance: 60000, positionsValue: 125000, equity: 60000},
        {month: "November", invested: 1200, balance: 61000, positionsValue: 110000, equity: 61000},
        {month: "December", invested: 1500, balance: 62000, positionsValue: 130000, equity: 62000},
    ];

    const positionSizeRatio = monthlyData.map((data) => (data.invested / data.balance) * 100);
    const leverageRatio = monthlyData.map((data) => data.positionsValue / data.equity);

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

    const chartData2 = {
        labels: monthlyData.map((data) => data.month),
        datasets: [
            {
                label: "Position Size Ratio (%)",
                data: positionSizeRatio,
                backgroundColor: "rgba(66, 165, 245, 0.8)",
                borderColor: "#42A5F5",
                borderWidth: 1,
            },
        ],
    };

    const chartData3 = {
        labels: monthlyData.map((data) => data.month),
        datasets: [
            {
                label: "Leverage Ratio",
                data: leverageRatio,
                borderColor: "#FF7043",
                borderWidth: 2,
                fill: false,
                tension: 0.1,
            },
        ],
    };

    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {position: "top"},
        },
        scales: {
            x: {
                grid: {display: false},
            },
            y: {
                grid: {display: true},
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="min-h-screen py-[1vw]">
            <div className="flex items-center justify-between  p-[1.5vw] rounded-lg shadow-sm">
                {/* Greeting Message */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Welcome Back, <span className="text-blue-600">Kasun DK</span> 👋
                    </h1>
                    <p className="text-gray-600 mt-[0.5vw]">
                        Analyze your trading performance and stay on top of your goals.
                    </p>
                </div>

                {/* Profile/Quick Stats Section */}
                <div className="flex items-center space-x-[1vw]">
                    {/* Optional Profile Image */}
                    {/*<img*/}
                    {/*    src="https://via.placeholder.com/50"*/}
                    {/*    alt="Profile"*/}
                    {/*    className="w-[3vw] h-[3vw] rounded-full object-cover border border-gray-300"*/}
                    {/*/>*/}
                    <div className="text-gray-700">
                        <p className="font-semibold">Today's Performance</p>
                        <p className="text-sm">Net Profit: <span className="text-green-600 font-medium">+$450</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-2 grid grid-cols-1 lg:grid-cols-3 gap-[2vw]">
                {/* Left Panel */}
                <div className="space-y-[1.5vw]">
                    <div className="p-[1.5vw] bg-white shadow rounded-lg">
                        <h2 className="text-[1.2vw] font-semibold text-gray-700 mb-[1vw]">Recent Trades</h2>
                        <ul className="text-gray-600 space-y-[0.5vw]">
                            <li>Trade 1: +$500</li>
                            <li>Trade 2: -$200</li>
                            <li>Trade 3: +$150</li>
                        </ul>
                    </div>

                    <div className="p-[1.5vw] bg-white shadow rounded-lg">
                        <h2 className="text-[1.2vw] font-semibold text-gray-700 mb-[1vw]">Statistics</h2>
                        <p className="text-gray-600">Total Trades: 3</p>
                        <p className="text-gray-600">Winning Trades: 2</p>
                        <p className="text-gray-600">Losing Trades: 1</p>
                        <p className="text-gray-600">Net Profit: $450</p>
                    </div>
                </div>

                {/* Center Charts */}
                <div className="lg:col-span-2 space-y-[2vw]">
                    <div className="p-[1.5vw] bg-white shadow rounded-lg">
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
            </div>
        </div>
    );
};
