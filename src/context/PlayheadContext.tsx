import React, { createContext, useContext, useState, ReactNode } from "react";

interface PlayheadContextType {
  playheadPosition: number;
  setPlayheadPosition: React.Dispatch<React.SetStateAction<number>>;
}

const PlayheadContext = createContext<PlayheadContextType | undefined>(undefined);

export function PlayheadProvider({ children }: { children: ReactNode }) {
  const [playheadPosition, setPlayheadPositionState] = useState<number>(0);

  // The setState function should be wrapped to enforce a minimum value
  const setPlayheadPosition: React.Dispatch<React.SetStateAction<number>> = (newPosition) => {
    // If the newPosition is a function (prevState => newState), apply it.
    if (typeof newPosition === 'function') {
      setPlayheadPositionState(prevState => Math.max(0, newPosition(prevState)));
    } else {
      setPlayheadPositionState(Math.max(0, newPosition));
    }
  };

  const value = {
    playheadPosition,
    setPlayheadPosition,
  };

  return (
    <PlayheadContext.Provider value={value}>
      {children}
    </PlayheadContext.Provider>
  );
}

export function usePlayheadContext() {
  const context = useContext(PlayheadContext);
  if (context === undefined) {
    throw new Error("usePlayheadContext must be used within a PlayheadProvider");
  }
  return context;
}