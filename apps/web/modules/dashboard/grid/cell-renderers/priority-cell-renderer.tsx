import { ICellRendererParams } from "ag-grid-community";
import { Task, TaskPriority } from "../../types/task";

const priorityConfig: Record<
  TaskPriority,
  { bg: string; text: string; label: string }
> = {
  Low: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    label: "Low",
  },
  Medium: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    label: "Medium",
  },
  High: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    label: "High",
  },
  Critical: {
    bg: "bg-red-50",
    text: "text-red-700",
    label: "Critical",
  },
};

export const PriorityCellRenderer = (params: ICellRendererParams<Task>) => {
  if (params.node.footer) return null;
  
  const value = params.value as TaskPriority;
  const cfg = priorityConfig[value] ?? priorityConfig.Medium;

  return (
    <span
      className={`${cfg.bg} ${cfg.text} px-2 py-0.5 rounded-full text-xs font-medium`}
    >
      {cfg.label}
    </span>
  );
};
