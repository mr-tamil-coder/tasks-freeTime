import axiosInstance from '../api/axiosConfig';
// Login with username and password
export const login = async (username, password) => {
  try {
    const response = await axiosInstance.post('/auth/login', {
      username,
      password,
      expiresInMins: 1, 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get current authenticated user
export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Refresh authentication token
export const refreshToken = async (refreshToken) => {
  try {
    const response = await axiosInstance.post('/auth/refresh', {
      refreshToken,
      expiresInMins: 1,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const setToken = (token) => {
  sessionStorage.setItem('authToken', token);
};

export const getToken = () => {
  return sessionStorage.getItem('authToken');
};

export const removeToken = () => {
  sessionStorage.removeItem('authToken');
};

export const setRefreshToken = (token) => {
  sessionStorage.setItem('refreshToken', token);
};

export const getRefreshToken = () => {
  return sessionStorage.getItem('refreshToken');
};

export const removeRefreshToken = () => {
  sessionStorage.removeItem('refreshToken');
};

export const setUser = (user) => {
  sessionStorage.setItem('user', JSON.stringify(user));
};

export const getUser = () => {
  const user = sessionStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const removeUser = () => {
  sessionStorage.removeItem('user');
};

export const isAuthenticated = () => {
  return !!getToken();
};
