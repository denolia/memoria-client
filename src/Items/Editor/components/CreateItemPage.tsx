import React from "react";
import { LoginRequired } from "../../../Auth/Login/helpers/LoginRequired";
import { ItemForm } from "./ItemForm";

export function CreateItemPage() {
  return (
    <LoginRequired>
      <ItemForm submitButtonText="Create Item" pageTitle="Create New Item" />
    </LoginRequired>
  );
}
