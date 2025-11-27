import { ICellRendererParams } from "ag-grid-community";
import { Task, TaskStatus } from "../../types/task";

const statusConfig: Record<
  TaskStatus,
  { bg: string; text: string; label: string }
> = {
  Todo: {
    bg: "bg-gray-100",
    text: "text-gray-800",
    label: "Todo",
  },
  "In Progress": {
    bg: "bg-blue-100",
    text: "text-blue-800",
    label: "In Progress",
  },
  Done: {
    bg: "bg-green-100",
    text: "text-green-800",
    label: "Done",
  },
  Blocked: {
    bg: "bg-red-100",
    text: "text-red-800",
    label: "Blocked",
  },
};

export const StatusCellRenderer = (params: ICellRendererParams<Task>) => {
  if (params.node.footer) return null;
  
  const value = params.value as TaskStatus;
  const cfg = statusConfig[value] ?? statusConfig.Todo;

  return (
    <span
      className={`${cfg.bg} ${cfg.text} px-2 py-0.5 rounded-full text-xs font-medium`}
    >
      {cfg.label}
    </span>
  );
};
