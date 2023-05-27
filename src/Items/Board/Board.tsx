import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { groupBy } from "../../helpers/notLodash";
import { useItems } from "../state/ItemContext";
import type { ColumnDef, IndexedItems, Item, ParentInfo } from "../types";
import { Status } from "../types";
import { DraggableBoard } from "./DraggableBoard";
import type { BoardState } from "./types";

enum Operator {
  IS = "is",
  IS_NOT = "isNot",
}

enum DateOperator {
  IS_BEFORE = "isBefore",
  // IS_AFTER = "isAfter",
}

type DateCriteria = Partial<Record<DateOperator, Dayjs | Date>>;

type FieldCriteria<T> = Partial<Record<Operator, T>>;
// todo rework this to put operator in the values

type FilterCriteria = {
  type?: FieldCriteria<Item["type"]>;
  status?: FieldCriteria<Item["status"]>;
  dueDate?: DateCriteria;
  epic?: FieldCriteria<ParentInfo["id"]>;
};

const defaultFilterCriteria: FilterCriteria = {
  status: { isNot: Status.DONE },
  dueDate: { isBefore: dayjs(new Date()).add(1, "week") },
};

function checkCriteria<T>(operator: Operator, criteria: T, value: T | undefined | null): boolean {
  if (value === undefined || value === null) {
    return true;
  }
  if (operator === Operator.IS) {
    return criteria === value;
  }

  if (operator === Operator.IS_NOT) {
    return criteria !== value;
  }

  return true;
}

function applyFilterToField<T>(fieldCriteria: FieldCriteria<T>, value: T) {
  return Object.entries(fieldCriteria).every(([operator, criteria]) =>
    checkCriteria<T>(operator as Operator, criteria, value)
  );
}

function checkStatus(status: FieldCriteria<Status> | undefined, item: Item) {
  if (status) {
    const now = dayjs(new Date());
    const weekAgo = now.subtract(1, "week");
    const statusSatisfied = applyFilterToField(status, item.status);
    const isLatelyChanged = dayjs(item.created).isAfter(weekAgo);

    return statusSatisfied || isLatelyChanged;
  }
  return true;
}

function checkDueDate(dueDate: DateCriteria | undefined, item: Item) {
  if (dueDate) {
    if (!item.dueDate) {
      return true;
    }

    const now = dayjs(new Date());

    const isBefore = dayjs(item.dueDate).isBefore(dayjs(dueDate.isBefore));
    const isOverdue = dayjs(item.dueDate).isBefore(now);
    const canBeOverdue = item.status !== Status.DONE;

    return isBefore && (canBeOverdue || !isOverdue);
  }
  return true;
}

function checkEpic(epic: FieldCriteria<ParentInfo["id"]> | undefined, item: Item) {
  if (epic) {
    if (epic.is === "none") {
      return !item.parent;
    }

    return item.parent?.id === epic.is;
  }
  return true;
}

function applyFilterCriteria(items: Item[], filterCriteria: FilterCriteria): Item[] {
  return items.filter((item) => {
    const { dueDate, epic, status, ...restCriteria } = filterCriteria;

    const res = Object.entries(restCriteria).every(([field, criteria]) =>
      applyFilterToField(criteria, item[field as keyof Item])
    );

    if (!res) {
      return false;
    }

    if (!checkStatus(status, item)) {
      return false;
    }

    if (!checkDueDate(dueDate, item)) {
      return false;
    }

    if (!checkEpic(epic, item)) {
      return false;
    }

    return true;
  });
}

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
