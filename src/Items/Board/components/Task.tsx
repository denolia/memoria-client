import React from "react";

import { Draggable } from "@hello-pangea/dnd";
import { createTheme } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { requestDeleteItem } from "../../state/requestDeleteItem";

const darkTheme = createTheme({ palette: { mode: "dark" } });

export default function Task({ index, task }: { index: number; task: any }) {
  const token = "todo";

  const onDelete = async () => {
    // todo confirmation
    // todo use context to remove item from state
    const res = await requestDeleteItem(task, token);

    console.log("delete: to be implemented");
  };

  return (
    <Draggable draggableId={task.id} index={index}>
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
            <Typography>{task.title}</Typography>
            <DeleteOutlineIcon color="secondary" onClick={onDelete} />
          </Paper>
        </div>
      )}
    </Draggable>
  );
}
