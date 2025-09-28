'use client';

import { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

export enum CursorVariant {
  DEFAULT = 'default',
  HOVER = 'hover',
  TEXT = 'text',
  VIEW = 'view',
  NONE = 'none',
}

interface CursorContextType {
  cursorVariant: CursorVariant;
  setCursorVariant: Dispatch<SetStateAction<CursorVariant>>;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>(CursorVariant.DEFAULT);

  return (
    <CursorContext.Provider value={{ cursorVariant, setCursorVariant }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};
