import { Button, IconButton, Tooltip } from "@mui/material";
import MUIDataTable, { MUIDataTableColumnDef } from "mui-datatables";
import RefreshIcon from "@mui/icons-material/Refresh";

const columns: MUIDataTableColumnDef[] = [
  {
    name: "pair",
    label: "Currency Pair",
    options: {
      filter: true,
    },
  },
  {
    name: "openTime",
    label: "Open Time",
    options: {
      filter: true,
    },
  },
  {
    name: "closeTime",
    label: "Close Time",
    options: {
      filter: true,
    },
  },
  {
    name: "entryPrice",
    label: "Entry Price",
    options: {
      filter: true,
    },
  },
  {
    name: "exitPrice",
    label: "Exit Price",
    options: {
      filter: true,
    },
  },
  {
    name: "profit",
    label: "PnL",
    options: {
      filter: true,
    },
  },
  {
    name: "status",
    label: "Status",
    options: {
      filter: true,
    },
  },
];

const data = [
  {
    pair: "EUR/USD",
    openTime: "2021-01-01 00:00:00",
    closeTime: "2021-01-01 00:00:00",
    entryPrice: 1.2,
    exitPrice: 1.21,
    profit: 100,
    status: "Win",
  },
  {
    pair: "EUR/USD",
    openTime: "2021-01-01 00:00:00",
    closeTime: "2021-01-01 00:00:00",
    entryPrice: 1.2,
    exitPrice: 1.21,
    profit: 100,
    status: "Win",
  },
  {
    pair: "EUR/USD",
    openTime: "2021-01-01 00:00:00",
    closeTime: "2021-01-01 00:00:00",
    entryPrice: 1.2,
    exitPrice: 1.21,
    profit: 100,
    status: "Win",
  },
  {
    pair: "EUR/USD",
    openTime: "2021-01-01 00:00:00",
    closeTime: "2021-01-01 00:00:00",
    entryPrice: 1.2,
    exitPrice: 1.21,
    profit: 100,
    status: "Win",
  },
  {
    pair: "EUR/USD",
    openTime: "2021-01-01 00:00:00",
    closeTime: "2021-01-01 00:00:00",
    entryPrice: 1.2,
    exitPrice: 1.21,
    profit: 100,
    status: "Win",
  },
  {
    pair: "EUR/USD",
    openTime: "2021-01-01 00:00:00",
    closeTime: "2021-01-01 00:00:00",
    entryPrice: 1.2,
    exitPrice: 1.21,
    profit: 100,
    status: "Win",
  },
  {
    pair: "EUR/USD",
    openTime: "2021-01-01 00:00:00",
    closeTime: "2021-01-01 00:00:00",
    entryPrice: 1.2,
    exitPrice: 1.21,
    profit: 100,
    status: "Win",
  },
  {
    pair: "EUR/USD",
    openTime: "2021-01-01 00:00:00",
    closeTime: "2021-01-01 00:00:00",
    entryPrice: 1.2,
    exitPrice: 1.21,
    profit: 100,
    status: "Win",
  },
  {
    pair: "EUR/USD",
    openTime: "2021-01-01 00:00:00",
    closeTime: "2021-01-01 00:00:00",
    entryPrice: 1.2,
    exitPrice: 1.21,
    profit: 100,
    status: "Loss",
  },
];

const TradeJournalTable = () => {
  return (
    <div>
      <MUIDataTable
        title={"Trading List"}
        data={data}

        columns={columns}
        options={{
          filterType: "dropdown",
          responsive: "standard",
          selectableRows: "none",
          enableNestedDataAccess: ".",
          download: false,
          print: false,
          viewColumns: false,
          search: true,
          pagination: true,
          filter: true,
          sort: true,
          elevation: 1,
          customToolbar: () => (
            <>
              <Tooltip title="Refresh">
                <IconButton onClick={() => { }}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>

            </>
          ),
        }}
      />
    </div>
  );
};

export default TradeJournalTable;
