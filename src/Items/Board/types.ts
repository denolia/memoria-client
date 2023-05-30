import { ColumnDef, Status } from "../types";

export interface BoardState {
  columns: Record<Status, ColumnDef>;
  columnOrder: Status[];
}
