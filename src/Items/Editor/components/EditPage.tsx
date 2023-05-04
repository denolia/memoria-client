import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
// import { useAuth } from '../../../Auth/AuthContext';
import { fetchItemById } from "../../state/fetchItemById";
import type { Item } from "../../types";
import { ItemForm } from "./ItemForm";

export function EditPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<Item>();
  // const { user } = useAuth();
  const user = { jwt: "123" };

  useEffect(() => {
    if (id) {
      fetchItemById(id, user?.jwt).then((itemFetched: Item) => {
        setItem(itemFetched);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!item) {
    // todo notification
    return <div>Unable to fetch the item</div>;
  }

  return <ItemForm currentItem={item} submitButtonText="Update Item" title="Edit Item" />;
}