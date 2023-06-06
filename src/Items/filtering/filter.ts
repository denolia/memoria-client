import dayjs from "dayjs";
import type { Item, ParentInfo } from "../types";
import { Status } from "../types";
import type { DateCriteria, FieldCriteria, FilterCriteria } from "./types";
import { Operator } from "./types";

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
    const isLatelyChanged = dayjs(item.updated).isAfter(weekAgo);

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

export function applyFilterCriteria(items: Item[], filterCriteria: FilterCriteria): Item[] {
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
