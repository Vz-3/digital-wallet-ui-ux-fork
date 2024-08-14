import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { ETransactionsViewStyles } from '../styles/styleIndex';

type TransactionType = {
  id: number;
  date: string;
  description: string;
  amount: number;
};

function TransactionsView() {
  const [transactions] = useState<TransactionType[]>([
    {
      id: 1,
      date: '2023-07-01',
      description: 'Grocery Store',
      amount: -75.5,
    },
    {
      id: 2,
      date: '2023-07-02',
      description: 'Salary Deposit',
      amount: 3000,
    },
    {
      id: 3,
      date: '2023-07-03',
      description: 'Electric Bill',
      amount: -120,
    },
    {
      id: 4,
      date: '2023-07-04',
      description: 'Online Purchase',
      amount: -50.25,
    },
    {
      id: 5,
      date: '2023-07-05',
      description: 'Restaurant',
      amount: -45,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(searchTerm)
  );

  return (
    <div className={ETransactionsViewStyles.CONTAINER}>
      <div className={ETransactionsViewStyles.SEARCH_CONTAINER}>
        <Search
          className={ETransactionsViewStyles.SEARCH_ICON}
          size={20}
        />
        <input
          type="text"
          placeholder="Search transactions..."
          className={ETransactionsViewStyles.SEARCH_INPUT}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className={ETransactionsViewStyles.TABLE_CONTAINER}>
        <table className={ETransactionsViewStyles.TABLE}>
          <thead className={ETransactionsViewStyles.TABLE_HEADER}>
            <tr>
              <th
                className={ETransactionsViewStyles.TABLE_HEADER_CELL}
              >
                Date
              </th>
              <th
                className={ETransactionsViewStyles.TABLE_HEADER_CELL}
              >
                Description
              </th>
              <th
                className={
                  ETransactionsViewStyles.TABLE_HEADER_CELL_RIGHT
                }
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody className={ETransactionsViewStyles.TABLE_BODY}>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td
                  className={ETransactionsViewStyles.TABLE_CELL_DATE}
                >
                  {transaction.date}
                </td>
                <td
                  className={
                    ETransactionsViewStyles.TABLE_CELL_DESCRIPTION
                  }
                >
                  {transaction.description}
                </td>
                <td
                  className={`${
                    ETransactionsViewStyles.TABLE_CELL_AMOUNT
                  } ${
                    transaction.amount >= 0
                      ? ETransactionsViewStyles.AMOUNT_POSITIVE
                      : ETransactionsViewStyles.AMOUNT_NEGATIVE
                  }`}
                >
                  ${Math.abs(transaction.amount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionsView;
