import React from "react";
import { LoginRequired } from "../../Auth/Login/helpers/LoginRequired";
import { useItemDrawer } from "../ItemDrawerContext";
import { ItemForm } from "./ItemForm";

export function ItemFormContainer() {
  const { editItem } = useItemDrawer();

  const actionText = `${editItem?.id ? "update" : "create"} item`;

  return (
    <LoginRequired>
      <ItemForm actionText={actionText} />
    </LoginRequired>
  );
}
