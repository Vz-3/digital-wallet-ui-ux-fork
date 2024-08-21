import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, Wallet } from 'lucide-react';
import BigNumber from 'bignumber.js';
import { EHomeViewStyles } from '../styles/styleIndex';
import { getBalanceAPI } from '../services/apiAuthService';

function HomeView() {
  // Oddly enough, there are currencies that have 3 decimal places. Also currencies like JPY with no decimal places.
  const currencyNumber = BigNumber.clone({ DECIMAL_PLACES: 3 });

  const [balance, setBalance] = useState<BigNumber>(
    currencyNumber(0)
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

  const handleBalanceUpdate = async () => {
    try {
      const request = await getBalanceAPI();
      const data = await request.json();

      if (!request.ok) {
        throw new Error('Failed to get balance: ' + data.error);
      }
      setBalance(currencyNumber(data.balance));
    } catch (error) {
      alert(`${error}`);
    }
  };

  useEffect(() => {
    console.log('Updating balance!');
    handleBalanceUpdate();
  }, [setBalance]);

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
              onClick={handleBalanceUpdate}
              className={EHomeViewStyles.BUTTON}
            >
              Get balance
            </button>
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
