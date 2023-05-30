import React from "react";
import { LoginRequired } from "../Auth/Login/helpers/LoginRequired";
import { Board } from "../Items/Board/Board";
import { ItemDrawer } from "../Items/Drawer/ItemDrawer";
import { ItemDrawerProvider } from "../Items/state/ItemDrawerContext";
import { ItemType } from "../Items/types";

const defaultItem = {
  type: ItemType.EPIC,
};

export function EpicBoardView() {
  return (
    <LoginRequired>
      <ItemDrawerProvider defaultItem={defaultItem}>
        <Board filterCriteria={{ type: { is: ItemType.EPIC } }} />

        <ItemDrawer />
      </ItemDrawerProvider>
    </LoginRequired>
  );
}
