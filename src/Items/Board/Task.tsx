import { Draggable } from "@hello-pangea/dnd";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { createTheme } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import { useItems } from "../state/ItemContext";
import type { Item } from "../types";

const darkTheme = createTheme({ palette: { mode: "dark" } });

interface Props {
  order: number;
  taskId: Item["id"];
}

export default function Task({ order, taskId }: Props) {
  const { deleteItem, items } = useItems();
  const task = items[taskId];
  const onDelete = async () => {
    // todo confirmation
    deleteItem(taskId);
  };

  return task ? (
    <Draggable draggableId={taskId} index={order}>
      {(provided, snapshot) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <Paper
            sx={{
              padding: 1,
              backgroundColor: snapshot.isDragging ? darkTheme.palette.primary.light : "white",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography>{task?.title}</Typography>
            <DeleteOutlineIcon color="secondary" onClick={onDelete} />
          </Paper>
        </div>
      )}
    </Draggable>
  ) : null;
}
