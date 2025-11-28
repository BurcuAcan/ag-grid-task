import { useState } from "react";
import type { RowDoubleClickedEvent } from "ag-grid-community";
import { type Task, mockTasks } from "@repo/mock-data";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  const handleRowDoubleClick = (event: RowDoubleClickedEvent<Task>) => {
    if (event.data) {
      setSelectedTask(event.data);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleNewTask = (newTask: Omit<Task, "id">) => {
    const maxId = Math.max(...tasks.map((t) => t.id));
    const taskWithId: Task = {
      ...newTask,
      id: maxId + 1,
    };
    setTasks([...tasks, taskWithId]);
    setIsNewTaskModalOpen(false);
  };

  const handleDeleteTasks = (taskIds: number[]) => {
    const updatedTasks = tasks.filter((task) => !taskIds.includes(task.id));
    setTasks(updatedTasks);
  };

  return {
    tasks,
    selectedTask,
    isModalOpen,
    isNewTaskModalOpen,
    setIsNewTaskModalOpen,
    handleRowDoubleClick,
    handleCloseModal,
    handleNewTask,
    handleDeleteTasks,
  };
}
