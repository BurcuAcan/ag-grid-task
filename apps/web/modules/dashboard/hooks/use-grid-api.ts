import { useState, useCallback } from "react";
import type { GridApi, GridReadyEvent, RowClassParams, SelectionChangedEvent } from "ag-grid-community";
import { Task } from "../types/task";
import { PRIORITY_COLORS } from "../constants/colors";

export function useGridApi() {
  const [quickFilterText, setQuickFilterText] = useState("");
  const [gridApi, setGridApi] = useState<GridApi<Task> | null>(null);
  const [selectedCount, setSelectedCount] = useState(0);

  const onGridReady = (params: GridReadyEvent<Task>) => {
    setGridApi(params.api);
  };

  const onSelectionChanged = useCallback((event: SelectionChangedEvent<Task>) => {
    const selectedRows = event.api.getSelectedRows();
    setSelectedCount(selectedRows.length);
  }, []);

  const handleDeleteSelected = (onDelete: (ids: number[]) => void) => {
    if (!gridApi) return;

    const selectedRows = gridApi.getSelectedRows();

    if (selectedRows.length === 0) {
      return;
    }

    const selectedIds = selectedRows.map((row: Task) => row.id);
    onDelete(selectedIds);
    setSelectedCount(0);
  };

  const getRowStyle = (params: RowClassParams<Task>) => {
    if (!params.data) return;

    const priority = params.data.priority;
    const colors = PRIORITY_COLORS[priority];

    if (colors) {
      return { background: colors.rowBg };
    }

    return undefined;
  };

  return {
    quickFilterText,
    setQuickFilterText,
    gridApi,
    selectedCount,
    onGridReady,
    onSelectionChanged,
    handleDeleteSelected,
    getRowStyle,
  };
}
