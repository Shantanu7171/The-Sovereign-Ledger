import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { useFinancial } from '../context/FinancialContext';

const Header = () => {
  const { role, toggleRole } = useFinancial();
  
  const navItems = [
    { to: '/', label: 'Overview' },
    { to: '/transactions', label: 'Transactions' },
    { to: '/insights', label: 'Insights' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white/70 glass-morphism h-20 flex items-center justify-between px-8 border-b border-white/20">
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex items-center gap-5"
      >
        <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-white shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500">
          <img 
            alt="User profile" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwwoBu7Cy-I0sMYc9egqWEcQUUBe9dSyFXkW43TTaoGOWwfM1Z2wuD-Vk6UJ1ZT_3y-INeNwcoKL9IMcUi182O4esnZ9eZIiIv7B922KCaCF_XMITrWtSPvL2_-OFrnoRouAc7Jnr_M_yvcsZ4pXgHOc9nqEbsBB2w3BCPQJvoomElRz7YTtXOXVbw1K9LSrIJjkiZlmKTqJlelDQhxzSOwhAq_u8P2oh8Q9HatBJ9BRBtW6BdOV8QtNNRFXcnjfB1SxsK6_1hhd55" 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-xl font-black tracking-tighter text-slate-900 font-headline leading-none">
            The Sovereign Ledger
          </h1>
          <span className="text-[10px] font-bold text-primary opacity-50 uppercase tracking-[0.2em] flex items-center gap-1.5">
            {role === 'admin' ? <ShieldCheck size={10} /> : <User size={10} />}
            {role === 'admin' ? 'Administrative Access' : 'Viewer Mode'}
          </span>
        </div>
      </motion.div>
      
      <nav className="hidden md:flex items-center bg-white/40 p-1.5 rounded-2xl border border-white/20 shadowed-sm">
        {navItems.map((item, i) => (
          <NavLink 
            key={item.to}
            to={item.to} 
            className={({ isActive }) => cn(
              "relative px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-500 rounded-xl overflow-hidden group",
              isActive ? "text-white" : "text-on-surface-variant hover:text-primary"
            )}
          >
            {({ isActive }) => (
              <>
                <span className="relative z-10">{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="header-active"
                    className="absolute inset-0 bg-primary soft-glow-primary z-0"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <motion.div 
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex items-center gap-3"
      >
        <button 
          onClick={toggleRole}
          className={cn(
            "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 duration-300 shadow-xl flex items-center gap-2",
            role === 'admin' ? "bg-slate-900 text-white" : "bg-white text-slate-900 border border-slate-200"
          )}
        >
          {role === 'admin' ? 'Admin Mode' : 'Viewer Mode'}
          <div className={cn(
            "w-2 h-2 rounded-full",
            role === 'admin' ? "bg-tertiary animate-pulse" : "bg-slate-300"
          )} />
        </button>
      </motion.div>
    </header>
  );
};

export default Header;
