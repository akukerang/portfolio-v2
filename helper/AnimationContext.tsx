"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AnimationContextType {
  animationToggled: boolean;
  toggleAnimation: () => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

interface AnimationProviderProps {
  children: ReactNode;
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
  const [animationToggled, setAnimationToggled] = useState<boolean>(true);

  // Toggle animation state
  const toggleAnimation = () => {
    setAnimationToggled(prevState => !prevState);
    console.log(`Animation toggled: ${!animationToggled}`);
  };

  return (
    <AnimationContext.Provider value={{ animationToggled, toggleAnimation }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = (): AnimationContextType => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};
