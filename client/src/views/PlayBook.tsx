import {Button, Dialog, DialogContent, DialogTitle} from "@mui/material";
import React, {useState} from "react";
import {StrategyCard} from "../components/card/StrategyCard.tsx";
import {StrategyForm} from "../components/form/StrategyForm.tsx";
import {StrategyProps} from "../types/StrategyProps.ts";
import {Plus} from "lucide-react";

const PlayBook: React.FC = () => {

    const [strategies] = useState<StrategyProps[]>([{
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
        timeFrameStart: null,
        timeFrameEnd: null
    }, {
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
        timeFrameStart: null,
        timeFrameEnd: null
    }, {
        id: "3",
        name: "High-Risk Forex",
        type: "Day Trading",
        comment: "High risk but high reward strategy",
        description: "Targets short-term Forex movements for aggressive traders.",
        marketType: "Forex",
        marketCondition: "Sideways",
        riskLevel: "High",
        timeFrame: "15 Minutes",
        backtestData: undefined,
        winRate: 55,
        totalTrades: 200,
        lastModifiedDate: new Date(),
        userId: 125,
        timeFrameStart: null,
        timeFrameEnd: null
    }, {
        id: "4",
        name: "Expert Forex",
        type: "Day Trading",
        comment: "Advanced high-risk strategy",
        description: "Designed for traders seeking to exploit sideways Forex markets.",
        marketType: "Forex",
        marketCondition: "Sideways",
        riskLevel: "High",
        timeFrame: "30 Minutes",
        backtestData: undefined,
        winRate: 58,
        totalTrades: 250,
        lastModifiedDate: new Date(),
        userId: 126,
        timeFrameStart: null,
        timeFrameEnd: null
    }, {
        id: "5",
        name: "Crypto Trend Follower",
        type: "Trend Following",
        comment: "Targets trending markets with moderate risk",
        description: "Tracks long-term trends in crypto markets, ideal for mid-term investors.",
        marketType: "Crypto",
        marketCondition: "Bullish/Bearish",
        riskLevel: "Medium",
        timeFrame: "4 Hours",
        backtestData: undefined,
        winRate: 65,
        totalTrades: 100,
        lastModifiedDate: new Date(),
        userId: 127,
        timeFrameStart: null,
        timeFrameEnd: null
    }, {
        id: "6",
        name: "Scalping Expert",
        type: "Scalping",
        comment: "Aggressive short-term strategy for professional scalpers",
        description: "Focuses on small price movements with quick trades in Forex markets.",
        marketType: "Forex",
        marketCondition: "Bullish",
        riskLevel: "High",
        timeFrame: "5 Minutes",
        backtestData: undefined,
        winRate: 80,
        totalTrades: 500,
        lastModifiedDate: new Date(),
        userId: 128,
        timeFrameStart: null,
        timeFrameEnd: null
    }, {
        id: "7",
        name: "Long-Term Investor",
        type: "Position Trading",
        comment: "Low-frequency, long-term investment strategy",
        description: "Focuses on holding assets for months or years to capture larger moves.",
        marketType: "Stocks",
        marketCondition: "Bullish/Bearish",
        riskLevel: "Low",
        timeFrame: "Daily",
        backtestData: undefined,
        winRate: 75,
        totalTrades: 50,
        lastModifiedDate: new Date(),
        userId: 129,
        timeFrameStart: null,
        timeFrameEnd: null
    }, {
        id: "8",
        name: "Range-Bound Forex",
        type: "Range Trading",
        comment: "Ideal for sideways market conditions",
        description: "Profits from price fluctuations within a defined range in the Forex market.",
        marketType: "Forex",
        marketCondition: "Sideways",
        riskLevel: "Medium",
        timeFrame: "1 Hour",
        backtestData: undefined,
        winRate: 65,
        totalTrades: 180,
        lastModifiedDate: new Date(),
        userId: 130,
        timeFrameStart: null,
        timeFrameEnd: null
    },]);
    const [selectedStrategy, setSelectedStrategy] = useState<StrategyProps | null>(null);
    const [openModal, setOpenModal] = useState(false);

    const handleEdit = (strategy: StrategyProps) => {
        setSelectedStrategy(strategy);
        setOpenModal(true);
    };

    const handleModal = (flag: boolean, strategy?: StrategyProps) => {
        setOpenModal(flag);
        setSelectedStrategy(strategy || null);
    };

    return (<div className="min-h-screen py-[1vw]">
        <div className="flex items-center justify-between bg-gray-50 p-[1.5vw] rounded-lg shadow-sm">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Playbook Records</h1>
                <p className="text-gray-600 mt-[0.5vw]">
                    Explore and choose from our curated strategies designed for all experience levels.
                </p>
            </div>
            <Button
                variant="contained"
                onClick={() => handleModal(true)}
            >
                <Plus size={16} className="mr-2"/>
                New Strategy
            </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[2vw] py-2">
            {strategies.map((strategy) => (<StrategyCard
                strategy={strategy}
                onEdit={handleEdit}
                key={strategy.id}
            />))}
        </div>

        <Dialog
            open={openModal}
            onClose={() => handleModal(false)}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>
                {selectedStrategy ? "Edit Strategy" : "Add New Strategy"}
            </DialogTitle>
            <DialogContent>
                <StrategyForm strategy={selectedStrategy}/>
            </DialogContent>
        </Dialog>
    </div>);
};

export default PlayBook;
