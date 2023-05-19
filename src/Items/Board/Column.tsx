import { Draggable } from "@hello-pangea/dnd";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import { useItemDrawer } from "../state/ItemDrawerContext";
import type { ColumnDef, Item } from "../types";
import { DroppableArea } from "./DroppableArea";

interface Props {
  tasks: Item["id"][];
  column: ColumnDef;
  index: number;
}

export function Column({ column, index, tasks }: Props) {
  const { setOpenDrawer } = useItemDrawer();

  const onAddItem = (col: ColumnDef) => {
    setOpenDrawer(true, { status: col.id });
  };

  return (
    <Draggable draggableId={column.id} index={index}>
      {(dragProvided, dragSnapshot) => (
        <div {...dragProvided.draggableProps} ref={dragProvided.innerRef}>
          <Paper
            elevation={dragSnapshot.isDragging ? 2 : 0}
            sx={{ width: 220, marginX: 1, padding: 1, height: "100%" }}
          >
            <Box sx={{ display: "flex", alignItems: "center", padding: 1, color: "grey.800" }}>
              <Typography variant="overline" sx={{ flexGrow: 1 }} {...dragProvided.dragHandleProps}>
                {column.title}
              </Typography>
              <Button
                id="add-item-button"
                onClick={() => onAddItem(column)}
                sx={{ minWidth: "20px", color: "grey.500" }}
              >
                <AddIcon />
              </Button>
            </Box>

            <DroppableArea column={column} tasks={tasks} />
          </Paper>
        </div>
      )}
    </Draggable>
  );
}
