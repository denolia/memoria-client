import { Draggable } from "@hello-pangea/dnd";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import type { ColumnDef, Item } from "../types";
import { DroppableArea } from "./DroppableArea";

interface Props {
  tasks: Item["id"][];
  column: ColumnDef;
  index: number;
}

export function Column({ column, index, tasks }: Props) {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(dragProvided, dragSnapshot) => (
        <div {...dragProvided.draggableProps} ref={dragProvided.innerRef}>
          <Paper
            elevation={dragSnapshot.isDragging ? 2 : 0}
            sx={{ width: 220, marginX: 1, padding: 1, height: "100%" }}
          >
            <Typography variant="h5" sx={{ padding: 1 }} {...dragProvided.dragHandleProps}>
              {column.title}
            </Typography>
            <DroppableArea column={column} tasks={tasks} />
          </Paper>
        </div>
      )}
    </Draggable>
  );
}
