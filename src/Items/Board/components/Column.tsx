import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Stack } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";
import Task from "./Task";

export function Column({ column, index, tasks }: { tasks: any; column: any; index: number }) {
  const theme = useTheme();

  return (
    <Draggable draggableId={column.id} index={index}>
      {(dragProvided, dragSnapshot) => (
        <div {...dragProvided.draggableProps} ref={dragProvided.innerRef}>
          <Paper
            elevation={dragSnapshot.isDragging ? 2 : 0}
            sx={{ width: 220, marginX: 1, padding: 1 }}
          >
            <Typography variant="h5" sx={{ padding: 1 }} {...dragProvided.dragHandleProps}>
              {column.title}
            </Typography>
            <Droppable droppableId={column.id}>
              {(dropProvided, dropSnapshot) => (
                <div
                  {...dropProvided.droppableProps}
                  ref={dropProvided.innerRef}
                  // isDraggingOver={snapshot.isDraggingOver}
                >
                  <Stack
                    spacing={1}
                    sx={{
                      minHeight: 100,
                      padding: 1,
                      backgroundColor: dropSnapshot.isDraggingOver
                        ? theme.palette.grey["300"]
                        : "white",
                      transition: `background-color 0.2s ${theme.transitions.easing.easeOut}`,
                    }}
                  >
                    {tasks.map((task: any, taskIndex: number) => (
                      <Task key={task.id} task={task} index={taskIndex} />
                    ))}
                    {dropProvided.placeholder}
                  </Stack>
                </div>
              )}
            </Droppable>
          </Paper>
        </div>
      )}
    </Draggable>
  );
}
