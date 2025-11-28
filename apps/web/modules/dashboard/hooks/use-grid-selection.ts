"use client";

import { useCallback, useRef } from "react";
import type { GridApi } from "ag-grid-community";
import type { FocusedCell } from "../types/grid";

export function useGridSelection<T>() {
  const focusedCellRef = useRef<FocusedCell | null>(null);
  const gridApiRef = useRef<GridApi<T> | null>(null);

  const setGridApi = useCallback((api: GridApi<T>) => {
    gridApiRef.current = api;
  }, []);

  const setFocusedCell = useCallback((cell: FocusedCell | null) => {
    focusedCellRef.current = cell;
  }, []);

  const getFocusedCell = useCallback(() => focusedCellRef.current, []);

  const clearSelection = useCallback(() => {
    if (gridApiRef.current) {
      const api = gridApiRef.current;
      
      api.deselectAll();
      api.clearFocusedCell();
      if (typeof api.clearRangeSelection === "function") {
        api.clearRangeSelection();
      }
      api.stopEditing(true);
      focusedCellRef.current = null;
    }
  }, []);

  return {
    setGridApi,
    setFocusedCell,
    getFocusedCell,
    clearSelection,
  };
}
