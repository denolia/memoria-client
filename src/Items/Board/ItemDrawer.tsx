import { Drawer } from "@mui/material";
import React from "react";
import { ItemFormContainer } from "../Editor/components/ItemFormContainer";
import { useItemDrawer } from "../state/ItemDrawerContext";

export function ItemDrawer() {
  const { openDrawer, setOpenDrawer } = useItemDrawer();
  return (
    <Drawer
      anchor="right"
      // hideBackdrop
      open={openDrawer}
      onClose={() => setOpenDrawer(false, null)}
    >
      <ItemFormContainer />
    </Drawer>
  );
}
