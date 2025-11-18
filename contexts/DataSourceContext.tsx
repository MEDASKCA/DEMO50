'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type DataSource = 'cerner' | 'mock';

interface DataSourceContextType {
  dataSource: DataSource;
  toggleDataSource: () => void;
  isCernerEnabled: boolean;
}

const DataSourceContext = createContext<DataSourceContextType | undefined>(undefined);

export function DataSourceProvider({ children }: { children: React.ReactNode }) {
  // Default to Cerner (integration ON)
  const [dataSource, setDataSource] = useState<DataSource>('cerner');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('dataSource');
    if (saved === 'cerner' || saved === 'mock') {
      setDataSource(saved);
    }
  }, []);

  const toggleDataSource = () => {
    setDataSource((prev) => {
      const newSource = prev === 'cerner' ? 'mock' : 'cerner';
      localStorage.setItem('dataSource', newSource);
      return newSource;
    });
  };

  const isCernerEnabled = dataSource === 'cerner';

  return (
    <DataSourceContext.Provider value={{ dataSource, toggleDataSource, isCernerEnabled }}>
      {children}
    </DataSourceContext.Provider>
  );
}

export function useDataSource() {
  const context = useContext(DataSourceContext);
  if (context === undefined) {
    throw new Error('useDataSource must be used within a DataSourceProvider');
  }
  return context;
}
