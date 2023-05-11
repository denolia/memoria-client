import { Draggable } from "@hello-pangea/dnd";
import { Chip, createTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import { useItems } from "../state/ItemContext";
import { Priority } from "../types";
import type { Item } from "../types";
import { ActionMenu } from "./ActionMenu";

const darkTheme = createTheme({ palette: { mode: "dark" } });

interface Props {
  order: number;
  taskId: Item["id"];
}

function getPriorityColor(priority: string | undefined) {
  console.log(priority);
  switch (priority) {
    case Priority.LOW:
      return "default";
    case Priority.MEDIUM:
      return "primary";
    case Priority.HIGH:
      return "success";
    default:
      return "default";
  }
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
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ flexGrow: 1 }}>{task?.title}</Typography>
              <ActionMenu task={task} />
            </Box>

            <Chip
              size="small"
              variant={task?.priority === Priority.HIGH ? "filled" : "outlined"}
              label={task?.priority}
              color={getPriorityColor(task?.priority)}
            />
          </Paper>
        </div>
      )}
    </Draggable>
  ) : null;
}
