export enum ItemType {
  TASK = "Task",
  EPIC = "Epic",
}

export interface Item {
  id: string;
  type: ItemType;
  title?: string;
  status: string;
  priority: string;
  creator: {
    name: string;
    id: string;
  };
  assignee?: {
    name: string;
    id: string;
  };
  parent?: string | null;
  description?: string | null;
  statusOrder: number;
  updated: string;
  dueDate?: string | null;
  created: string;
}

export interface ColumnDef {
  id: string;
  title: string;
  taskIds: string[];
}
