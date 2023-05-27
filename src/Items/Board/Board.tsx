import React, { useEffect, useState } from "react";
import { groupBy } from "../../helpers/notLodash";
import { useItems } from "../state/ItemContext";
import type { ColumnDef, IndexedItems, Item } from "../types";
import { Status } from "../types";
import { DraggableBoard } from "./DraggableBoard";
import type { BoardState } from "./types";

function getBoardState(indexedItems: IndexedItems, filter?: (item: Item) => boolean): BoardState {
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
    } as Record<Status, ColumnDef>,
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
  const { items } = useItems();
  const commonFilter = (item: Item) =>
    (filter ? filter?.(item) : true) && (epic ? item.parent?.id === epic : true);
  const [state, setState] = useState(() => getBoardState(items, commonFilter));

  useEffect(() => {
    setState(getBoardState(items, commonFilter));
  }, [items, epic]);

  return <DraggableBoard state={state} setState={setState} />;
}
