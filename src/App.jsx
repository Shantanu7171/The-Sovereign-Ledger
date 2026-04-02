import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Overview from './pages/Overview';
import Transactions from './pages/Transactions';
import Insights from './pages/Insights';
import { FinancialProvider } from './context/FinancialContext';

function App() {
  return (
    <FinancialProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/insights" element={<Insights />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </FinancialProvider>
  );
}

export default App;
