import Box from "@mui/material/Box";
import React from "react";
import { LoginRequired } from "../../Auth/Login/helpers/LoginRequired";
import { ItemDrawer } from "../Drawer/ItemDrawer";
import { ItemDrawerProvider } from "../state/ItemDrawerContext";
import { Board } from "./Board";
import { CreateItemFab } from "./CreateItemFab";

export function BoardView() {
  return (
    <LoginRequired>
      <ItemDrawerProvider>
        <Box sx={{ m: 3 }}>
          <Board />
        </Box>

        <ItemDrawer />

        <CreateItemFab />
      </ItemDrawerProvider>
    </LoginRequired>
  );
}
