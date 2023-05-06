import React from "react";
import Paper from "@mui/material/Paper";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import type { Item } from "../../types";

interface Props {
  item: Item;
}

export function ItemTableRow({ item }: Props) {
  console.log(item);
  return (
    <Paper key={item.id} elevation={2} sx={{ padding: 1 }}>
      {item.title}
      <DeleteOutlineIcon color="secondary" />
    </Paper>
  );
}
