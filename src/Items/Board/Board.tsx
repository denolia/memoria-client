import type { DropResult } from "@hello-pangea/dnd";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { groupBy } from "../../helpers/notLodash";
import { moveItem, reorder } from "../../helpers/reorder";
import { useItems } from "../state/ItemContext";
import { Status } from "../types";
import type { ColumnDef, Item, IndexedItems } from "../types";
import { Column } from "./Column";

function getBoardState(indexedItems: IndexedItems) {
  const groupedTasks = groupBy(Object.values(indexedItems), (item) => item.status);

  return {
    columns: {
      [Status.BACKLOG]: {
        id: Status.BACKLOG,
        title: "Backlog",
        taskIds: groupedTasks.Backlog?.map((item) => item.id) ?? [],
      },
      [Status.TODO]: {
        id: Status.TODO,
        title: "To do",
        taskIds: groupedTasks.Todo?.map((item) => item.id) ?? [],
      },
      [Status.IN_PROGRESS]: {
        id: Status.IN_PROGRESS,
        title: "In progress",
        taskIds: groupedTasks.InProgress?.map((item) => item.id) ?? [],
      },
      [Status.DONE]: {
        id: Status.DONE,
        title: "Done",
        taskIds: groupedTasks.Done?.map((item) => item.id) ?? [],
      },
    } as { [key: string]: ColumnDef },
    columnOrder: [Status.BACKLOG, Status.TODO, Status.IN_PROGRESS, Status.DONE],
  };
}

export function Board() {
  const { items, updateItem } = useItems();
  const [state, setState] = useState(() => getBoardState(items));

  useEffect(() => {
    setState(getBoardState(items));
  }, [items]);

  const onDragEnd = async (result: DropResult) => {
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
  );
}
