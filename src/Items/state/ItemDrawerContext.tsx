import React, { useState } from "react";
import type { Item } from "../types";

interface ItemDrawerContext {
  editItem: Item | null;
  openDrawer: boolean;
  setOpenDrawer: (open: boolean, item: Item | null) => void;
}

const Context = React.createContext<ItemDrawerContext | undefined>(undefined);

export function ItemDrawerProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ItemDrawerContext>({
    editItem: null,
    openDrawer: false,
    setOpenDrawer: () => {},
  });

  const setOpenDrawer = (openDrawer: boolean, editItem: Item | null) => {
    setState(({ openDrawer: _, editItem: __, ...rest }) => ({
      openDrawer,
      editItem,
      ...rest,
    }));
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = { ...state, setOpenDrawer };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useItemDrawer() {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error("useItemDrawer must be used within a ItemDrawerProvider");
  }

  return context;
}
