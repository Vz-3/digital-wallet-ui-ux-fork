import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  WalletCards,
} from 'lucide-react';
import BigNumber from 'bignumber.js';
import { FormEvent } from 'react';
import { EHomeViewStyles } from '../styles/styleIndex';
import {
  changeTestCard,
  depositAPI,
  getBalanceAPI,
  kycStatusAPI,
  transferAPI,
} from '../services/apiAuthService';

function HomeView() {
  // Oddly enough, there are currencies that have 3 decimal places. Also currencies like JPY with no decimal places.
  const currencyNumber = BigNumber.clone({ DECIMAL_PLACES: 3 });
  const [kycStatus, setKycStatus] = useState(false);
  const [walletApplied, setWalletApplied] = useState(false);
  const [balance, setBalance] = useState<BigNumber>(
    currencyNumber(0)
  );

  const [toUserId, setToUserId] = useState('');
  const [transferAmount, setTransferAmount] = useState(0);

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

  const handleTransferFunds = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    console.log(event);
    event.preventDefault();
    try {
      const request = await transferAPI(toUserId, transferAmount);
      const data = await request.json();

      if (!request.ok) {
        throw new Error('Failed to transfer funds: ' + data.error);
      }

      setBalance(currencyNumber(data.fromBalance));
      alert(`$${transferAmount} transferred successfully!`);
    } catch (error) {
      console.log(`${error}`);
    }
  };

  const handleBalanceUpdate = async () => {
    try {
      const request = await getBalanceAPI();
      const data = await request.json();

      if (!request.ok) {
        throw new Error('Failed to get balance: ' + data.error);
      }

      if (walletApplied === false) {
        setWalletApplied(true);
      }

      setBalance(currencyNumber(data.balance));
    } catch (error) {
      console.log(`${error}`);
    }
  };

  const checkKycStatus = async () => {
    try {
      const request = await kycStatusAPI();
      const data = await request.json();

      if (!request.ok) {
        throw new Error('Failed to get KYC status: ' + data.error);
      }

      if (data.status === 'approved') {
        setKycStatus(true);
        console.log('KYC approved!');
      }
    } catch (error) {
      console.log(`${error}`);
    }
  };

  const handleDepositFunds = async () => {
    try {
      const promptValue = prompt('Enter amount to deposit:');
      if (promptValue) {
        const amount = currencyNumber(promptValue);
        const value = Number(promptValue);
        if (amount && amount.isGreaterThan(0)) {
          const request = await depositAPI(value);
          const data = await request.json();

          if (!request.ok) {
            throw new Error('Failed to deposit funds: ' + data.error);
          }

          setBalance(currencyNumber(data.balance));
          alert(`$${amount} deposited successfully!`);
        } else {
          alert('Invalid amount.');
        }
      }
    } catch (error) {
      console.log(`${error}`);
    }
  };

  const handleChangeCard = async () => {
    try {
      await changeTestCard();
    } catch (error) {
      console.log(`${error}`);
    }
  };
  useEffect(() => {
    console.log('Updating balance!');
    handleBalanceUpdate();
    checkKycStatus();
  }, []);

  return (
    <div className={EHomeViewStyles.CONTAINER}>
      <div
        className={`${EHomeViewStyles.CARD} ${
          kycStatus && walletApplied ? 'hidden' : 'visible'
        }`}
      >
        <div className={EHomeViewStyles.CARD_HEADER}>
          <h3
            className={EHomeViewStyles.CARD_TITLE + ' animate-pulse'}
          >
            Pending Actions <span className=" text-red-500 ">!</span>
          </h3>
          <ul className="list-disc pl-5">
            <li className={`${kycStatus ? 'hidden' : 'visible'}`}>
              KYC Status
            </li>
            <li className={`${walletApplied ? 'hidden' : 'visible'}`}>
              Apply for wallet
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`${EHomeViewStyles.CARD} ${
          walletApplied ? 'visible' : 'hidden'
        }`}
      >
        <div className={EHomeViewStyles.CARD_HEADER}>
          <h3 className={EHomeViewStyles.CARD_TITLE}>
            Total Balance
          </h3>
          <p className={EHomeViewStyles.BALANCE}>
            ${balance.toFixed(3)}
          </p>
        </div>
      </div>
      <div
        className={`${EHomeViewStyles.CARD} ${
          walletApplied ? 'visible' : 'hidden'
        }`}
      >
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
              onClick={handleDepositFunds}
              className={EHomeViewStyles.BUTTON}
            >
              <Wallet className="mr-2" size={18} />
              Deposit funds
            </button>
            <button
              onClick={handleChangeCard}
              className={EHomeViewStyles.BUTTON}
            >
              <WalletCards className="mr-2" size={18} />
              Change card
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${EHomeViewStyles.CARD} ${
          walletApplied ? 'visible' : 'hidden'
        }`}
      >
        <div className={EHomeViewStyles.CARD_HEADER}>
          <h3 className={EHomeViewStyles.CARD_TITLE}>
            Transfer Funds{' '}
          </h3>
          <form onSubmit={handleTransferFunds} className="space-y-4">
            <div>
              <label
                htmlFor="toUserId"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Recipient ID
              </label>
              <input
                type="text"
                id="toUserId"
                placeholder="66c2b2b44bf0be1bf8731ff7"
                value={toUserId}
                onChange={(inputText) =>
                  setToUserId(inputText.target.value)
                }
                className="mt-1 bg-blue-100 p-1 text-black focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label
                htmlFor="transferAmount"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Amount
              </label>
              <input
                type="number"
                id="transferAmount"
                value={transferAmount}
                onChange={(inputText) =>
                  setTransferAmount(Number(inputText.target.value))
                }
                className="mt-1 bg-blue-100 p-1 text-black focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="flex justify-center p-1">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              >
                Transfer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HomeView;
