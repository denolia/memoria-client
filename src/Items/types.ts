import { Space } from "../Auth/types";

export enum ItemType {
  TASK = "Task",
  EPIC = "Epic",
}

export enum Status {
  TODO = "Todo",
  IN_PROGRESS = "InProgress",
  DONE = "Done",
  BACKLOG = "Backlog",
}

export enum Priority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

export interface ParentInfo {
  id: string;
  title?: string;
}

export interface Item {
  id: string;
  type: ItemType;
  title?: string;
  status: Status;
  priority: Priority;
  creator: {
    name: string;
    id: string;
  };
  assignee?: {
    name: string;
    id: string;
  };
  parent?: ParentInfo | null;
  space?: Space | null;
  description?: string | null;
  statusOrder: number;
  updated: string;
  dueDate?: string | null;
  created: string;
}

export interface IndexedItems {
  [key: string]: Item;
}

export interface ColumnDef {
  id: Status;
  title: string;
  taskIds: string[];
}
