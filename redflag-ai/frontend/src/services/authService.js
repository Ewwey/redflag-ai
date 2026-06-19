import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

// temporary  
console.log(API);

export const register = (data) =>
  axios.post(`${API}/auth/register`, data);

export const login = (data) =>
  axios.post(`${API}/auth/login`, data);

export const logout = (token) =>
  axios.post(
    `${API}/auth/logout`,
    {},
    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : undefined
  );

export const updateProfile = (data, token) =>
  axios.put(`${API}/profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });