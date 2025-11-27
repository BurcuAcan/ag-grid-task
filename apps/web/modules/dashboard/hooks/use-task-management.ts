import { useState } from "react";
import type { RowClickedEvent } from "ag-grid-community";
import { Task } from "../types/task";
import { mockTasks } from "../data/mock-tasks";

export function useTaskManagement() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  const handleRowClick = (event: RowClickedEvent<Task>) => {
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
    handleRowClick,
    handleCloseModal,
    handleNewTask,
    handleDeleteTasks,
  };
}
