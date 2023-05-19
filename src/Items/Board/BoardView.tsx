import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";
import { LoginRequired } from "../../Auth/Login/helpers/LoginRequired";

import { useItems } from "../state/ItemContext";
import { ItemDrawerProvider } from "../state/ItemDrawerContext";
import { Board } from "./Board";
import { CreateItemFab } from "./CreateItemFab";
import { ItemDrawer } from "../Drawer/ItemDrawer";

export function BoardView() {
  const { items } = useItems();

  const theme = useTheme();

  return (
    <LoginRequired>
      <ItemDrawerProvider>
        <Typography variant="h4" gutterBottom marginLeft={theme.spacing(3)}>
          My items
        </Typography>

        {Object.keys(items)?.length > 0 && (
          <Box sx={{ m: 3 }}>
            <Board />
          </Box>
        )}

        <ItemDrawer />

        <CreateItemFab />
      </ItemDrawerProvider>
    </LoginRequired>
  );
}
