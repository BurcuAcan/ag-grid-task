"use client";

import { TaskModal } from "../modals/task-modal";
import { NewTaskModal } from "../modals/new-task-modal";
import { PageHeader } from "../components/page-header";
import { DashboardHeader } from "../components/dashboard-header";
import { SearchBar } from "../components/search-bar";
import { TaskGrid } from "../components/task-grid";
import { useTaskManagement } from "../hooks/use-task-management";
import { useGridManagement } from "../hooks/use-grid-management";

export function DashboardContainer() {
  const {
    tasks,
    selectedTask,
    isModalOpen,
    isNewTaskModalOpen,
    setIsNewTaskModalOpen,
    handleRowClick,
    handleCloseModal,
    handleNewTask,
    handleDeleteTasks,
  } = useTaskManagement();

  const {
    quickFilterText,
    setQuickFilterText,
    onGridReady,
    handleDeleteSelected,
    getRowStyle,
  } = useGridManagement();

  return (
    <div className="w-full min-h-screen bg-white">
      <PageHeader
        title="Çalışan Yönetim Sistemi"
        subtitle="AG Grid Enterprise ile gelişmiş tablo yönetimi"
      />

      <main className="min-h-[calc(100vh-80px)] w-full bg-gradient-to-b from-slate-50 to-slate-100 px-6 py-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <DashboardHeader
            onNewTask={() => setIsNewTaskModalOpen(true)}
            onDeleteSelected={() => handleDeleteSelected(handleDeleteTasks)}
          />

          <SearchBar
            value={quickFilterText}
            onChange={setQuickFilterText}
          />

          <TaskGrid
            tasks={tasks}
            quickFilterText={quickFilterText}
            onRowClick={handleRowClick}
            onGridReady={onGridReady}
            getRowStyle={getRowStyle}
          />
        </div>
      </main>

      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        onSubmit={handleNewTask}
      />

      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
