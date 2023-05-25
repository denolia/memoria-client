import { Draggable } from "@hello-pangea/dnd";
import { Chip, createTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
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

function TaskDueDateLabel({ dueDate }: { dueDate: Item["dueDate"] }) {
  return dueDate ? (
    <Typography variant="body2" sx={{ color: "grey.600" }}>
      {dayjs(dueDate).format("MMM D")}
    </Typography>
  ) : null;
}
function EpicLabel({ epic }: { epic: Item["parent"] }) {
  return epic ? (
    <Typography variant="body2" sx={{ color: "grey.600", mb: 0.5 }}>
      [{epic.title}]
    </Typography>
  ) : null;
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
              padding: 0.7,
              backgroundColor: snapshot.isDragging ? darkTheme.palette.primary.light : "white",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ flexGrow: 1, overflowWrap: "anywhere" }}>{task.title}</Typography>
              <ActionMenu task={task} />
            </Box>

            <EpicLabel epic={task.parent} />
            <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
              <Chip
                size="small"
                variant={task.priority === Priority.HIGH ? "filled" : "outlined"}
                label={task.priority}
                color={getPriorityColor(task.priority)}
              />
              <TaskDueDateLabel dueDate={task.dueDate} />
            </Box>
          </Paper>
        </div>
      )}
    </Draggable>
  ) : null;
}
