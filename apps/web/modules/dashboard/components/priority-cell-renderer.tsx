import { ICellRendererParams } from "ag-grid-community";
import { Task, TaskPriority } from "../types/task";
import { PRIORITY_COLORS } from "../constants/colors";

export const PriorityCellRenderer = (params: ICellRendererParams<Task>) => {
  if (params.node.footer) return null;
  
  const value = params.value as TaskPriority;
  const colors = PRIORITY_COLORS[value] ?? PRIORITY_COLORS.Medium;

  return (
    <span
      className={`${colors.bg} ${colors.text} px-2 py-0.5 rounded-full text-xs font-medium`}
    >
      {value}
    </span>
  );
};
