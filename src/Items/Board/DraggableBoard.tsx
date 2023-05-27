import type { DropResult } from "@hello-pangea/dnd";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { Box, Stack } from "@mui/material";
import React from "react";
import { moveItem, reorder } from "../../helpers/reorder";
import { useItems } from "../state/ItemContext";
import type { Item, Status } from "../types";
import { Column } from "./Column";
import type { BoardState } from "./types";

export function DraggableBoard({
  state,
  setState,
}: {
  state: BoardState;
  setState: React.Dispatch<React.SetStateAction<BoardState>>;
}) {
  const { items, updateItem } = useItems();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (type === "column") {
      const newColumnOrder = reorder(state.columnOrder, source.index, destination.index);

      setState((currState) => ({
        ...currState,
        columnOrder: newColumnOrder,
      }));
      return;
    }

    const start = state.columns[source.droppableId as Status];
    const finish = state.columns[destination.droppableId as Status];

    if (start === finish) {
      const newTaskIds = reorder(start.taskIds, source.index, destination.index);
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      setState((currState) => ({
        ...currState,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      }));
    } else {
      const {
        startTaskIds,
        finishTaskIds,
        removed: movedItem,
      } = moveItem(start.taskIds, source.index, finish.taskIds, destination.index);

      const updatedTask: Item = { ...items[movedItem], status: finish.id };

      // initiate request to backend, without awaiting response
      updateItem(updatedTask);

      // in parallel, optimistically update UI
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };
      setState((currState) => ({
        ...currState,
        columns: {
          ...state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      }));
    }
  };

  return (
    <Box sx={{ marginX: { xs: 0, md: 3 }, marginY: { xs: 1, md: 2 } }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              // isDraggingOver={snapshot.isDraggingOver}
            >
              <Stack direction="row">
                {state.columnOrder.map((columnId, index) => {
                  const column = state.columns[columnId];

                  return (
                    <Column key={columnId} column={column} tasks={column.taskIds} index={index} />
                  );
                })}
                {provided.placeholder}
              </Stack>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
}
