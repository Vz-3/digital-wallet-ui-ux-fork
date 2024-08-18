import React, { FormEvent, useState } from 'react';
import {
  PlusCircle,
  CreditCard,
  Building,
  Trash2,
} from 'lucide-react';
import BigNumber from 'bignumber.js';
import { EAccountManagementStyles } from '../styles/styleIndex';

type AccountType = {
  id: number;
  type: string;
  name: string;
  balance: BigNumber;
};

type BankType = {
  id: number;
  name: string;
  accountNumber: string;
};

type PaymentMethodType = {
  id: number;
  type: string;
  last4: string;
  expiryDate: string;
};

const AccountManagement = () => {
  const currencyNumber = BigNumber.clone({ DECIMAL_PLACES: 3 });

  const [accounts, setAccounts] = useState<AccountType[]>([
    {
      id: 1,
      type: 'Checking',
      name: 'Main Checking',
      balance: currencyNumber(5000),
    },
    {
      id: 2,
      type: 'Savings',
      name: 'Emergency Fund',
      balance: currencyNumber(10000),
    },
  ]);

  const [linkedBanks, setLinkedBanks] = useState<BankType[]>([
    { id: 1, name: 'Bank of America', accountNumber: '****1234' },
  ]);

  const [paymentMethods, setPaymentMethods] = useState<
    PaymentMethodType[]
  >([
    {
      id: 1,
      type: 'Credit Card',
      last4: '5678',
      expiryDate: '12/24',
    },
  ]);

  const [newAccountName, setNewAccountName] = useState('');
  const [newAccountType, setNewAccountType] = useState('Checking');
  const [newBankName, setNewBankName] = useState('');
  const [newBankAccountNumber, setNewBankAccountNumber] =
    useState('');
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardExpiry, setNewCardExpiry] = useState('');
  const [newCardCVV, setNewCardCVV] = useState('');

  const handleAddAccount = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newAccountName) {
      setAccounts([
        ...accounts,
        {
          id: accounts.length + 1,
          type: newAccountType,
          name: newAccountName,
          balance: BigNumber(0),
        },
      ]);
      setNewAccountName('');
      setNewAccountType('Checking');
    }
  };

  const handleLinkBank = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newBankName && newBankAccountNumber) {
      setLinkedBanks([
        ...linkedBanks,
        {
          id: linkedBanks.length + 1,
          name: newBankName,
          accountNumber: `****${newBankAccountNumber.slice(-4)}`,
        },
      ]);
      setNewBankName('');
      setNewBankAccountNumber('');
    }
  };

  const handleAddPaymentMethod = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (newCardNumber && newCardExpiry && newCardCVV) {
      setPaymentMethods([
        ...paymentMethods,
        {
          id: paymentMethods.length + 1,
          type: 'Credit Card',
          last4: newCardNumber.slice(-4),
          expiryDate: newCardExpiry,
        },
      ]);
      setNewCardNumber('');
      setNewCardExpiry('');
      setNewCardCVV('');
    }
  };

  const handleRemoveAccount = (id: number) => {
    setAccounts(accounts.filter((account) => account.id !== id));
  };

  const handleRemoveBank = (id: number) => {
    setLinkedBanks(linkedBanks.filter((bank) => bank.id !== id));
  };

  const handleRemovePaymentMethod = (id: number) => {
    setPaymentMethods(
      paymentMethods.filter((method) => method.id !== id)
    );
  };

  return (
    <div className={EAccountManagementStyles.CONTAINER}>
      <div className={EAccountManagementStyles.SECTION}>
        <div className={EAccountManagementStyles.SECTION_HEADER}>
          <h3 className={EAccountManagementStyles.SECTION_TITLE}>
            Your Accounts
          </h3>
        </div>
        <div className={EAccountManagementStyles.LIST}>
          <ul className={EAccountManagementStyles.LIST_ITEM}>
            {accounts.map((account) => (
              <li
                key={account.id}
                className={EAccountManagementStyles.ITEM}
              >
                <div
                  className={EAccountManagementStyles.ITEM_CONTENT}
                >
                  <div>
                    <p className={EAccountManagementStyles.ITEM_TEXT}>
                      {account.name}
                    </p>
                    <p
                      className={
                        EAccountManagementStyles.ITEM_SUBTEXT
                      }
                    >
                      {account.type}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p
                      className={
                        EAccountManagementStyles.ITEM_BALANCE
                      }
                    >
                      ${account.balance.toFixed(3)}
                    </p>
                    <button
                      onClick={() => handleRemoveAccount(account.id)}
                      className={
                        EAccountManagementStyles.DELETE_BUTTON
                      }
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={EAccountManagementStyles.SECTION_HEADER}>
          <form
            onSubmit={handleAddAccount}
            className={EAccountManagementStyles.FORM}
          >
            <input
              type="text"
              value={newAccountName}
              onChange={(e) => setNewAccountName(e.target.value)}
              placeholder="Account Name"
              className={
                `${
                  newAccountName.length === 0
                    ? 'dark:animate-pulse '
                    : 'dark:animate-none '
                }` + EAccountManagementStyles.FORM_INPUT
              }
            />
            <select
              value={newAccountType}
              onChange={(e) => setNewAccountType(e.target.value)}
              className={EAccountManagementStyles.FORM_SELECT}
            >
              <option value="Checking">Checking</option>
              <option value="Savings">Savings</option>
            </select>
            <button
              type="submit"
              className={EAccountManagementStyles.BUTTON}
            >
              <PlusCircle size={18} className="mr-2" />
              Add Account
            </button>
          </form>
        </div>
      </div>

      <div className={EAccountManagementStyles.SECTION}>
        <div className={EAccountManagementStyles.SECTION_HEADER}>
          <h3 className={EAccountManagementStyles.SECTION_TITLE}>
            Linked Bank Accounts
          </h3>
        </div>
        <div className={EAccountManagementStyles.LIST}>
          <ul className={EAccountManagementStyles.LIST_ITEM}>
            {linkedBanks.map((bank) => (
              <li
                key={bank.id}
                className={EAccountManagementStyles.ITEM}
              >
                <div
                  className={EAccountManagementStyles.ITEM_CONTENT}
                >
                  <div>
                    <p className={EAccountManagementStyles.ITEM_TEXT}>
                      {bank.name}
                    </p>
                    <p
                      className={
                        EAccountManagementStyles.ITEM_SUBTEXT
                      }
                    >
                      Account: {bank.accountNumber}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveBank(bank.id)}
                    className={EAccountManagementStyles.DELETE_BUTTON}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={EAccountManagementStyles.SECTION_HEADER}>
          <form
            onSubmit={handleLinkBank}
            className={EAccountManagementStyles.FORM}
          >
            <input
              type="text"
              value={newBankName}
              onChange={(e) => setNewBankName(e.target.value)}
              placeholder="Bank Name"
              className={
                `${
                  newBankName.length === 0
                    ? 'dark:animate-pulse '
                    : 'dark:animate-none '
                }` + EAccountManagementStyles.FORM_INPUT
              }
            />
            <input
              type="text"
              value={newBankAccountNumber}
              onChange={(e) =>
                setNewBankAccountNumber(e.target.value)
              }
              placeholder="Account Number"
              className={
                `${
                  newBankAccountNumber.length === 0
                    ? 'dark:animate-pulse '
                    : 'dark:animate-none '
                }` + EAccountManagementStyles.FORM_INPUT
              }
            />
            <button
              type="submit"
              className={EAccountManagementStyles.BUTTON}
            >
              <Building size={18} className="mr-2" />
              Link Bank
            </button>
          </form>
        </div>
      </div>

      <div className={EAccountManagementStyles.SECTION}>
        <div className={EAccountManagementStyles.SECTION_HEADER}>
          <h3 className={EAccountManagementStyles.SECTION_TITLE}>
            Payment Methods
          </h3>
        </div>
        <div className={EAccountManagementStyles.LIST}>
          <ul className={EAccountManagementStyles.LIST_ITEM}>
            {paymentMethods.map((method) => (
              <li
                key={method.id}
                className={EAccountManagementStyles.ITEM}
              >
                <div
                  className={EAccountManagementStyles.ITEM_CONTENT}
                >
                  <div>
                    <p className={EAccountManagementStyles.ITEM_TEXT}>
                      {method.type} ending in {method.last4}
                    </p>
                    <p
                      className={
                        EAccountManagementStyles.ITEM_SUBTEXT
                      }
                    >
                      Expires: {method.expiryDate}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handleRemovePaymentMethod(method.id)
                    }
                    className={EAccountManagementStyles.DELETE_BUTTON}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={EAccountManagementStyles.SECTION_HEADER}>
          <form
            onSubmit={handleAddPaymentMethod}
            className="space-y-2"
          >
            <input
              type="text"
              value={newCardNumber}
              onChange={(e) => setNewCardNumber(e.target.value)}
              placeholder="Card Number"
              className={
                `${
                  newCardNumber.length === 0
                    ? 'dark:animate-pulse '
                    : 'dark:animate-none '
                }` + EAccountManagementStyles.FORM_INPUT_LARGE
              }
            />
            <div
              className={EAccountManagementStyles.FORM_INPUT_GROUP}
            >
              <input
                type="text"
                value={newCardExpiry}
                onChange={(e) => setNewCardExpiry(e.target.value)}
                placeholder="MM/YY"
                className={
                  `${
                    newCardExpiry.length === 0
                      ? 'dark:animate-pulse '
                      : 'dark:animate-none '
                  }` + EAccountManagementStyles.FORM_INPUT
                }
              />
              <input
                type="text"
                value={newCardCVV}
                onChange={(e) => setNewCardCVV(e.target.value)}
                placeholder="CVV"
                className={
                  `${
                    newCardCVV.length === 0
                      ? 'dark:animate-pulse '
                      : 'dark:animate-none '
                  }` + EAccountManagementStyles.FORM_INPUT
                }
              />
            </div>
            <button
              type="submit"
              className={EAccountManagementStyles.FORM_BUTTON}
            >
              <CreditCard size={18} className="mr-2" />
              Add Payment Method
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
