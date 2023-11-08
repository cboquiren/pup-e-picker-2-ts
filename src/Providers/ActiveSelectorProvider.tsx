import { createContext, useContext, ReactNode, useState } from "react";
import { ActiveSelectorType } from "../types";

type ActiveSelectorContextType = {
  activeSelector: ActiveSelectorType;
  setActiveSelector: (selector: ActiveSelectorType) => void;
};

const ActiveSelectorContext = createContext<ActiveSelectorContextType>(
  {} as ActiveSelectorContextType
);

export const ActiveSelectorProvider = ({ children }: { children: ReactNode }) => {
  const [activeSelector, setActiveSelector] = useState<ActiveSelectorType>("unfavorited");

  return (
    <ActiveSelectorContext.Provider value={{ activeSelector, setActiveSelector }}>
      {children}
    </ActiveSelectorContext.Provider>
  );
};

export const useActiveSelector = () => useContext(ActiveSelectorContext);
