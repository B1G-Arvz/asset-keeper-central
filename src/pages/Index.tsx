
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import AssetDashboard from '../components/AssetDashboard';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <AssetDashboard onLogout={handleLogout} />;
};

export default Index;
