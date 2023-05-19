import React from "react";
import { LoginRequired } from "../../Auth/Login/helpers/LoginRequired";
import { useItemDrawer } from "../state/ItemDrawerContext";
import { ItemForm } from "./ItemForm";

export function ItemFormContainer() {
  const { editItem } = useItemDrawer();

  return (
    <LoginRequired>
      {editItem?.id ? (
        <ItemForm currentItem={editItem} submitButtonText="update item" pageTitle="edit item" />
      ) : (
        <ItemForm submitButtonText="create item" pageTitle="create item" />
      )}
    </LoginRequired>
  );
}
