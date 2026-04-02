import React, { createContext, useContext, useState, useMemo } from 'react';

const FinancialContext = createContext();

export const useFinancial = () => {
  const context = useContext(FinancialContext);
  if (!context) throw new Error('useFinancial must be used within a FinancialProvider');
  return context;
};

const INITIAL_TRANSACTIONS = [
  { id: 1, date: '2024-03-24', time: '10:15:30 IST', entity: 'Monthly Salary', category: 'Salary', amount: 85000.00, status: 'completed', type: 'income' },
  { id: 2, date: '2024-03-23', time: '14:22:15 IST', entity: 'Food Delivery: Biryani', category: 'Food & Dining', amount: -450.45, status: 'completed', type: 'expense' },
  { id: 3, date: '2024-03-22', time: '09:05:12 IST', entity: 'Electronics Purchase', category: 'Shopping', amount: -12300.00, status: 'pending', type: 'expense' },
  { id: 4, date: '2024-03-21', time: '18:30:00 IST', entity: 'Savings Account Interest', category: 'Investments', amount: 1240.10, status: 'completed', type: 'income' },
  { id: 5, date: '2024-03-20', time: '11:45:22 IST', entity: 'Monthly House Rent', category: 'Housing', amount: -22500.00, status: 'completed', type: 'expense' },
  { id: 6, date: '2024-03-19', time: '16:02:11 IST', entity: 'Work Commute: Cab', category: 'Transport', amount: -355.32, status: 'completed', type: 'expense' },
  { id: 7, date: '2024-03-18', time: '20:15:44 IST', entity: 'Mobile Recharge', category: 'Utilities', amount: -749.00, status: 'completed', type: 'expense' },
  { id: 8, date: '2024-03-17', time: '10:05:12 IST', entity: 'Freelance Final Payment', category: 'Income', amount: 15000.00, status: 'completed', type: 'income' },
  { id: 9, date: '2024-03-16', time: '19:30:00 IST', entity: 'Streaming Subscription', category: 'Entertainment', amount: -499.00, status: 'completed', type: 'expense' },
  { id: 10, date: '2024-03-15', time: '11:45:22 IST', entity: 'Gas Cylinder Booking', category: 'Utilities', amount: -950.00, status: 'completed', type: 'expense' },
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
