import React, { useState } from "react";
import type { Item } from "../types";

interface ItemDrawerContext {
  editItemId: Item["id"] | null;
  openDrawer: boolean;
  setEditItem: (_: Item["id"] | null) => void;
  setOpenDrawer: (_: boolean) => void;
}

const Context = React.createContext<ItemDrawerContext | undefined>(undefined);

export function ItemDrawerProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ItemDrawerContext>({
    editItemId: null,
    openDrawer: false,
    setEditItem: () => {},
    setOpenDrawer: () => {},
  });

  const setEditItem = (editItemId: Item["id"] | null) => {
    setState(({ editItemId: _, ...rest }) => ({
      editItemId,
      ...rest,
    }));
  };

  const setOpenDrawer = (openDrawer: boolean) => {
    setState(({ openDrawer: _, ...rest }) => ({
      openDrawer,
      ...rest,
    }));
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = { ...state, setEditItem, setOpenDrawer };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useItemDrawer() {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error("useItemDrawer must be used within a ItemDrawerProvider");
  }

  return context;
}
