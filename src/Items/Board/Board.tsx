import type { DropResult } from "@hello-pangea/dnd";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { Stack, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { groupBy } from "../../helpers/notLodash";
import { moveItem, reorder } from "../../helpers/reorder";
import { useItems } from "../state/ItemContext";
import { Status } from "../types";
import type { ColumnDef, Item, IndexedItems } from "../types";
import { Column } from "./Column";

function getBoardState(indexedItems: IndexedItems, filter?: (item: Item) => boolean) {
  const itemsArray = Object.values(indexedItems);
  const filteredItems = filter ? itemsArray.filter(filter) : itemsArray;

  const groupedTasks = groupBy(filteredItems, (item) => item.status);

  return {
    columns: {
      [Status.BACKLOG]: {
        id: Status.BACKLOG,
        title: "backlog",
        taskIds: groupedTasks.Backlog?.map((item) => item.id) ?? [],
      },
      [Status.TODO]: {
        id: Status.TODO,
        title: "todo",
        taskIds: groupedTasks.Todo?.map((item) => item.id) ?? [],
      },
      [Status.IN_PROGRESS]: {
        id: Status.IN_PROGRESS,
        title: "in progress",
        taskIds: groupedTasks.InProgress?.map((item) => item.id) ?? [],
      },
      [Status.DONE]: {
        id: Status.DONE,
        title: "done",
        taskIds: groupedTasks.Done?.map((item) => item.id) ?? [],
      },
    } as { [key: string]: ColumnDef },
    columnOrder: [Status.BACKLOG, Status.TODO, Status.IN_PROGRESS, Status.DONE],
  };
}

export function Board({
  filter,
  epic,
}: {
  filter?: (item: Item) => boolean;
  epic?: string | null;
}) {
  const { items, updateItem } = useItems();
  const commonFilter = (item: Item) =>
    (filter ? filter?.(item) : true) && (epic ? item.parent?.id === epic : true);
  const [state, setState] = useState(() => getBoardState(items, commonFilter));

  useEffect(() => {
    setState(getBoardState(items, commonFilter));
  }, [items, epic]);

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

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

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
