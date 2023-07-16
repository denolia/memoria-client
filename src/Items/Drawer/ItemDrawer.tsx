import { Drawer } from "@mui/material";
import React from "react";
import { ItemFormContainer } from "./ItemFormContainer";
import { useItemDrawer } from "../ItemDrawerContext";

export function ItemDrawer() {
  const { openDrawer, setOpenDrawer } = useItemDrawer();
  return (
    <Drawer
      anchor="right"
      // hideBackdrop
      open={openDrawer}
      onClose={() => setOpenDrawer(false)}
    >
      <ItemFormContainer />
    </Drawer>
  );
}
