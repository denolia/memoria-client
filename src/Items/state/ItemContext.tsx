import React, { useEffect, useState } from "react";
import { useAuth } from "../../Auth/AuthContext";
import { keyBy } from "../../helpers/notLodash";
import type { Item } from "../types";
import { requestDeleteItem } from "./requestDeleteItem";
import { requestGetAllItems } from "./requestGetAllItems";
import { requestUpdateItem } from "./requestUpdateBook";

interface ItemsContext {
  items: { [key: string]: Item }; // store indexed items for easier access
  loading: boolean;
  getAllItems: () => void;
  updateItem: (_: Item) => Promise<boolean>;
  deleteItem: (_: Item["id"]) => Promise<boolean>;
}

const Context = React.createContext<ItemsContext | undefined>(undefined);

export function ItemsProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ItemsContext>({
    items: {},
    loading: true,
    getAllItems: () => {},
    updateItem: async () => true,
    deleteItem: async () => true,
  });
  const { user, isLoggedIn } = useAuth();

  const getAllItems = async () => {
    const fetchedItems = await requestGetAllItems(user?.jwt);
    const indexedItems = keyBy(fetchedItems, "id");

    if (indexedItems) {
      setState(({ items: _, ...rest }) => ({
        items: indexedItems,
        ...rest,
        loading: false,
      }));
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getAllItems();
    }
  }, [isLoggedIn]);

  const updateItem = async (updatedItem: Item) => {
    const res = await requestUpdateItem(updatedItem, user?.jwt);

    if (!res) {
      // todo add toast notification
      return false;
    }
    const newItem = res.data;

    setState(({ items, ...rest }) => ({
      items: { ...items, [newItem.id]: newItem },
      ...rest,
    }));
    return true;
  };

  const deleteItem = async (deletedItemId: Item["id"]) => {
    const res = await requestDeleteItem(deletedItemId, user?.jwt);

    if (!res) {
      // todo add toast notification
      return false;
    }

    setState(({ items: currItems, ...rest }) => {
      // delete currItems[deletedItemId];
      const { [deletedItemId]: _, ...items } = currItems;
      return {
        items,
        ...rest,
      };
    });
    return true;
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = { ...state, updateItem, getAllItems, deleteItem };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useItems() {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error("useItems must be used within a ItemsProvider");
  }

  return context;
}
