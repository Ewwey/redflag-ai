// authService — handles all auth-related API calls
import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

export const register = (data) => axios.post(`${API}/auth/register`, data);
export const login = (data) => axios.post(`${API}/auth/login`, data);
export const logout = () => axios.post(`${API}/auth/logout`);
export const updateProfile = (data, token) =>
  axios.put(`${API}/profile`, data, { headers: { Authorization: `Bearer ${token}` } });
