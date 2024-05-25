import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PostPropertyPage from './pages/PostPropertyPage';
import RouteGuard from './components/RouteGuard';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<RouteGuard><LoginPage /></RouteGuard>} />
          <Route path="/register" element={<RouteGuard><RegisterPage /></RouteGuard>} />
          <Route path="/post-property/:id?" element={<RouteGuard><PostPropertyPage /></RouteGuard>} />
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<HomePage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
