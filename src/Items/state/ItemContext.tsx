import React, { useEffect, useState } from "react";
import { useAuth } from "../../Auth/AuthContext";
import { keyBy } from "../../helpers/notLodash";
import { ItemType } from "../types";
import type { IndexedItems, Item } from "../types";
import { requestDeleteItem } from "./requestDeleteItem";
import { requestGetAllItems } from "./requestGetAllItems";
import { requestUpdateItem } from "./requestUpdateBook";

interface ItemsContext {
  items: IndexedItems;
  epics: IndexedItems;
  loading: boolean;
  getAllItems: () => void;
  updateItem: (_: Item) => Promise<boolean>;
  deleteItem: (_: Item["id"]) => Promise<boolean>;
}

const Context = React.createContext<ItemsContext | undefined>(undefined);

export function ItemsProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ItemsContext>({
    items: {},
    epics: {},
    loading: true,
    getAllItems: () => {},
    updateItem: async () => new Promise(() => {}),
    deleteItem: async () => new Promise(() => {}),
  });
  const { user, isLoggedIn, currentSpace } = useAuth();

  const getAllItems = async () => {
    const fetchedItems = await requestGetAllItems(currentSpace?.id, user?.jwt);
    const indexedItems = keyBy(fetchedItems, "id");
    const indexedEpics = keyBy(
      fetchedItems.filter((item) => item.type === ItemType.EPIC),
      "id"
    );

    if (indexedItems) {
      setState(({ items: _, epics: __, ...rest }) => ({
        items: indexedItems,
        epics: indexedEpics,
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

    setState(({ items, epics, ...rest }) => ({
      items: { ...items, [newItem.id]: newItem },
      ...(newItem.type === ItemType.EPIC
        ? { epics: { ...epics, [newItem.id]: newItem } }
        : { epics }),
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
