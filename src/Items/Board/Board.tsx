import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { groupBy } from "../../helpers/notLodash";
import { applyFilterCriteria } from "../filtering/filter";
import type { FilterCriteria } from "../filtering/types";
import { Operator } from "../filtering/types";
import { useItems } from "../ItemContext";
import type { ColumnDef, IndexedItems } from "../types";
import { Status } from "../types";
import { DraggableBoard } from "./DraggableBoard";
import type { BoardState } from "./types";

const defaultFilterCriteria: FilterCriteria = {
  status: { isNot: Status.DONE },
  dueDate: { isBefore: dayjs(new Date()).add(1, "week") },
};

function getBoardState(indexedItems: IndexedItems, filterCriteria: FilterCriteria): BoardState {
  const itemsArray = Object.values(indexedItems);
  const filteredItems = applyFilterCriteria(itemsArray, filterCriteria);

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
  filterCriteria,
  epic,
}: {
  filterCriteria?: FilterCriteria;
  epic?: string | null;
}) {
  const { items } = useItems();

  const filter: FilterCriteria = {
    ...defaultFilterCriteria,
    ...filterCriteria,
    ...(epic ? { epic: { [Operator.IS]: epic } } : {}),
  };

  const [state, setState] = useState(() => getBoardState(items, filter));

  useEffect(() => {
    setState(getBoardState(items, filter));
  }, [items, epic]);

  return <DraggableBoard state={state} setState={setState} />;
}
