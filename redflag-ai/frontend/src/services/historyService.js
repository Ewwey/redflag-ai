// useHistory — custom React hook
import axios from "axios";
const API = import.meta.env.VITE_API_BASE_URL;

export const getHistory = (token) =>
  axios.get(`${API}/scans`, { headers: { Authorization: `Bearer ${token}` } });

export const deleteHistoryEntry = (id, token) =>
  axios.delete(`${API}/scans/${id}`, { headers: { Authorization: `Bearer ${token}` } });
