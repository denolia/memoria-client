// import { Stack } from "@mui/material";
import React, { useState } from "react";
import type { DropResult } from "react-beautiful-dnd";
import DraggableList from "../../../DragDrop/DraggableList";
import { reorder } from "../../../helpers/helpers";
import type { Item } from "../../types";

export function Board({ fetchedItems }: { fetchedItems: Item[] }) {
  const [items, setItems] = useState(fetchedItems);
  console.log(items);

  const onDragEnd = ({ destination, source }: DropResult) => {
    // dropped outside the list
    if (!destination) return;

    const newItems = reorder(items, source.index, destination.index);

    setItems(newItems);
  };

  return <DraggableList items={items} onDragEnd={onDragEnd} />;
}
