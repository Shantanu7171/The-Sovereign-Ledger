import React from 'react';
import { PieChart, TrendingUp, Zap, ChevronRight, AlertTriangle, ShieldCheck, ZapOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn, formatCurrency } from '../lib/utils';

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
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const Insights = () => {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-12"
    >
      <motion.section variants={itemVariants} className="mb-12">
        <span className="text-[0.7rem] uppercase tracking-[0.3em] font-black text-primary mb-3 block opacity-60">Performance Analysis</span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="text-[4rem] md:text-[5.5rem] font-black tracking-tighter leading-[0.8] text-slate-900 font-headline">Financial<br/>Insights<span className="text-primary">.</span></h2>
          <div className="max-w-md">
            <p className="text-on-surface-variant leading-relaxed text-sm font-medium opacity-80">
              An algorithmic breakdown of your institutional capital flow. We've identified three key optimizations to strengthen your liquidity position.
            </p>
          </div>
        </div>
      </motion.section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Exposure Bento */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -10 }}
          className="md:col-span-4 bg-white/60 glass-morphism p-10 flex flex-col justify-between min-h-[450px] rounded-3xl transition-all duration-500"
        >
          <div>
            <div className="flex justify-between items-start mb-10">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-60">Top Exposure</h3>
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <PieChart size={24} />
              </div>
            </div>
            <div className="mb-10">
              <div className="text-sm font-bold text-on-surface-variant mb-2 opacity-60">Highest Expenditure</div>
              <div className="text-5xl font-black tracking-tighter text-slate-900">Capital Tech</div>
            </div>
            <div className="space-y-8">
              <div className="group">
                <div className="flex justify-between text-xs font-black mb-3 uppercase tracking-widest text-on-surface">
                  <span>Core Tech</span>
                  <span className="text-primary">42%</span>
                </div>
                <div className="h-3 bg-slate-200/50 w-full rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '42%' }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                    className="h-full bg-primary shadow-lg"
                  ></motion.div>
                </div>
              </div>
              <div className="group opacity-40">
                <div className="flex justify-between text-xs font-black mb-3 uppercase tracking-widest">
                  <span>Operations</span>
                  <span className="font-bold">28%</span>
                </div>
                <div className="h-3 bg-slate-200/50 w-full rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '28%' }}
                    transition={{ duration: 1.5, delay: 1 }}
                    className="h-full bg-outline-variant"
                  ></motion.div>
                </div>
              </div>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-10 pt-8 border-t border-slate-100"
          >
            <div className="flex items-center gap-3 text-error text-sm font-black uppercase tracking-wider">
              <TrendingUp size={18} />
              <span>+12.4% vs Last Period</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Comparison Bento */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-8 bg-white/40 glass-morphism p-10 rounded-3xl flex flex-col"
        >
          <div className="flex justify-between items-center mb-12">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-60">Flow Comparison</h3>
              <p className="text-xs text-on-surface-variant font-medium mt-1 opacity-60">Operational Spend: This Month vs Last Month</p>
            </div>
            <div className="flex gap-6 items-center">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]">
                <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-sm"></div> Last
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]">
                <div className="w-2.5 h-2.5 rounded-full bg-tertiary shadow-sm"></div> Current
              </div>
            </div>
          </div>
          <div className="flex items-end justify-between h-72 gap-4 px-4">
            {[
              { last: 40, curr: 65 },
              { last: 55, curr: 48 },
              { last: 70, curr: 85 },
              { last: 30, curr: 25 },
            ].map((week, i) => (
              <div key={i} className="flex-1 flex items-end justify-center gap-2 h-full group">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${week.last}%` }}
                  transition={{ duration: 1.5, delay: 0.5 + (i * 0.1) }}
                  className="w-full max-w-[32px] bg-primary-container/60 hover:bg-primary-container transition-colors rounded-2xl shadowed-sm"
                ></motion.div>
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${week.curr}%` }}
                  transition={{ duration: 1.5, delay: 0.7 + (i * 0.1) }}
                  className="w-full max-w-[32px] bg-tertiary-container hover:bg-tertiary shadow-lg transition-all rounded-2xl"
                ></motion.div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant opacity-50 px-6">
            <span className="flex-1 text-center">W1</span>
            <span className="flex-1 text-center">W2</span>
            <span className="flex-1 text-center">W3</span>
            <span className="flex-1 text-center">W4</span>
          </div>
        </motion.div>

        {/* Forecast Bento */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-7 bg-white/60 glass-morphism p-10 rounded-3xl"
        >
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-60">Liquidity Forecast</h3>
            <span className="px-3 py-1 bg-tertiary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">Predictive AI</span>
          </div>
          <div className="relative h-56 flex items-end gap-4 px-4">
            {[60, 65, 58, 72, 80, 88, 95].map((h, i) => (
              <motion.div 
                key={i} 
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 1.2, delay: 1 + (i * 0.05) }}
                className={cn(
                  "flex-1 transition-all duration-500 rounded-t-xl",
                  i < 4 ? "bg-slate-200/50" : "bg-primary/30 border-t-4 border-primary border-dashed shadow-glow"
                )} 
              ></motion.div>
            ))}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-b border-slate-100 flex items-center h-[50%]">
              <div className="w-full border-t border-outline-variant/10 border-dashed"></div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-6">
            <div className="p-6 bg-white/40 rounded-2xl border border-white shadowed-sm">
              <div className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.1em] mb-2 opacity-60">Projected EOM Balance</div>
              <div className="text-3xl font-black text-slate-900">₹2.48<span className="text-xl opacity-30">Cr</span></div>
            </div>
            <div className="p-6 bg-white/40 rounded-2xl border border-white shadowed-sm">
              <div className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.1em] mb-2 opacity-60">Forecast Accuracy</div>
              <div className="text-3xl font-black text-slate-900">98.4<span className="text-xl opacity-30">%</span></div>
            </div>
          </div>
        </motion.div>

        {/* Optimization Tips */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-primary text-on-primary p-10 flex-1 relative overflow-hidden group rounded-3xl shadow-2xl flex flex-col justify-center"
          >
            <div className="relative z-10">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 opacity-60">Yield Optimization</h3>
              <p className="text-2xl font-bold leading-tight mb-8">You have ₹42k in underutilized subscriptions and dormant licenses.</p>
              <button className="bg-white text-primary text-[10px] font-black uppercase tracking-widest px-8 py-4 hover:soft-glow-primary transition-all rounded-xl shadow-lg active:scale-95">Review Audit</button>
            </div>
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -right-10 -bottom-10 w-56 h-56 bg-white rounded-full blur-3xl p-20"
            ></motion.div>
          </motion.div>
          <motion.div 
            variants={itemVariants}
            className="bg-tertiary text-on-tertiary p-8 flex items-center justify-between rounded-3xl shadow-xl hover:soft-glow-tertiary transition-all duration-500"
          >
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-60">Efficiency Score</div>
              <div className="text-4xl font-black tracking-tighter">84<span className="text-lg opacity-40">/100</span></div>
            </div>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="text-white/30" size={56} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.section variants={itemVariants} className="mt-20">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant mb-8 pb-4 border-b border-outline-variant/10">Strategic Recommendations</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Automate SaaS Reconciliation', desc: 'System detected 14 seat licenses for "CloudArchitect" that haven\'t been accessed in 90 days. Est. savings: ₹1,400/mo.', border: 'border-primary', icon: ZapOff },
            { title: 'Diversify Cash Reserves', desc: 'Current liquidity exceeds operational requirements by 2.4x. Recommend moving ₹1.2Cr to high-yield treasury ladder.', border: 'border-tertiary', icon: ShieldCheck },
            { title: 'Late Fee Mitigation', desc: 'Three vendor payments were processed manually last month, incurring ₹450 in fees. Switch to AP automation.', border: 'border-error', icon: AlertTriangle },
          ].map((rec, i) => {
            const Icon = rec.icon;
            return (
              <motion.div 
                key={i} 
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
                className={cn("p-8 bg-white/60 glass-morphism border-l-[6px] rounded-r-3xl transition-all duration-500 cursor-pointer", rec.border)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon size={20} className="text-slate-600 opacity-60" />
                  <h5 className="text-sm font-black uppercase tracking-tight">{rec.title}</h5>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed font-medium opacity-80">{rec.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Insights;
