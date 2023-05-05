import { Draggable } from "@hello-pangea/dnd";
import { createTheme } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";

const darkTheme = createTheme({ palette: { mode: "dark" } });

export default function Task({ index, task }: { index: number; task: any }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <Paper
            sx={{
              padding: 1,
              backgroundColor: snapshot.isDragging ? darkTheme.palette.primary.light : "white",
            }}
          >
            <Typography>{task.title}</Typography>
          </Paper>
        </div>
      )}
    </Draggable>
  );
}
