import Box from "@mui/material/Box";
import React from "react";
import { LoginRequired } from "../../Auth/Login/helpers/LoginRequired";
import { ItemDrawer } from "../Drawer/ItemDrawer";
import { useItems } from "../state/ItemContext";
import { ItemDrawerProvider } from "../state/ItemDrawerContext";
import { Calendar } from "./Calendar";

export function CalendarView() {
  const { items, loading } = useItems();

  return loading ? (
    <div>loading...</div>
  ) : (
    <LoginRequired>
      <ItemDrawerProvider>
        <Box sx={{ m: 3 }}>
          <Calendar items={items} />
        </Box>

        <ItemDrawer />
      </ItemDrawerProvider>
    </LoginRequired>
  );
}
