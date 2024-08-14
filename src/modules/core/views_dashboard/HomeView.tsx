import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, Wallet } from 'lucide-react';
import BigNumber from 'bignumber.js';
import { EHomeViewStyles } from '../styles/styleIndex';

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
    <div className={EHomeViewStyles.CONTAINER}>
      <div className={EHomeViewStyles.CARD}>
        <div className={EHomeViewStyles.CARD_HEADER}>
          <h3 className={EHomeViewStyles.CARD_TITLE}>
            Total Balance
          </h3>
          <p className={EHomeViewStyles.BALANCE}>
            ${balance.toFixed(3)}
          </p>
        </div>
      </div>
      <div className={EHomeViewStyles.CARD}>
        <div className={EHomeViewStyles.CARD_HEADER}>
          <h3 className={EHomeViewStyles.CARD_TITLE}>
            Quick Actions
          </h3>
          <div className={EHomeViewStyles.ACTIONS_CONTAINER}>
            <button
              onClick={handleSendMoney}
              className={EHomeViewStyles.BUTTON}
            >
              <ArrowUpRight className="mr-2" size={18} />
              Send Money
            </button>
            <button
              onClick={handleRequestMoney}
              className={EHomeViewStyles.BUTTON}
            >
              <ArrowDownLeft className="mr-2" size={18} />
              Request Money
            </button>
            <button
              onClick={handleAddFunds}
              className={EHomeViewStyles.BUTTON}
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
