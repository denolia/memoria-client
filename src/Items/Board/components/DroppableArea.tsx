import { Droppable } from "@hello-pangea/dnd";
import { Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import type { ColumnDef, Item } from "../../types";
import Task from "./Task";

interface Props {
  column: ColumnDef;
  tasks: Item[];
}

export function DroppableArea({ column, tasks }: Props) {
  const theme = useTheme();

  return (
    <Droppable droppableId={column.id}>
      {(dropProvided, dropSnapshot) => (
        <div {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
          <Stack
            spacing={1}
            sx={{
              minHeight: 100,
              padding: 1,
              backgroundColor: dropSnapshot.isDraggingOver ? theme.palette.grey["300"] : "white",
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
  );
}
