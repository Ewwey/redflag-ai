// scanService — handles scan submission and result fetching
import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

export const submitScan = (text, token) =>
  axios.post(`${API}/scans`, { job_description: text }, { headers: { Authorization: `Bearer ${token}` } });

export const getScanById = (id, token) =>
  axios.get(`${API}/scans/${id}`, { headers: { Authorization: `Bearer ${token}` } });
