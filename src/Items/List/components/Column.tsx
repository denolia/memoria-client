import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Stack } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import styled from "styled-components";
import Task from "./Task";

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? "skyblue" : "inherit")};
  flex-grow: 1;
  min-height: 100px;
`;

export function Column({ column, index, tasks }: { tasks: any; column: any; index: number }) {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <Paper elevation={snapshot.isDragging ? 2 : 0} sx={{ width: 220 }}>
            <Typography variant="h5" sx={{ padding: 1 }} {...provided.dragHandleProps}>
              {column.title}
            </Typography>
            <Droppable droppableId={column.id}>
              {(provided, snapshot) => (
                <TaskList
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <Stack spacing={2}>
                    {tasks.map((task, index) => (
                      <Task key={task.id} task={task} index={index} />
                    ))}
                    {provided.placeholder}
                  </Stack>
                </TaskList>
              )}
            </Droppable>
          </Paper>
        </div>
      )}
    </Draggable>
  );
}
