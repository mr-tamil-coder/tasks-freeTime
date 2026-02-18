import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  login as loginService, 
  getToken, 
  setToken, 
  removeToken, 
  getUser, 
  setUser, 
  removeUser,
  setRefreshToken,
  getRefreshToken,
  removeRefreshToken
} from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [token, setTokenState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getUser();
    
    if (storedToken && storedUser) {
      setTokenState(storedToken);
      setUserState(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const data = await loginService(username, password);
      setToken(data.accessToken);
      if (data.refreshToken) {
        setRefreshToken(data.refreshToken);
      }
      
      setUser(data);
      setTokenState(data.accessToken);
      setUserState(data);
      
      return { success: true, data };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed. Please check your credentials.' 
      };
    }
  };

  const logout = () => {
    // Clear tokens and user data
    removeToken();
    removeRefreshToken();
    removeUser();
    
    // Update state
    setTokenState(null);
    setUserState(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
