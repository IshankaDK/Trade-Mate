export const Dashboard = () => {
  return (
    <>
      <div className="mt-8 w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>
    </>
  );
};
