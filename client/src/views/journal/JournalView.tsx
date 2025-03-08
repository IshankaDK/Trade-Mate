import { Button } from "@mui/material";
import { Plus } from "lucide-react";
import TradeJournalForm from "../../components/form/TradeJournalForm";
import { useEffect, useState } from "react";
import TradeJournalTable, { TradeTableData } from "../TradeJournalTable";
import APIClient from "../../util/APIClient";
import { Trade } from "../../types/TradeDto";

const JournalView = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [tradesList, setTradesList] = useState<TradeTableData[]>([]);
  const [isOverThreeTrades, setIsOverThreeTrades] = useState<boolean>(false);
  const [isRevengeTrading, setIsRevengeTrading] = useState<boolean>(false);

  useEffect(() => {
    getAllTradesByUser();
  }, []);

  const getAllTradesByUser = async () => {
    try {
      setTradesList([]);
      const response = await APIClient.get("/trades/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // console.log(response.data.data);
      setTradesList(response.data.data);
    } catch (error) {
      console.error("Error fetching trades:", error);
    }
  };

  const [data, setData] = useState<Trade | null>(null);

  const handleSelectedData = (newData: Trade | null) => {
    // additional
    // console.log(newData);
    setData(newData);
  };

  const findIfMoreThanThreeTradesForToday = () => {
    const today = new Date();
    let count = 0;
    tradesList.forEach((trade) => {
      const tradeDate = new Date(trade.openDate);
      if (
        tradeDate.getDate() === today.getDate() &&
        tradeDate.getMonth() === today.getMonth() &&
        tradeDate.getFullYear() === today.getFullYear()
      ) {
        count++;
      }
    });
    if (count > 3) {
      return true;
    }
    return false;
  };

  const findIfRevengeTrading = () => {
    const today = new Date();
    let count = 0;
    tradesList.forEach((trade) => {
      const tradeDate = new Date(trade.openDate);
      if (
        tradeDate.getDate() === today.getDate() &&
        tradeDate.getMonth() === today.getMonth() &&
        tradeDate.getFullYear() === today.getFullYear() &&
        trade.profit < 0
      ) {
        count++;
      }
    });

    if (count > 3) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setIsOverThreeTrades(findIfMoreThanThreeTradesForToday());
    setIsRevengeTrading(findIfRevengeTrading());
  }, [tradesList]);

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

      {isOverThreeTrades && (
        <div
          className="mt-2 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Warning!</strong>
          <br />
          <span className="block sm:inline">
            Over Trade Detected - You have made more than 3 trades today.
          </span>
        </div>
      )}

      {isRevengeTrading && (
        <div
          className="mt-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Warning!</strong>
          <br />
          <span className="block sm:inline">
            Revenge Trading Detected - You have made more than 3 losing trades
            today.
          </span>
        </div>
      )}

      <div className="mt-2">
        <TradeJournalTable
          tradeData={tradesList}
          openTradeForm={() => setOpen(true)}
          handleSelectedData={handleSelectedData}
          getAllTradesByUser={getAllTradesByUser}
        />
      </div>

      <TradeJournalForm
        data={data}
        // handleSelectedData={handleSelectedData}
        open={open}
        onClose={async () => {
          setOpen(false);
          getAllTradesByUser();
          setData(null);
        }}
      />
    </div>
  );
};
export default JournalView;
