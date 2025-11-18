'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ListeningContextType {
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
}

const ListeningContext = createContext<ListeningContextType | undefined>(undefined);

export function ListeningProvider({ children }: { children: ReactNode }) {
  const [isListening, setIsListening] = useState(false);

  return (
    <ListeningContext.Provider value={{ isListening, setIsListening }}>
      {children}
    </ListeningContext.Provider>
  );
}

export function useListening() {
  const context = useContext(ListeningContext);
  if (context === undefined) {
    return { isListening: false, setIsListening: () => {} };
  }
  return context;
}
