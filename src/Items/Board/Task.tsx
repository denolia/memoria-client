import { Draggable } from "@hello-pangea/dnd";
import { createTheme } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import { useItems } from "../state/ItemContext";
import type { Item } from "../types";
import { ActionMenu } from "./ActionMenu";

const darkTheme = createTheme({ palette: { mode: "dark" } });

interface Props {
  order: number;
  taskId: Item["id"];
}

export default function Task({ order, taskId }: Props) {
  const { items } = useItems();

  const task = items[taskId];

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
            <ActionMenu task={task} />
          </Paper>
        </div>
      )}
    </Draggable>
  ) : null;
}
