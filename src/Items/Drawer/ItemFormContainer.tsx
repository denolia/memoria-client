import React from "react";
import { LoginRequired } from "../../Auth/Login/helpers/LoginRequired";
import { useItemDrawer } from "../state/ItemDrawerContext";
import { ItemForm } from "./ItemForm";

export function ItemFormContainer() {
  const { editItem } = useItemDrawer();

  return (
    <LoginRequired>
      {editItem ? (
        <ItemForm currentItem={editItem} submitButtonText="Update Item" pageTitle="Edit Item" />
      ) : (
        <ItemForm submitButtonText="Create Item" pageTitle="Create New Item" />
      )}
    </LoginRequired>
  );
}
