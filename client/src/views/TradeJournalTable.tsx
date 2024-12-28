import React from "react";
import MUIDataTable, { MUIDataTableColumnDef } from "mui-datatables";
import { Chip, ThemeProvider, createTheme } from "@mui/material";
import { CurrencyDto } from "../types/CurrencyDto";
import { StrategyDto } from "../types/StrategyDto";
export interface TradeTableData {
  id: number;
  openDate: string;
  closeDate: string;
  currencyPairId: number;
  currencyPair: CurrencyDto;
  strategyId: number;
  strategy: StrategyDto;
  status: "win" | "loss";
  type: "buy" | "sell";
  duration: number;
  entryPrice: number;
  exitPrice: number;
  positionSize: number | null;
  marketTrend: string;
  stopLossPrice: number;
  takeProfitPrice: number;
  transactionCost: number;
  reason: string;
  comment: string | null;
  categories: string[] | null;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

interface TradeJournalTableProps {
  tradeData: TradeTableData[];
}

const TradeJournalTable = ({ tradeData }: TradeJournalTableProps) => {
  const columns: MUIDataTableColumnDef[] = [
    {
      name: "openDate",
      label: "Open",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: string) => (
          <Chip
            label={new Date(value).toLocaleString()}
            style={{
              borderRadius: "0.5rem",
              color: "black",
              fontSize: "0.7rem",
            }}
          />
        ),
      },
    },
    {
      name: "closeDate",
      label: "Close",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: string) => (
          <Chip
            label={new Date(value).toLocaleString()}
            style={{
              borderRadius: "0.5rem",
              color: "black",
              fontSize: "0.7rem",
            }}
          />
        ),
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        customBodyRender: (value: string) => (
          <Chip
            label={value.toUpperCase()}
            style={{
              borderRadius: "0.5rem",
              backgroundColor: value === "win" ? "#01B398" : "#FF8383",
              fontWeight: "bold",
            }}
          />
        ),
      },
    },
    {
      name: "type",
      label: "Trade Type",
      options: {
        filter: true,
        customBodyRender: (value: string) => (
          <Chip
            label={value.toUpperCase()}
            style={{
              borderRadius: "0.5rem",
              backgroundColor: value === "buy" ? "#79D7BE" : "#FADA7A",
              fontWeight: "bold",
            }}
          />
        ),
      },
    },
    {
      name: "currencyPair",
      label: "Currency",
      options: {
        filter: true,
        customBodyRender: (value: any) => (
          <Chip
            label={`${value.from} / ${value.to}`}
            style={{
              borderRadius: "0.5rem",
              fontWeight: "bold",
            }}
          />
        ),
      },
    },
    { name: "entryPrice", label: "Entry", options: { filter: true } },
    { name: "exitPrice", label: "Exit", options: { filter: true } },
    {
      name: "strategy",
      label: "Strategy",
      options: {
        filter: true,
        customBodyRender: (value: any) => (
          <Chip
            label={value.name}
            style={{
              borderRadius: "0.5rem",
              fontWeight: "bold",
            }}
          />
        ),
      },
    },
    { name: "marketTrend", label: "Market Trend", options: { filter: true } },
    { name: "stopLossPrice", label: "Stop Loss", options: { filter: true } },
    {
      name: "takeProfitPrice",
      label: "Take Profit",
      options: { filter: true },
    },
    {
      name: "transactionCost",
      label: "Cost",
      options: { filter: true },
    },

    // {
    //   name: "currencyPairId",
    //   label: "Currency Pair ID",
    //   options: { filter: true },
    // },
    // // { name: "strategyId", label: "Strategy ID", options: { filter: true } },
  ];

  const getMuiTheme = () =>
    createTheme({
      components: {
        MuiTableHead: {
          styleOverrides: {
            root: {
              backgroundColor: "#3f51b5",
              "& th": {
                color: "black",
                fontWeight: "bold",
                fontSize: "1rem",
              },
            },
          },
        },
        MuiTableBody: {
          styleOverrides: {
            root: {
              "& td": {
                fontSize: "0.9rem",
              },
            },
          },
        },
      },
    });
  return (
    <ThemeProvider theme={getMuiTheme()}>
      <div className="mt-4 p-2">
        <MUIDataTable
          title={"Trade Journal"}
          data={tradeData}
          columns={columns}
          options={{
            filterType: "dropdown",
            responsive: "standard",
            selectableRows: "none",
            download: true,
            print: true,
            search: true,
            pagination: true,
            elevation: 2,
          }}
        />
      </div>
    </ThemeProvider>
  );
};

export default TradeJournalTable;
