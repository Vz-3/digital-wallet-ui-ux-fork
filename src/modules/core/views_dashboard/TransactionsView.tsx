import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { ETransactionsViewStyles } from '../styles/styleIndex';
import { getTransactionsAPI } from '../services/apiAuthService';

type TransactionType = {
  id: string;
  type: string;
  date: string;
  amount: number;
};

function TransactionsView() {
  const [transactions, setTransactions] = useState<TransactionType[]>(
    []
  );

  const [searchTerm, setSearchTerm] = useState('');

  const getTransactionsHistory = async () => {
    try {
      const response = await getTransactionsAPI();
      const data = await response.json();

      if (!response.ok) {
        throw new Error('Error fetching transactions!');
      }

      if (data.length === 0) {
        console.log('No transactions found.');
      }

      const transactionsHistory: TransactionType[] = [];

      for (const records of data) {
        transactionsHistory.push({
          id: records.id,
          type: records.type,
          date: new Date(records.createdAt).toLocaleDateString(),
          amount: records.amount,
        });
      }

      console.log(transactionsHistory);

      setTransactions(transactionsHistory);
    } catch (error) {
      console.log(`${error}`);
    }
  };
  useEffect(() => {
    try {
      getTransactionsHistory();
    } catch (error) {
      console.log(`${error}`);
    }
  }, []);

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.type
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
          className="flex-grow dark:bg-transparent dark:text-white "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div
        className={`${
          transactions.length === 0 ? 'visible' : 'hidden'
        }`}
      >
        <h3>No transactions found. Please check back later.</h3>
      </div>
      <div
        className={
          ETransactionsViewStyles.TABLE_CONTAINER +
          ` ${transactions.length === 0 ? 'hidden' : 'visible'}`
        }
      >
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
                Type
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
                  {transaction.type}
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
