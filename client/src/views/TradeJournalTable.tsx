import MUIDataTable, { MUIDataTableColumnDef } from "mui-datatables";
import { Chip, createTheme, ThemeProvider } from "@mui/material";
import { CurrencyDto } from "../types/CurrencyDto";
import { StrategyDto } from "../types/StrategyDto";
import { Pencil } from "lucide-react";
import { Trade } from "../types/TradeDto.ts";

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
  tradeCategories: string[] | null;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

interface TradeJournalTableProps {
  tradeData: TradeTableData[];
  openTradeForm: () => void;
  // onCloseTradeForm: () => void;
  handleSelectedData: (data: Trade | null) => void;
}

const TradeJournalTable = ({
  tradeData,
  handleSelectedData,
  openTradeForm,
  // onCloseTradeForm,
}: TradeJournalTableProps) => {
  const columns: MUIDataTableColumnDef[] = [
    {
      name: "openDate",
      label: "Open",
      options: {
        filter: false,
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
        filter: false,
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
              backgroundColor:
                value === "win"
                  ? "#01B398"
                  : value === "loss"
                    ? "#FF5C5C"
                    : "#FADA7A",
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
              backgroundColor: value === "buy" ? "#79D7BE" : "#FF5C5C",
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
        filterType: "dropdown",
        filterOptions: {
          names: tradeData
            .map(
              (trade) => trade.currencyPair.from + "/" + trade.currencyPair.to,
            )
            .filter((value, index, self) => self.indexOf(value) === index),
          logic: (value: any, filterVal: any) => {
            console.log(value.from, filterVal);

            return value.from + "/" + value.to !== filterVal[0];
          },
        },
      },
    },
    {
      name: "entryPrice",
      label: "Entry",
      options: { filter: false },
    },
    {
      name: "exitPrice",
      label: "Exit",
      options: { filter: false },
    },
    {
      name: "positionSize",
      label: "Position Size",
      options: { filter: false },
    },
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
        filterType: "dropdown",
        filterOptions: {
          names: tradeData
            .map((trade) => trade.strategy.name)
            .filter((value, index, self) => self.indexOf(value) === index),
          logic: (value: any, filterVal: any) => {
            return value.name !== filterVal[0];
          },
        },
      },
    },
    {
      name: "marketTrend",
      label: "Market Trend",
      options: { filter: true },
    },
    {
      name: "stopLossPrice",
      label: "Stop Loss",
      options: { filter: false },
    },
    {
      name: "takeProfitPrice",
      label: "Take Profit",
      options: { filter: false },
    },
    {
      name: "transactionCost",
      label: "Cost",
      options: { filter: false },
    },
    {
      name: "comment",
      label: "Comment",
      options: { filter: false },
    },
    {
      name: "option",
      label: "Option",
      // center
      options: {
        filter: false,
        customBodyRender: (_value, tableMeta) => {
          const data = tradeData[tableMeta.rowIndex];
          const trade: Trade = { ...data };
          return (
            <button
              className="bg-green-50 border text-green-600 p-2 rounded-full hover:bg-green-100 hover:text-green-800 transition-colors"
              aria-label="Edit"
              onClick={() => {
                handleSelectedData(trade);
                openTradeForm();
              }}
            >
              <Pencil size={15} strokeWidth={2} />
            </button>
          );
        },
      },
    },
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
