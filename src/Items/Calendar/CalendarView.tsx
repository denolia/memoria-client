import Box from "@mui/material/Box";
import React from "react";
import { LoginRequired } from "../../Auth/Login/helpers/LoginRequired";
import { ItemDrawer } from "../Drawer/ItemDrawer";
import { useItems } from "../state/ItemContext";
import { ItemDrawerProvider } from "../state/ItemDrawerContext";
import { ItemType, Status } from "../types";
import { Calendar } from "./Calendar";

const defaultItem = {
  type: ItemType.TASK,
  status: Status.BACKLOG,
};

export function CalendarView() {
  const { items, loading } = useItems();

  return loading ? (
    <div>loading...</div>
  ) : (
    <LoginRequired>
      <ItemDrawerProvider defaultItem={defaultItem}>
        <Box sx={{ m: 3 }}>
          <Calendar items={items} />
        </Box>

        <ItemDrawer />
      </ItemDrawerProvider>
    </LoginRequired>
  );
}
