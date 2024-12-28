import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { StrategyDto } from "../../types/StrategyDto";
import { CurrencyDto } from "../../types/CurrencyDto";
import { toast } from "react-toastify";
import APIClient from "../../util/APIClient";

interface Trade {
  id?: number;
  openDate: string;
  closeDate: string;
  duration: number; // in milliseconds
  currencyPair?: CurrencyDto;
  currencyPairId?: number;
  status: "win" | "loss" | "";
  type: "buy" | "sell" | "";
  entryPrice: number;
  exitPrice: number;
  tradeCategories: string[];
  marketTrend: string;

  strategy?: StrategyDto;
  strategyId?: number;

  stopLossPrice: number;
  takeProfitPrice: number;
  transactionCost: number;
  reason?: string;
  comments?: string;

  userId?: number;
}
const tradeCategories = [
  "Scalping",
  "Day Trading",
  "Swing Trading",
  "Position Trading",
  "Momentum Trading",
  "Trend Following",
  "Breakout Trading",
  "News-Based Trading",
  "Mean Reversion",
];

const TradeJournalForm = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [trade, setTrade] = useState<Trade>({
    openDate: "",
    closeDate: "",
    duration: 0,
    status: "",
    type: "",
    entryPrice: 0,
    exitPrice: 0,
    tradeCategories: [],
    marketTrend: "",
    stopLossPrice: 0,
    takeProfitPrice: 0,
    transactionCost: 0,
    reason: "",
    comments: "",
  });

  const [currencies, setCurrencies] = useState<CurrencyDto[]>([]);
  const [strategies, setStrategies] = useState<StrategyDto[]>([]);

  const [duration, setDuration] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    // Fetch data from API (e.g., currency pairs, trading strategies)
    getAllCurrencies();
    getAllStrategies();
  }, []);

  const getAllCurrencies = () => {
    // Fetch all currencies from the API
    APIClient.get("/currencies/user/currency-pairs", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        setCurrencies(response.data.data);
      })
      .catch((error) => {
        toast.error(error.message || "Error fetching currency pairs.");
      });
  };

  const getAllStrategies = () => {
    // Fetch all trading strategies from the API
    APIClient.get("/strategies/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        setStrategies(response.data.data);
        toast.success("Strategies loaded successfully!");
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "Unknown error occurred";
        toast.error(`Failed to load strategies: ${errorMessage}`);
      });
  };

  const saveTrade = () => {
    // Save trade data to the API
    APIClient.post("/trades", trade, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        toast.success("Trade added successfully.");
      })
      .catch((error) => {
        toast.error("Failed to add trade.");
      });
  };

  // Handle input changes
  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTrade((prev) => ({
      ...prev,
      [name]:
        name === "entryPrice" ||
        name === "exitPrice" ||
        name === "stopLossPrice" ||
        name === "takeProfitPrice" ||
        name === "transactionCost"
          ? parseFloat(value)
          : value,
    }));
  };

  useEffect(() => {
    console.log(trade);
  }, [trade]);

  const setCurrencyId = (e: ChangeEvent<HTMLInputElement>) => {
    const currencyId = parseInt(e.target.value);
    setTrade((prev) => ({ ...prev, currencyPairId: currencyId }));
  };
  const setStrategyId = (e: ChangeEvent<HTMLInputElement>) => {
    const strategyId = parseInt(e.target.value);
    setTrade((prev) => ({ ...prev, strategyId: strategyId }));
  };

  // Calculate duration whenever dates change
  useEffect(() => {
    if (trade.openDate && trade.closeDate) {
      const open = new Date(trade.openDate);
      const close = new Date(trade.closeDate);

      // Check if Close Date is later than Open Date
      if (close > open) {
        const durationInMs = close.getTime() - open.getTime();

        // Update the trade state with valid duration
        setTrade((prev) => ({
          ...prev,
          duration: durationInMs, // Display as a string
        }));
        showDurationValue();
      } else if (close < open) {
        // If Close Date is earlier than Open Date
        setDuration("Invalid duration");
        toast.error(
          "Close Date must be later than Open Date. Please check the dates."
        );
      } else {
        // If dates are equal (unlikely but good to handle)
        setDuration("Instant trade (Open and Close Dates are the same)");
        toast.warning(
          "Open and Close Date are the same. Consider adjusting them."
        );
      }
    }
  }, [trade.openDate, trade.closeDate]);

  // Function to format and display the duration
  const showDurationValue = () => {
    if (trade.duration > 0) {
      const durationInMs = trade.duration;
      const days = Math.floor(durationInMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (durationInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (durationInMs % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((durationInMs % (1000 * 60)) / 1000);

      setDuration(
        `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
      );
    } else {
      setDuration("N/A");
    }
  };
  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    setSelectedCategories((prevCategories) => {
      const newCategories = checked
        ? [...prevCategories, value] // Add to array if checked
        : prevCategories.filter((category) => category !== value); // Remove if unchecked

      setTrade((prev) => ({
        ...prev,
        tradeCategories: newCategories, // Directly use the updated categories here
      }));

      return newCategories;
    });
  };

  const validateForm = (trade: Trade) => {
    // Validate Open Date
    if (!trade.openDate) {
      toast.error("Open Date is required.");
      return false;
    }

    // Validate Close Date
    if (!trade.closeDate) {
      toast.error("Close Date is required.");
      return false;
    }

    // Ensure that Close Date is after Open Date
    const openDate = new Date(trade.openDate);
    const closeDate = new Date(trade.closeDate);
    if (closeDate <= openDate) {
      toast.error("Close Date must be later than Open Date.");
      return false;
    }

    // Validate Currency Pair ID
    if (!trade.currencyPairId) {
      toast.error("Currency Pair is required.");
      return false;
    }

    // Validate Status (win or loss)
    if (!trade.status) {
      toast.error("Trade Status is required.");
      return false;
    }
    if (!["win", "loss"].includes(trade.status)) {
      toast.error("Trade Status must be either 'win' or 'loss'.");
      return false;
    }

    // Validate Trade Type (buy or sell)
    if (!trade.type) {
      toast.error("Trade Type is required.");
      return false;
    }
    if (!["buy", "sell"].includes(trade.type)) {
      toast.error("Trade Type must be either 'buy' or 'sell'.");
      return false;
    }

    // Validate Entry Price
    if (!trade.entryPrice || trade.entryPrice <= 0) {
      toast.error("Entry Price must be a positive number.");
      return false;
    }

    // Validate Exit Price
    if (!trade.exitPrice || trade.exitPrice <= 0) {
      toast.error("Exit Price must be a positive number.");
      return false;
    }

    // Validate Category
    if (!trade.tradeCategories || trade.tradeCategories.length === 0) {
      toast.error("Trade Category is required.");
      return false;
    }

    // Validate Market Trend
    if (!trade.marketTrend) {
      toast.error("Market Trend is required.");
      return false;
    }

    // Validate Strategy ID
    if (!trade.strategyId) {
      toast.error("Trading Strategy is required.");
      return false;
    }

    // If all validations pass
    return true;
  };
  const handleSubmit = () => {
    if (validateForm(trade)) {
      saveTrade();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className="text-lg font-semibold">Add New Trade</DialogTitle>
      <DialogContent>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Trade Details Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Trade Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Open Date */}
                <TextField
                  name="openDate"
                  label="Open Date"
                  type="datetime-local"
                  fullWidth
                  required
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  value={trade.openDate}
                  onChange={handleChange}
                />
                {/* Close Date */}
                <TextField
                  name="closeDate"
                  label="Close Date"
                  type="datetime-local"
                  fullWidth
                  required
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  value={trade.closeDate}
                  onChange={handleChange}
                />
              </div>

              {/* Duration (Read-Only) */}
              <TextField
                label="Duration"
                fullWidth
                size="small"
                value={duration}
                InputProps={{ readOnly: true }}
              />

              {/* Currency Pair */}
              <TextField
                name="currencyPair"
                label="Currency Pair"
                size="small"
                fullWidth
                required
                select
                value={trade.currencyPairId}
                onChange={setCurrencyId}
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency.id} value={currency.id}>
                    {currency.from} / {currency.to}
                  </MenuItem>
                ))}
              </TextField>

              <div className="grid grid-cols-2 gap-4">
                {/* Status */}
                <TextField
                  name="status"
                  label="Status"
                  select
                  fullWidth
                  required
                  size="small"
                  value={trade.status}
                  onChange={handleChange}
                >
                  <MenuItem value="win">Win</MenuItem>
                  <MenuItem value="loss">Loss</MenuItem>
                </TextField>
                {/* Trade Type */}
                <TextField
                  name="type"
                  label="Trade Type"
                  select
                  fullWidth
                  required
                  size="small"
                  value={trade.type}
                  onChange={handleChange}
                >
                  <MenuItem value="buy">Buy</MenuItem>
                  <MenuItem value="sell">Sell</MenuItem>
                </TextField>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Trading categories
                </h3>

                {/* Render checkboxes */}
                <div
                  className="space-y-2"
                  style={{ maxHeight: "200px", overflowY: "auto" }}
                >
                  {tradeCategories.map((category) => (
                    <FormControlLabel
                      key={category}
                      control={
                        <Checkbox
                          value={category}
                          checked={selectedCategories.includes(category)} // Check if category is selected
                          onChange={handleCategoryChange}
                        />
                      }
                      label={category}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="space-y-3 border">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Additional Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Entry Price */}
                <TextField
                  name="entryPrice"
                  label="Entry Price"
                  type="number"
                  fullWidth
                  size="small"
                  required
                  inputProps={{ step: "0.01" }}
                  value={trade.entryPrice}
                  onChange={handleChange}
                />
                {/* Exit Price */}
                <TextField
                  name="exitPrice"
                  label="Exit Price"
                  type="number"
                  fullWidth
                  size="small"
                  required
                  inputProps={{ step: "0.01" }}
                  value={trade.exitPrice}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Stop Loss Price */}
                <TextField
                  name="stopLossPrice"
                  size="small"
                  label="Stop-Loss Price"
                  type="number"
                  fullWidth
                  required
                  inputProps={{ step: "0.01" }}
                  value={trade.stopLossPrice}
                  onChange={handleChange}
                />
                {/* Take Profit Price */}
                <TextField
                  name="takeProfitPrice"
                  size="small"
                  label="Take-Profit Price"
                  type="number"
                  fullWidth
                  required
                  inputProps={{ step: "0.01" }}
                  value={trade.takeProfitPrice}
                  onChange={handleChange}
                />
                {/* transaction cost */}
                <TextField
                  name="transactionCost"
                  size="small"
                  label="Transaction Cost"
                  type="number"
                  fullWidth
                  required
                  inputProps={{ step: "0.01" }}
                  value={trade.transactionCost}
                  onChange={handleChange}
                />
              </div>

              {/* Market Trend */}
              <TextField
                name="marketTrend"
                select
                size="small"
                label="Market Trend"
                fullWidth
                required
                value={trade.marketTrend}
                onChange={handleChange}
              >
                {["Bullish", "Bearish", "Volatile", "Sideways"].map((trend) => (
                  <MenuItem key={trend} value={trend}>
                    {trend}
                  </MenuItem>
                ))}
              </TextField>

              {/* Trading Strategy */}
              <TextField
                name="tradingStrategy"
                label="Trading Strategy"
                select
                fullWidth
                required
                size="small"
                value={trade.strategyId}
                onChange={setStrategyId}
              >
                {strategies.map((strategy) => (
                  <MenuItem key={strategy.id} value={strategy.id}>
                    {strategy.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                name="comments"
                size="small"
                label="Comments/Notes"
                multiline
                rows={9}
                fullWidth
                value={trade.comments}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} className="text-sm px-4">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          className="text-sm px-4"
          onClick={handleSubmit}
        >
          Add Trade
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TradeJournalForm;
