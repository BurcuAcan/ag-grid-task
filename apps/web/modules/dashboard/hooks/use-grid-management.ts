import { useState } from "react";
import type { GridApi, GridReadyEvent, RowClassParams } from "ag-grid-community";
import { Task } from "../types/task";

export function useGridManagement() {
  const [quickFilterText, setQuickFilterText] = useState("");
  const [gridApi, setGridApi] = useState<GridApi<Task> | null>(null);

  const onGridReady = (params: GridReadyEvent<Task>) => {
    setGridApi(params.api);
  };

  const handleDeleteSelected = (onDelete: (ids: number[]) => void) => {
    if (!gridApi) return;

    const selectedRows = gridApi.getSelectedRows();

    if (selectedRows.length === 0) {
      alert("⚠️ Lütfen silmek için en az bir görev seçin!");
      return;
    }

    const confirmDelete = window.confirm(
      `🗑️ ${selectedRows.length} adet görevi silmek istediğinize emin misiniz?`
    );

    if (confirmDelete) {
      const selectedIds = selectedRows.map((row: Task) => row.id);
      onDelete(selectedIds);
    }
  };

  const getRowStyle = (params: RowClassParams<Task>) => {
    if (!params.data) return;

    const priority = params.data.priority;

    switch (priority) {
      case "Critical":
        return { background: "rgba(239, 68, 68, 0.08)" };
      case "High":
        return { background: "rgba(249, 115, 22, 0.08)" };
      case "Medium":
        return { background: "rgba(234, 179, 8, 0.06)" };
      case "Low":
        return { background: "rgba(34, 197, 94, 0.06)" };
      default:
        return undefined;
    }
  };

  return {
    quickFilterText,
    setQuickFilterText,
    gridApi,
    onGridReady,
    handleDeleteSelected,
    getRowStyle,
  };
}
