import {StrategyCard} from "../components/card/StrategyCard.tsx";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import React, {useState} from "react";

const StrategyForm = () => {
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        type: "",
        comment: "",
        description: "",
        marketType: "",
        marketCondition: "",
        riskLevel: "",
        timeFrame: "",
        backtestData: "",
        winRate: 0,
        totalTrades: 0,
        lastModifiedDate: new Date(),
        userId: 1,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Strategy Submitted: ", formData);
    };

    return (
        <div className="max-w-4xl mx-auto  p-4">
            <form onSubmit={handleSubmit} className="space-y-2">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-600">Strategy Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 px-3 py-2 border rounded-md w-full"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-600">Type</label>
                    <input
                        type="text"
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="mt-1 px-3 py-2 border rounded-md w-full"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-600">Comment</label>
                    <textarea
                        id="comment"
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        className="mt-1 px-3 py-2 border rounded-md w-full"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-600">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 px-3 py-2 border rounded-md w-full"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="marketType" className="block text-sm font-medium text-gray-600">Market Type</label>
                    <input
                        type="text"
                        id="marketType"
                        name="marketType"
                        value={formData.marketType}
                        onChange={handleChange}
                        className="mt-1 px-3 py-2 border rounded-md w-full"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="marketCondition" className="block text-sm font-medium text-gray-600">Market
                        Condition</label>
                    <input
                        type="text"
                        id="marketCondition"
                        name="marketCondition"
                        value={formData.marketCondition}
                        onChange={handleChange}
                        className="mt-1 px-3 py-2 border rounded-md w-full"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="riskLevel" className="block text-sm font-medium text-gray-600">Risk Level</label>
                    <input
                        type="text"
                        id="riskLevel"
                        name="riskLevel"
                        value={formData.riskLevel}
                        onChange={handleChange}
                        className="mt-1 px-3 py-2 border rounded-md w-full"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="timeFrame" className="block text-sm font-medium text-gray-600">Time Frame</label>
                    <input
                        type="text"
                        id="timeFrame"
                        name="timeFrame"
                        value={formData.timeFrame}
                        onChange={handleChange}
                        className="mt-1 px-3 py-2 border rounded-md w-full"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="backtestData" className="block text-sm font-medium text-gray-600">Backtest
                        Data</label>
                    <input
                        type="text"
                        id="backtestData"
                        name="backtestData"
                        value={formData.backtestData || ""}
                        onChange={handleChange}
                        className="mt-1 px-3 py-2 border rounded-md w-full"
                    />
                </div>

                <div>
                    <label htmlFor="winRate" className="block text-sm font-medium text-gray-600">Win Rate</label>
                    <input
                        type="number"
                        id="winRate"
                        name="winRate"
                        value={formData.winRate}
                        onChange={handleChange}
                        className="mt-1 px-3 py-2 border rounded-md w-full"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="totalTrades" className="block text-sm font-medium text-gray-600">Total
                        Trades</label>
                    <input
                        type="number"
                        id="totalTrades"
                        name="totalTrades"
                        value={formData.totalTrades}
                        onChange={handleChange}
                        className="mt-1 px-3 py-2 border rounded-md w-full"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="userId" className="block text-sm font-medium text-gray-600">User ID</label>
                    <input
                        type="number"
                        id="userId"
                        name="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        className="mt-1 px-3 py-2 border rounded-md w-full"
                        required
                    />
                </div>

                <div className="mt-4">
                    <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                        Submit Strategy
                    </button>
                </div>
            </form>
        </div>
    );
};

const PlayBook = () => {
    const strategies = [
        {
            id: "1",
            name: "Starter",
            type: "Scalping",
            comment: "Beginner-friendly strategy",
            description: "Enjoy entry-level investment opportunities with minimal risk.",
            marketType: "Crypto",
            marketCondition: "Bullish",
            riskLevel: "Low",
            timeFrame: "1 Hour",
            backtestData: undefined,
            winRate: 67,
            totalTrades: 150,
            lastModifiedDate: new Date(),
            userId: 123,
        },
        {
            id: "2",
            name: "Advanced Swing",
            type: "Swing Trading",
            comment: "For experienced traders",
            description: "Ideal for those looking to capture larger market swings.",
            marketType: "Stocks",
            marketCondition: "Volatile",
            riskLevel: "Medium",
            timeFrame: "4 Hours",
            backtestData: undefined,
            winRate: 72,
            totalTrades: 320,
            lastModifiedDate: new Date(),
            userId: 124,
        },
        {
            id: "3",
            name: "High-Risk Forex",
            type: "Day Trading",
            comment: "High risk but high reward strategy",
            description: "Targets short-term Forex movements for aggressive traders.",
            marketType: "Forex",
            marketCondition: "Sideways",
            riskLevel: "High Risk",
            timeFrame: "15 Minutes",
            backtestData: undefined,
            winRate: 55,
            totalTrades: 200,
            lastModifiedDate: new Date(),
            userId: 125,
        },
        {
            id: "4",
            name: "Expert Forex",
            type: "Day Trading",
            comment: "Advanced high-risk strategy",
            description: "Designed for traders seeking to exploit sideways Forex markets.",
            marketType: "Forex",
            marketCondition: "Sideways",
            riskLevel: "High Risk",
            timeFrame: "30 Minutes",
            backtestData: undefined,
            winRate: 58,
            totalTrades: 250,
            lastModifiedDate: new Date(),
            userId: 126,
        },
    ];

    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <div className="min-h-screen py-[1vw]">
            {/* Header Section */}
            <div className="flex items-center justify-between bg-gray-50 p-[1.5vw] rounded-lg shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Playbook Records</h1>
                    <p className="text-gray-600 mt-[0.5vw]">
                        Explore and choose from our curated strategies designed for all experience levels.
                    </p>
                </div>

                <Button variant="contained" onClick={handleOpenModal}>
                    New Strategy
                </Button>
            </div>

            {/* Strategies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[2vw] py-2">
                {strategies.map((strategy) => (
                    <StrategyCard key={strategy.id} {...strategy} />
                ))}
            </div>

            {/* Modal for adding new strategy */}
            <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
                <DialogTitle>Add New Strategy</DialogTitle>
                <DialogContent>
                    <StrategyForm/> {/* Your StrategyForm component here */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCloseModal} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PlayBook;
