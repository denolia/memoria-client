import type { Dayjs } from "dayjs";
import type { Item, ParentInfo } from "../types";

export enum Operator {
  IS = "is",
  IS_NOT = "isNot",
}

enum DateOperator {
  IS_BEFORE = "isBefore",
  // IS_AFTER = "isAfter",
}

export type DateCriteria = Partial<Record<DateOperator, Dayjs | Date>>;

export type FieldCriteria<T> = Partial<Record<Operator, T>>;

// todo rework this to put operator in the values
export type FilterCriteria = {
  type?: FieldCriteria<Item["type"]>;
  status?: FieldCriteria<Item["status"]>;
  dueDate?: DateCriteria;
  epic?: FieldCriteria<ParentInfo["id"]>;
};
