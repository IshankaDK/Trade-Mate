import { Button } from "@mui/material";
import { Plus } from "lucide-react";
import TradeJournalForm from "../../components/form/TradeJournalForm";
import { useEffect, useState } from "react";
import TradeJournalTable, { TradeTableData } from "../TradeJournalTable";
import APIClient from "../../util/APIClient";

const JournalView = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [tradesList, setTradesList] = useState<TradeTableData[]>([]);

    useEffect(() => {
        getAllTradesByUser();
    }, [tradesList]);

    const getAllTradesByUser = async () => {
        try {
            const response = await APIClient.get("/trades/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log(response.data.data);
            setTradesList(response.data.data);
        } catch (error) {
            console.error("Error fetching trades:", error);
        }
    };

    return (
        <div className="min-h-screen py-[1vw]">
            <div className="flex items-center justify-between bg-gray-50 p-[1.5vw] rounded-lg shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Trading Journal</h1>
                    <p className="text-gray-600 mt-[0.5vw]">
                        Keep track of your trades, analyze your performance, and improve
                        your trading skills.
                    </p>
                </div>
                <Button
                    variant="contained"
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    <Plus size={16} className="mr-2" />
                    New Trade
                </Button>
            </div>
            <div className="mt-2">
                <TradeJournalTable tradeData={tradesList} />
            </div>

            <TradeJournalForm open={open} onClose={() => {
                setOpen(false)
                getAllTradesByUser()
            }} />
        </div>
    );
};
export default JournalView;
