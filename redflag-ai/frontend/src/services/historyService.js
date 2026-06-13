// historyService — handles scan history CRUD calls
import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

export const getHistory = (params, token) =>
  axios.get(`${API}/scans`, { params, headers: { Authorization: `Bearer ${token}` } });

export const deleteScan = (id, token) =>
  axios.delete(`${API}/scans/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export const updateFeedback = (id, status, token) =>
  axios.patch(`${API}/scans/${id}/feedback`, { feedback_status: status }, { headers: { Authorization: `Bearer ${token}` } });
