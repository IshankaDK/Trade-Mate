const PlayBook = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome to Trade Mate</h1>

      <div className="mt-8 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4">Sample Play Book</h2>
        <ul className="list-disc list-inside">
          <li className="mb-2">
            <strong>Strategy 1:</strong> Buy low, sell high. Look for
            undervalued stocks and sell them when they reach their peak.
          </li>
          <li className="mb-2">
            <strong>Strategy 2:</strong> Diversify your portfolio. Invest in a
            mix of stocks, bonds, and other assets to minimize risk.
          </li>
          <li className="mb-2">
            <strong>Strategy 3:</strong> Follow market trends. Keep an eye on
            market news and trends to make informed trading decisions.
          </li>
          <li className="mb-2">
            <strong>Strategy 4:</strong> Set stop-loss orders. Protect your
            investments by setting stop-loss orders to limit potential losses.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PlayBook;
