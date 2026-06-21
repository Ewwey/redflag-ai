// useHistory — custom React hook
import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { getHistory } from "../services/historyService";

export function useHistory() {
  const { token } = useAuth();
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    getHistory(token)
      .then(res => setScans(res.data))
      .catch(() => setError("Failed to load scan history"))
      .finally(() => setLoading(false));
  }, [token]);

  return { scans, loading, error };
}