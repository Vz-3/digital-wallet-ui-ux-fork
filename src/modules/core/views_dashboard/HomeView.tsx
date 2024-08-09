import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, Wallet } from 'lucide-react';
import BigNumber from 'bignumber.js';

function HomeView() {
  // Oddly enough, there are currencies that have 3 decimal places. Also currencies like JPY with no decimal places.
  const currencyNumber = BigNumber.clone({ DECIMAL_PLACES: 3 });

  const [balance, setBalance] = useState<BigNumber>(
    currencyNumber(5000)
  );

  const handleSendMoney = () => {
    const promptValue = prompt('Enter amount to send:');
    if (promptValue) {
      const amount = currencyNumber(promptValue);
      if (
        amount &&
        amount.isGreaterThan(0) &&
        amount.isLessThanOrEqualTo(balance)
      ) {
        setBalance((prevBalance) => prevBalance.minus(amount));
        alert(`$${amount} sent successfully!`);
      } else {
        alert('Invalid amount or insufficient funds.');
      }
    }
  };

  const handleRequestMoney = () => {
    const promptValue = prompt('Enter amount to request:');
    if (promptValue) {
      const amount = currencyNumber(promptValue);
      if (amount && amount.isGreaterThan(0)) {
        alert(`Request for $${amount} sent successfully!`);
      } else {
        alert('Invalid amount.');
      }
    }
  };

  const handleAddFunds = () => {
    const promptValue = prompt('Enter amount to add:');
    if (promptValue) {
      const amount = currencyNumber(promptValue);
      if (amount && amount.isGreaterThan(0)) {
        setBalance((prevBalance) => prevBalance.plus(amount));
        alert(`$${amount} added successfully!`);
      } else {
        alert('Invalid amount.');
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Total Balance
          </h3>
          <p className="text-3xl font-bold">${balance.toFixed(3)}</p>
        </div>
      </div>
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <button
              onClick={handleSendMoney}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 flex items-center justify-center"
            >
              <ArrowUpRight className="mr-2" size={18} />
              Send Money
            </button>
            <button
              onClick={handleRequestMoney}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 flex items-center justify-center"
            >
              <ArrowDownLeft className="mr-2" size={18} />
              Request Money
            </button>
            <button
              onClick={handleAddFunds}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 flex items-center justify-center"
            >
              <Wallet className="mr-2" size={18} />
              Add Funds
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeView;
