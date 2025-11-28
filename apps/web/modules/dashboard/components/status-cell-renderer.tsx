import { ICellRendererParams } from "ag-grid-community";
import { Task, TaskStatus } from "../types/task";
import { STATUS_COLORS } from "../constants/colors";

export const StatusCellRenderer = (params: ICellRendererParams<Task>) => {
  if (params.node.footer) return null;
  
  const value = params.value as TaskStatus;
  const colors = STATUS_COLORS[value] ?? STATUS_COLORS.Todo;

  return (
    <span
      className={`${colors.bg} ${colors.text} px-2 py-0.5 rounded-full text-xs font-medium`}
    >
      {value}
    </span>
  );
};
