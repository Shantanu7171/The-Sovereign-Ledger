import React, { createContext, useContext, useState, useMemo } from 'react';

const FinancialContext = createContext();

export const useFinancial = () => {
  const context = useContext(FinancialContext);
  if (!context) throw new Error('useFinancial must be used within a FinancialProvider');
  return context;
};

const INITIAL_TRANSACTIONS = [
  { id: 1, date: '2023-10-24', time: '14:22:10 UTC', entity: 'Goldman Sachs Dividend', category: 'Investments', amount: 12450.00, status: 'completed', type: 'income' },
  { id: 2, date: '2023-10-23', time: '09:15:44 UTC', entity: 'Azure Cloud Services', category: 'Operations', amount: -3120.45, status: 'completed', type: 'expense' },
  { id: 3, date: '2023-10-21', time: '18:05:12 UTC', entity: 'Q3 Tax Settlement', category: 'Taxation', amount: -45000.00, status: 'pending', type: 'expense' },
  { id: 4, date: '2023-10-20', time: '11:30:00 UTC', entity: 'Equity Sale: AAPL', category: 'Investments', amount: 118240.10, status: 'completed', type: 'income' },
  { id: 5, date: '2023-10-19', time: '16:45:22 UTC', entity: 'Morgan Stanley Lease', category: 'Real Estate', amount: -8500.00, status: 'completed', type: 'expense' },
  { id: 6, date: '2023-10-18', time: '10:02:11 UTC', entity: 'Forex Adjustment', category: 'Treasury', amount: 1455.32, status: 'completed', type: 'income' },
];

export const FinancialProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [role, setRole] = useState('admin'); // 'viewer' | 'admin'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'income' | 'expense'
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' | 'oldest' | 'highest' | 'lowest'

  const addTransaction = (newTx) => {
    if (role !== 'admin') return;
    setTransactions(prev => [{ ...newTx, id: Date.now() }, ...prev]);
  };

  const deleteTransaction = (id) => {
    if (role !== 'admin') return;
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  };

  const toggleRole = () => {
    setRole(prev => prev === 'admin' ? 'viewer' : 'admin');
  };

  const filteredTransactions = useMemo(() => {
    let result = transactions.filter(tx => {
      const matchesSearch = tx.entity.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           tx.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'all' || tx.type === filterType;
      return matchesSearch && matchesType;
    });

    // Sorting Logic
    result.sort((a, b) => {
      if (sortOrder === 'newest') return new Date(b.date) - new Date(a.date);
      if (sortOrder === 'oldest') return new Date(a.date) - new Date(b.date);
      if (sortOrder === 'highest') return b.amount - a.amount;
      if (sortOrder === 'lowest') return a.amount - b.amount;
      return 0;
    });

    return result;
  }, [transactions, searchQuery, filterType, sortOrder]);

  const stats = useMemo(() => {
    const income = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + Math.abs(t.amount), 0);
    return {
      totalBalance: income - expenses,
      totalIncome: income,
      totalExpenses: expenses
    };
  }, [transactions]);

  return (
    <FinancialContext.Provider value={{
      transactions: filteredTransactions,
      allTransactions: transactions,
      role,
      toggleRole,
      searchQuery,
      setSearchQuery,
      filterType,
      setFilterType,
      sortOrder,
      setSortOrder,
      addTransaction,
      deleteTransaction,
      stats
    }}>
      {children}
    </FinancialContext.Provider>
  );
};
