export interface Task {
  id: number;
  title: string;
  description: string;
  status: "Todo" | "In Progress" | "Done" | "Blocked";
  priority: "Low" | "Medium" | "High" | "Critical";
  assignedTo: string;
  project: string;
  dueDate: string;
  estimateHours: number;
}

export type TaskStatus = Task["status"];
export type TaskPriority = Task["priority"];
