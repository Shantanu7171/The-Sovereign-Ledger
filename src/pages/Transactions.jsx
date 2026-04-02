import React, { useState } from 'react';
import { Search, Plus, ChevronLeft, ChevronRight, TrendingUp, Landmark, Building2, CreditCard, Activity, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, formatCurrency, formatCurrencyFull } from '../lib/utils';
import { useFinancial } from '../context/FinancialContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  }
};

const Transactions = () => {
  const { 
    transactions, 
    role, 
    searchQuery, 
    setSearchQuery, 
    filterType, 
    setFilterType, 
    sortOrder,
    setSortOrder,
    addTransaction, 
    deleteTransaction,
    stats 
  } = useFinancial();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTx, setNewTx] = useState({ entity: '', category: '', amount: '', type: 'expense', status: 'completed' });

  const handleAddTx = (e) => {
    e.preventDefault();
    addTransaction({ 
      ...newTx, 
      amount: newTx.type === 'expense' ? -Math.abs(Number(newTx.amount)) : Number(newTx.amount),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString() + ' UTC'
    });
    setIsModalOpen(false);
    setNewTx({ entity: '', category: '', amount: '', type: 'expense', status: 'completed' });
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      <motion.section variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-dim opacity-60">Institutional Portal</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface font-headline leading-tight">Transactions<br/>History</h2>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant w-4 h-4 group-focus-within:text-primary transition-colors" />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/40 glass-morphism rounded-xl pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm" 
              placeholder="Search entity or classification..." 
              type="text"
            />
          </div>
          <div className="flex bg-white/40 glass-morphism p-1 rounded-xl shadow-sm">
            {['all', 'income', 'expense'].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setFilterType(tab)}
                className={cn(
                  "px-5 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-lg",
                  filterType === tab ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-primary"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex bg-white/40 glass-morphism p-1 rounded-xl shadow-sm">
            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest px-4 py-2 outline-none cursor-pointer text-slate-600"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Amount</option>
              <option value="lowest">Lowest Amount</option>
            </select>
          </div>
        </div>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Table Area */}
        <motion.div variants={itemVariants} className="lg:col-span-9 bg-white/60 glass-morphism rounded-2xl shadow-sm overflow-hidden flex flex-col border border-white/20">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/30">
                  <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant opacity-50">Date / Timestamp</th>
                  <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant opacity-50">Counterparty</th>
                  <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant opacity-50">Classification</th>
                  <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant opacity-50 text-right">Amount (INR)</th>
                  <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant opacity-50 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                <AnimatePresence mode="popLayout">
                  {transactions.length === 0 ? (
                    <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <td colSpan={5} className="py-20 text-center text-sm font-medium text-slate-400 italic">No transactions found matching your criteria.</td>
                    </motion.tr>
                  ) : (
                    transactions.map((tx) => (
                      <motion.tr 
                        key={tx.id} 
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-white/40 transition-all group cursor-pointer"
                      >
                        <td className="px-6 py-5">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-on-surface">{tx.date}</span>
                            <span className="text-[10px] text-slate-400 font-mono tracking-tight opacity-70">{tx.time}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white/50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform border border-white shadowed-sm">
                              <Landmark size={18} />
                            </div>
                            <span className="text-sm font-bold text-slate-700">{tx.entity}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={cn(
                            "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                            tx.type === 'income' ? "bg-tertiary-container/30 text-tertiary" : "bg-outline-variant/10 text-on-surface-variant"
                          )}>
                            {tx.category}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <span className={cn(
                            "text-sm font-black font-mono",
                            tx.amount > 0 ? "text-tertiary" : "text-error"
                          )}>
                            {formatCurrencyFull(tx.amount)}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex justify-center">
                            {role === 'admin' ? (
                              <button 
                                onClick={() => deleteTransaction(tx.id)}
                                className="p-2 text-error/20 hover:text-error hover:bg-error/10 rounded-lg transition-all"
                              >
                                <Trash2 size={16} />
                              </button>
                            ) : (
                              <div className={cn("w-2.5 h-2.5 rounded-full", tx.status === 'completed' ? "bg-tertiary" : "bg-amber-400")} />
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          <motion.div 
            variants={itemVariants}
            className="bg-primary text-on-primary p-8 rounded-2xl space-y-6 shadow-xl relative overflow-hidden group"
          >
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">Current Liquidity</h3>
            <div className="space-y-1 relative z-10">
              <p className="text-4xl font-black tracking-tighter leading-none">{formatCurrency(stats.totalBalance)}</p>
              <p className="text-[10px] font-bold text-tertiary-container opacity-80">
                ADMIN ACCESS: {role.toUpperCase()}
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/40 glass-morphism p-6 rounded-2xl">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant mb-5 opacity-60">Visibility Filter</h4>
            <div className="space-y-3">
              {['all', 'income', 'expense'].map((t) => (
                <button 
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                    filterType === t ? "bg-primary text-white shadow-lg" : "bg-white/50 text-slate-500 hover:bg-white"
                  )}
                >
                  {t}
                  {filterType === t && <Activity size={12} />}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {role === 'admin' && (
        <motion.button 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-24 right-6 md:bottom-10 md:right-10 w-16 h-16 bg-primary text-on-primary rounded-2xl shadow-2xl flex items-center justify-center z-40 soft-glow-primary"
        >
          <Plus className="w-8 h-8" />
        </motion.button>
      )}

      {/* Add Transaction Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-md rounded-3xl p-10 shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black tracking-tight font-headline">New Entry</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={20}/></button>
              </div>
              <form onSubmit={handleAddTx} className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Entity / Counterparty</label>
                  <input 
                    required
                    value={newTx.entity}
                    onChange={(e) => setNewTx({...newTx, entity: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-xl px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g. Acme Corp"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Amount (INR)</label>
                    <input 
                      required
                      type="number"
                      value={newTx.amount}
                      onChange={(e) => setNewTx({...newTx, amount: e.target.value})}
                      className="w-full bg-slate-50 border-none rounded-xl px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Type</label>
                    <div className="flex bg-slate-50 p-1 rounded-xl">
                      <button 
                        type="button"
                        onClick={() => setNewTx({...newTx, type: 'income'})}
                        className={cn("flex-1 py-3 text-[10px] font-black uppercase rounded-lg transition-all", newTx.type === 'income' ? "bg-white shadow-sm text-tertiary" : "text-slate-400")}
                      >Income</button>
                      <button 
                        type="button"
                        onClick={() => setNewTx({...newTx, type: 'expense'})}
                        className={cn("flex-1 py-3 text-[10px] font-black uppercase rounded-lg transition-all", newTx.type === 'expense' ? "bg-white shadow-sm text-error" : "text-slate-400")}
                      >Expense</button>
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Classification</label>
                  <input 
                    required
                    value={newTx.category}
                    onChange={(e) => setNewTx({...newTx, category: e.target.value})}
                    className="w-full bg-slate-50 border-none rounded-xl px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g. Operations"
                  />
                </div>
                <button type="submit" className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:soft-glow-primary transition-all">Submit Ledger Entry</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Transactions;
