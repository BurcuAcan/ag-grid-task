export { DashboardContainer } from "./containers/dashboard-container";

export { TaskModal } from "./modals/task-modal";
export { NewTaskModal } from "./modals/new-task-modal";

export { DashboardHeader } from "./components/dashboard-header";
export { SearchBar } from "./components/search-bar";
export { TaskGrid } from "./components/task-grid";
export { TaskDetailPanel } from "./components/task-detail-panel";
export { PageHeader } from "./components/page-header";

export { useTaskManagement } from "./hooks/use-task-management";
export { useGridManagement } from "./hooks/use-grid-management";
export { useColumnDefs } from "./hooks/use-column-defs";

export type { Task, TaskStatus, TaskPriority } from "./types/task";
export { mockTasks } from "./data/mock-tasks";
