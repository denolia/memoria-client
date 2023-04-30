import React, { useEffect, useState } from "react";
// import { useAuth } from '../../Auth/AuthContext';
// import { requestUpdateItem } from './requestUpdateItem';
import type { Item } from "../types";
import { requestGetAllItems } from "./requestGetAllItems";

interface ItemsContext {
  items: Item[];
  loading: boolean;
  getAllItems: () => void;
  // eslint-disable-next-line no-unused-vars
  updateItem: (b: Item) => Promise<boolean>;
}

const Context = React.createContext<ItemsContext | undefined>(undefined);

export function ItemsProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ItemsContext>({
    items: [],
    loading: true,
    getAllItems: () => {},
    updateItem: async () => true,
  });
  // const { user } = useAuth();
  // TODO use real user
  // const user = { jwt: '123' };
  const getAllItems = async () => {
    const items = await requestGetAllItems(); // user?.jwt);
    if (items) {
      setState(({ items: _, ...rest }) => ({
        items,
        ...rest,
        loading: false,
      }));
    }
  };

  // eslint-disable-next-line no-unused-vars
  const updateItem = async (newItem: Item) =>
    // const res = await requestUpdateItem(newItem, user?.jwt);
    //
    // if (!res) {
    //   // todo add toast notification
    //   return false;
    // }
    //
    // setState(({ items, ...rest }) => {
    //   const existingItemIndex = items.findIndex(
    //     (item) => item.id === newItem.id,
    //   );
    //   if (existingItemIndex >= 0) {
    //     const updatedItems = [...items];
    //     updatedItems[existingItemIndex] = newItem;
    //     return {
    //       items: updatedItems,
    //       ...rest,
    //     };
    //   }
    //
    //   return {
    //     items: [...items, newItem],
    //     ...rest,
    //   };
    // });
    true;
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = { ...state, updateItem, getAllItems };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useItems() {
  // const { isLoggedIn } = useAuth();
  const isLoggedIn = true;
  const context = React.useContext(Context);
  if (!context) {
    throw new Error("useItems must be used within a ItemsProvider");
  }
  useEffect(() => {
    if (isLoggedIn) {
      context.getAllItems();
    }
  }, [isLoggedIn]);

  return context;
}
