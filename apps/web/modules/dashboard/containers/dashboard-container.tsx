"use client";

import { useState } from "react";
import { TaskModal } from "../components/modals/task-modal";
import { NewTaskModal } from "../components/modals/new-task-modal";
import { PageHeader } from "../components/page-header";
import { DashboardHeader } from "../components/dashboard-header";
import { SearchBar } from "../components/search-bar";
import { TaskGrid } from "../components/task-grid";
import { GridCustomizationMenu } from "../components/grid-customization-menu";
import { FeaturesList } from "../components/features-list";
import { useTasks } from "../hooks/use-tasks";
import { useGridApi } from "../hooks/use-grid-api";
import { DEFAULT_GRID_STYLE, type GridStyleSettings } from "../config/grid-style-config";

export function DashboardContainer() {
  const [styleSettings, setStyleSettings] = useState<GridStyleSettings>(DEFAULT_GRID_STYLE);
  
  const {
    tasks,
    selectedTask,
    isModalOpen,
    isNewTaskModalOpen,
    setIsNewTaskModalOpen,
    handleRowDoubleClick,
    handleCloseModal,
    handleNewTask,
    handleDeleteTasks,
  } = useTasks();

  const {
    quickFilterText,
    setQuickFilterText,
    gridApi,
    selectedCount,
    onGridReady,
    onSelectionChanged,
    handleDeleteSelected,
    getRowStyle,
  } = useGridApi();

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
            selectedCount={selectedCount}
          />

          <SearchBar
            value={quickFilterText}
            onChange={setQuickFilterText}
          >
            <GridCustomizationMenu 
              gridApi={gridApi} 
              styleSettings={styleSettings}
              onStyleChange={setStyleSettings}
            />
          </SearchBar>

          <TaskGrid
            tasks={tasks}
            quickFilterText={quickFilterText}
            onRowDoubleClick={handleRowDoubleClick}
            onGridReady={onGridReady}
            onSelectionChanged={onSelectionChanged}
            getRowStyle={getRowStyle}
            styleSettings={styleSettings}
          />

          <FeaturesList />
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
