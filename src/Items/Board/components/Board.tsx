import type { DropResult } from "@hello-pangea/dnd";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { Stack } from "@mui/material";
import React, { useState } from "react";
import { groupBy, keyBy } from "../../../helpers/notLodash";
import { moveItem, reorder } from "../../../helpers/reorder";
import type { ColumnDef, Item } from "../../types";
import { Column } from "./Column";

function getInitialState(fetchedItems: Item[]) {
  // since it is a function, the filtering and grouping will be executed only once
  return () => {
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
      } as { [key: string]: ColumnDef },
      columnOrder: ["column-0", "column-1", "column-2", "column-3"],
    };
  };
}

export function Board({ fetchedItems }: { fetchedItems: Item[] }) {
  const [state, setState] = useState(getInitialState(fetchedItems));

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
      const { startTaskIds, finishTaskIds } = moveItem(
        start.taskIds,
        source.index,
        finish.taskIds,
        destination.index
      );

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
