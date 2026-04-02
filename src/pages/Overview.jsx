import React from 'react';
import { TrendingUp, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn, formatCurrency, formatCurrencyFull } from '../lib/utils';
import { useFinancial } from '../context/FinancialContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

const Overview = () => {
  const { allTransactions, stats } = useFinancial();
  const recentTransactions = allTransactions.slice(0, 5);

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-12"
    >
      {/* Hero Section */}
      <motion.section variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <p className="text-on-surface-variant font-label text-xs uppercase tracking-widest opacity-70">Total Assets Controlled</p>
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-slate-900 font-headline leading-none">
            {formatCurrency(Math.floor(stats.totalBalance))}
            <span className="text-3xl opacity-30 text-primary-dim">
              .{Math.abs(Math.round((stats.totalBalance % 1) * 100)).toString().padStart(2, '0')}
            </span>
          </h2>
        </div>
        <div className="flex gap-4">
          <div className="bg-white/40 glass-morphism p-5 rounded-2xl flex flex-col items-start min-w-[170px] shadow-sm hover:soft-glow-tertiary transition-shadow duration-500">
            <span className="text-[10px] uppercase tracking-wider text-on-surface-variant mb-2 font-bold opacity-60">Total Income</span>
            <span className="text-xl font-bold text-tertiary">{formatCurrency(stats.totalIncome, true)}</span>
          </div>
          <div className="bg-white/40 glass-morphism p-5 rounded-2xl flex flex-col items-start min-w-[170px] shadow-sm">
            <span className="text-[10px] uppercase tracking-wider text-on-surface-variant mb-2 font-bold opacity-60">Total Expenses</span>
            <span className="text-xl font-bold text-error">{formatCurrency(-stats.totalExpenses, true)}</span>
          </div>
        </div>
      </motion.section>

      {/* Mini Sparkline Trend */}
      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
        className="h-28 w-full bg-white/40 glass-morphism rounded-2xl overflow-hidden relative group transition-all duration-500"
      >
        <svg className="w-full h-full opacity-40 group-hover:opacity-70 transition-opacity duration-700" preserveAspectRatio="none" viewBox="0 0 1000 100">
          <motion.path 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M0 80 Q 100 20, 200 70 T 400 40 T 600 80 T 800 30 T 1000 50" 
            fill="none" 
            stroke="var(--color-primary)" 
            strokeWidth="3" 
          />
          <path d="M0 80 Q 100 20, 200 70 T 400 40 T 600 80 T 800 30 T 1000 50 V 100 H 0 Z" fill="url(#grad)" opacity="0.1" />
          <defs>
            <linearGradient id="grad" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'var(--color-primary)', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: 'var(--color-primary)', stopOpacity: 0 }} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center px-8 justify-between pointer-events-none">
          <span className="text-[10px] text-on-surface bg-white/80 px-3 py-1 rounded-full backdrop-blur-md font-bold tracking-[0.1em] shadow-sm uppercase">Institutional Balance Trend</span>
          <div className="flex items-center gap-2 bg-tertiary/10 text-tertiary px-3 py-1 rounded-full backdrop-blur-md">
            <TrendingUp size={12} />
            <span className="text-[10px] font-bold">+12.4% vs L.M.</span>
          </div>
        </div>
      </motion.div>

      <div className="asymmetric-grid">
        {/* Recent Transactions */}
        <motion.section variants={itemVariants} className="bg-white/60 glass-morphism rounded-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold tracking-tight uppercase text-on-surface-variant opacity-60">Principal Transactions</h3>
            <button className="text-primary text-xs font-bold hover:underline flex items-center gap-2 group">
              <Download size={14} className="group-hover:-translate-y-0.5 transition-transform" />
              Download CSV
            </button>
          </div>
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/10">
                  <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-50">Merchant / Entity</th>
                  <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-50">Classification</th>
                  <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-50">Filing Date</th>
                  <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-50 text-right">Amount (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                {recentTransactions.map((tx) => (
                  <motion.tr 
                    key={tx.id} 
                    variants={itemVariants}
                    className="hover:bg-white/40 transition-all group cursor-pointer"
                  >
                    <td className="py-5 font-bold text-sm text-slate-800">{tx.entity}</td>
                    <td className="py-5">
                      <span className={cn(
                        "text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider",
                        tx.type === 'income' ? "bg-tertiary/10 text-tertiary" : "bg-primary/10 text-primary"
                      )}>
                        {tx.category}
                      </span>
                    </td>
                    <td className="py-5 text-xs text-on-surface-variant font-medium opacity-60">{tx.date}</td>
                    <td className={cn(
                      "py-5 text-sm font-black text-right transition-transform group-hover:scale-105",
                      tx.amount > 0 ? "text-tertiary" : "text-slate-900"
                    )}>
                      {formatCurrencyFull(tx.amount)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Allocation Column */}
        <motion.section variants={itemVariants} className="bg-white/40 glass-morphism rounded-2xl p-8 flex flex-col">
          <h3 className="text-sm font-bold tracking-tight uppercase text-on-surface-variant opacity-60 mb-8">Asset Allocation</h3>
          <div className="relative flex justify-center mb-10 group">
            <svg className="transform -rotate-90 group-hover:rotate-0 transition-transform duration-1000 ease-in-out" height="200" viewBox="0 0 42 42" width="200">
              <circle cx="21" cy="21" fill="transparent" r="15.91549430918954" stroke="rgba(213, 227, 252, 0.4)" strokeWidth="4"></circle>
              <motion.circle 
                initial={{ strokeDasharray: "0 100" }}
                animate={{ strokeDasharray: "68 32" }}
                transition={{ duration: 1.5, delay: 0.5 }}
                cx="21" cy="21" fill="transparent" r="15.91549430918954" stroke="var(--color-primary)" strokeDashoffset="25" strokeWidth="4"
              ></motion.circle>
              <motion.circle 
                initial={{ strokeDasharray: "0 100" }}
                animate={{ strokeDasharray: "15 85" }}
                transition={{ duration: 1.2, delay: 1 }}
                cx="21" cy="21" fill="transparent" r="15.91549430918954" stroke="var(--color-tertiary)" strokeDashoffset="93" strokeWidth="4"
              ></motion.circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">Efficiency</span>
              <span className="text-3xl font-black text-slate-900">84%</span>
            </div>
          </div>
          <div className="space-y-3 flex-1">
            {[
              { label: 'Technology', value: '42%', color: 'bg-primary' },
              { label: 'Investments', value: '38%', color: 'bg-tertiary' },
              { label: 'Operations', value: '12%', color: 'bg-secondary-container' },
              { label: 'Unallocated', value: '8%', color: 'bg-surface-container-high' },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.8)' }}
                className="flex items-center justify-between p-3 rounded-xl transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className={cn("w-2.5 h-2.5 rounded-full", item.color)}></div>
                  <span className="text-xs font-bold text-slate-700">{item.label}</span>
                </div>
                <span className="text-xs font-black font-mono">{item.value}</span>
              </motion.div>
            ))}
          </div>
          <button className="w-full mt-10 py-4 bg-primary text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:soft-glow-primary transition-all active:scale-95 shadow-lg">
            Generate Audit Report
          </button>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default Overview;
