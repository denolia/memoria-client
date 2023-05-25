import React from "react";
import { LoginRequired } from "../Auth/Login/helpers/LoginRequired";
import { Board } from "../Items/Board/Board";
import { ItemDrawer } from "../Items/Drawer/ItemDrawer";
import { ItemDrawerProvider } from "../Items/state/ItemDrawerContext";
import { ItemType } from "../Items/types";

const defaultItem = {
  type: ItemType.TASK,
};

export function TaskBoardView() {
  return (
    <LoginRequired>
      <ItemDrawerProvider defaultItem={defaultItem}>
        <Board filter={(item) => item.type === ItemType.TASK} />

        <ItemDrawer />
      </ItemDrawerProvider>
    </LoginRequired>
  );
}
