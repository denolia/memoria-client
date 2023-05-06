import type { DropResult } from "@hello-pangea/dnd";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { Stack } from "@mui/material";
import React, { useState } from "react";
import { groupBy, keyBy } from "../../../helpers/notLodash";
import { moveItem, reorder } from "../../../helpers/reorder";
import { requestUpdateItem } from "../../state/requestUpdateBook";
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
        Backlog: {
          id: "Backlog",
          title: "Backlog",
          taskIds: groupedTasks.Backlog?.map((item) => item.id) ?? [],
        },
        Todo: {
          id: "Todo",
          title: "To do",
          taskIds: groupedTasks.Todo?.map((item) => item.id) ?? [],
        },
        Inprogress: {
          id: "Inprogress",
          title: "In progress",
          taskIds: groupedTasks.Inprogress?.map((item) => item.id) ?? [],
        },
        Done: {
          id: "Done",
          title: "Done",
          taskIds: groupedTasks.Done?.map((item) => item.id) ?? [],
        },
      } as { [key: string]: ColumnDef },
      columnOrder: ["Backlog", "Todo", "Inprogress", "Done"],
    };
  };
}

export function Board({ fetchedItems }: { fetchedItems: Item[] }) {
  const [state, setState] = useState(getInitialState(fetchedItems));
  // todo auth
  const token = "todo";

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
      const { startTaskIds, finishTaskIds, removed } = moveItem(
        start.taskIds,
        source.index,
        finish.taskIds,
        destination.index
      );

      const updatedTask: Item = { ...state.tasks[removed], status: finish.id };
      const res = await requestUpdateItem(updatedTask, token);

      if (res) {
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
