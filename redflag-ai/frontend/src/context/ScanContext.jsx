// ScanContext — shares current scan result between Scanner and Result pages
import { createContext, useContext, useState } from 'react';

const ScanContext = createContext(null);

export function ScanProvider({ children }) {
  const [scanResult, setScanResult] = useState(null);
  return (
    <ScanContext.Provider value={{ scanResult, setScanResult }}>
      {children}
    </ScanContext.Provider>
  );
}

export function useScanContext() {
  return useContext(ScanContext);
}
