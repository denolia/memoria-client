import type { DropResult } from "@hello-pangea/dnd";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { Stack } from "@mui/material";
import React, { useState } from "react";
import { groupBy, keyBy } from "../../../helpers/notLodash";
import type { Item } from "../../types";
import { Column } from "./Column";

export function Board({ fetchedItems }: { fetchedItems: Item[] }) {
  const [state, setState] = useState(() => {
    const keyedTasks = keyBy(fetchedItems, "id");
    const groupedTasks = groupBy(fetchedItems, (item) => item.status);

    return {
      tasks: keyedTasks,
      columns: {
        "column-0": {
          id: "column-0",
          title: "Backlog",
          taskIds: groupedTasks.Backlog?.map((item) => item.id) ?? [],
        },
        "column-1": {
          id: "column-1",
          title: "To do",
          taskIds: groupedTasks.Todo?.map((item) => item.id) ?? [],
        },
        "column-2": {
          id: "column-2",
          title: "In progress",
          taskIds: groupedTasks.Inprogress?.map((item) => item.id) ?? [],
        },
        "column-3": {
          id: "column-3",
          title: "Done",
          taskIds: groupedTasks.Done?.map((item) => item.id) ?? [],
        },
      },
      columnOrder: ["column-0", "column-1", "column-2", "column-3"],
    };
  });

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (type === "column") {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setState((currState) => ({
        ...currState,
        columnOrder: newColumnOrder,
      }));
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

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
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
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
                const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

                return <Column key={columnId} column={column} tasks={tasks} index={index} />;
              })}
              {provided.placeholder}
            </Stack>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
