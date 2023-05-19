import React, { useState } from "react";
import type { Item } from "../types";

interface ItemDrawerContext {
  editItem: Partial<Item>;
  openDrawer: boolean;
  setOpenDrawer: (open: boolean, item?: Partial<Item>) => void;
}

const Context = React.createContext<ItemDrawerContext | undefined>(undefined);

export function ItemDrawerProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ItemDrawerContext>({
    editItem: {},
    openDrawer: false,
    setOpenDrawer: () => {},
  });

  const setOpenDrawer = (openDrawer: boolean, editItem?: Partial<Item>) => {
    setState(({ openDrawer: _, editItem: currentEditItem, ...rest }) => ({
      openDrawer,
      editItem: openDrawer ? editItem ?? {} : currentEditItem,
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
