import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import React from "react";
import { useItemDrawer } from "../state/ItemDrawerContext";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

export function CreateItemFab() {
  const { setOpenDrawer } = useItemDrawer();

  const onAddItem = () => {
    setOpenDrawer(true, null);
  };

  return (
    <Fab color="success" aria-label="add" sx={fabStyle}>
      <AddIcon onClick={onAddItem} />
    </Fab>
  );
}
