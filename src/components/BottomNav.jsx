import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, LineChart } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const BottomNav = () => {
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Overview' },
    { to: '/transactions', icon: ReceiptText, label: 'Transactions' },
    { to: '/insights', icon: LineChart, label: 'Insights' },
  ];

  return (
    <nav className="fixed bottom-6 left-6 right-6 flex justify-around items-center h-20 bg-white/70 glass-morphism rounded-3xl border border-white/40 shadow-2xl z-50 md:hidden">
      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => cn(
            "relative flex flex-col items-center justify-center w-20 h-full transition-all duration-500",
            isActive ? "text-primary scale-110" : "text-slate-400"
          )}
        >
          {({ isActive }) => (
            <>
              <Icon className={cn("w-6 h-6 mb-1 relative z-10", isActive && "stroke-[2.5px]")} />
              <span className="text-[9px] font-black uppercase tracking-tighter relative z-10 leading-none">{label}</span>
              {isActive && (
                <motion.div 
                  layoutId="bottom-active"
                  className="absolute inset-x-2 inset-y-2 bg-primary/10 rounded-2xl z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
