import React from 'react';
import LoginForm from '../components/LoginForm'; // Make sure the path matches where your LoginForm is

const AuthPage = () => {
  const handleLogin = (username, password) => {
    // Implement your login logic here, e.g., API call
    console.log(username, password);
  };

  return (
    <div>
       
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default AuthPage;
