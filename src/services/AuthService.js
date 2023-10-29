
import axios from 'axios';

// const API_BASE_URL = 'https://a.techcarrel.in/api';
const API_BASE_URL = 'https://reqres.in/';


const api = axios.create({
  baseURL: API_BASE_URL,
});

const setAuthorizationHeader = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return !!token;
};

const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('authToken');
  setAuthorizationHeader(null);
};

const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const AuthService = {
  isAuthenticated: isAuthenticated,
  login: login,
  logout: logout,
  register: register, // Add the register function
};

export default AuthService;
