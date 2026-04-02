import React from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-surface mesh-gradient flex flex-col selection:bg-primary/10 selection:text-primary">
      <Header />
      <main className="flex-1 pt-24 pb-28 md:pb-12 px-6 max-w-7xl mx-auto w-full relative">
        <AnimatePresence mode="wait">
          <div key={location.pathname} className="h-full">
            {children}
          </div>
        </AnimatePresence>
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;
