
import { Line, Bar } from "react-chartjs-2";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    BarElement,
    Filler,
} from "chart.js";

// Register Chart.js components
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
        { x: "January", y: 5000 },
        { x: "February", y: 5500 },
        { x: "March", y: 7000 },
        { x: "April", y: 6200 },
        { x: "May", y: 7200 },
        { x: "June", y: 6800 },
        { x: "July", y: 7500 },
        { x: "August", y: 7100 },
        { x: "September", y: 6800 },
        { x: "October", y: 7400 },
        { x: "November", y: 8000 },
        { x: "December", y: 8500 },
    ];

    // Monthly data for Position Size Ratio and Leverage Ratio
    const monthlyData = [
        { month: "January", invested: 1000, balance: 50000, positionsValue: 80000, equity: 50000 },
        { month: "February", invested: 1500, balance: 52000, positionsValue: 90000, equity: 52000 },
        { month: "March", invested: 1200, balance: 53000, positionsValue: 95000, equity: 53000 },
        { month: "April", invested: 1300, balance: 54000, positionsValue: 100000, equity: 54000 },
        { month: "May", invested: 1100, balance: 55000, positionsValue: 95000, equity: 55000 },
        { month: "June", invested: 1400, balance: 56000, positionsValue: 105000, equity: 56000 },
        { month: "July", invested: 1250, balance: 57000, positionsValue: 110000, equity: 57000 },
        { month: "August", invested: 1300, balance: 58000, positionsValue: 115000, equity: 58000 },
        { month: "September", invested: 1350, balance: 59000, positionsValue: 120000, equity: 59000 },
        { month: "October", invested: 1450, balance: 60000, positionsValue: 125000, equity: 60000 },
        { month: "November", invested: 1200, balance: 61000, positionsValue: 110000, equity: 61000 },
        { month: "December", invested: 1500, balance: 62000, positionsValue: 130000, equity: 62000 },
    ];

    // Calculate Position Size Ratio (invested / balance) as percentage
    const positionSizeRatio = monthlyData.map(
        (data) => (data.invested / data.balance) * 100
    );

    // Calculate Leverage Ratio (positions value / equity)
    const leverageRatio = monthlyData.map(
        (data) => data.positionsValue / data.equity
    );

    // Chart.js data structure for Equity Curve (Area Chart)
    const chartData = {
        labels: data.map(item => item.x),
        datasets: [
            {
                label: "Equity Curve ($)",
                data: data.map(item => item.y),
                borderColor: "#6577FE",
                backgroundColor: "rgba(101, 119, 254, 0.2)",
                fill: true,
                tension: 0.4,
            },
        ],
    };

    // Chart.js data structure for Position Size Ratio (Bar Chart)
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

    // Chart.js data structure for Leverage Ratio (Line Chart)
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

    // Common chart options
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },
        },
        scales: {
            x: {
                grid: {
                    display: true,
                    drawBorder: true,
                },
            },
            y: {
                grid: {
                    display: true,
                    drawBorder: true,
                },
            },
        },
    };

    // Equity Curve options (Area Chart)
    const chartOptions = {
        ...commonOptions,
        plugins: {
            ...commonOptions.plugins,
            title: {
                display: true,
                text: "Equity Curve ($)",
            },

        },
        scales: {
            ...commonOptions.scales,
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Equity ($)",
                },
            },
        },
    };

    // Position Size Ratio options (Bar Chart)
    const chartOptions2 = {
        ...commonOptions,
        plugins: {
            ...commonOptions.plugins,
            title: {
                display: true,
                text: "Position Size Ratio (%)",
            },

        },
        scales: {
            ...commonOptions.scales,
            y: {
                beginAtZero: true,
                max: 10,
                title: {
                    display: true,
                    text: "Position Size (%)",
                },
            },
        },
    };

    // Leverage Ratio options (Line Chart)
    const chartOptions3 = {
        ...commonOptions,
        plugins: {
            ...commonOptions.plugins,
            title: {
                display: true,
                text: "Leverage Ratio",
            },

        },
        scales: {
            ...commonOptions.scales,
            y: {
                beginAtZero: true,
                max: 3,
                title: {
                    display: true,
                    text: "Leverage Ratio",
                },
            },
        },
    };

    return (
        <div className="mt-8  w-full py-5">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">

                <div className="gap-2 grid">
                    <div className="p-4 bg-white shadow rounded-lg">
                        <h2 className="text-2xl font-semibold mb-2">Recent Trades</h2>
                        <ul>
                            <li className="mb-1">Trade 1: +$500</li>
                            <li className="mb-1">Trade 2: -$200</li>
                            <li className="mb-1">Trade 3: +$150</li>
                        </ul>
                    </div>

                    <div className="p-4 bg-white shadow rounded-lg">
                        <h2 className="text-2xl font-semibold mb-2">Statistics</h2>
                        <p>Total Trades: 3</p>
                        <p>Winning Trades: 2</p>
                        <p>Losing Trades: 1</p>
                        <p>Net Profit: $450</p>
                    </div>
                </div>

                <div className="col-span-1 lg:col-span-2 p-4 bg-white shadow rounded-lg">
                    <h2 className="text-2xl text-[#364B62] font-semibold mb-2">Equity Curve</h2>
                    <div className="h-[300px]">
                        {/*@ts-ignore*/}
                        <Line data={chartData} options={chartOptions}/>
                    </div>
                </div>

                <div className="col-span-1 lg:col-span-2 p-4 bg-white shadow rounded-lg">
                    <h2 className="text-2xl font-semibold mb-2">Position Size Ratio</h2>
                    <div className="h-[300px]">
                        {/*@ts-ignore*/}
                        <Bar data={chartData2} options={chartOptions2}/>
                    </div>
                </div>

                <div className="col-span-1 lg:col-span-2 p-4 bg-white shadow rounded-lg">
                    <h2 className="text-2xl font-semibold mb-2">Leverage Ratio</h2>
                    <div className="h-[300px]">
                        {/*@ts-ignore*/}
                        <Line data={chartData3} options={chartOptions3} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;