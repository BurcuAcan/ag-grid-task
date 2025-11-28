"use client";

import { useCallback } from "react";
import type {
  CellKeyDownEvent,
  GridApi,
  Column,
  SuppressKeyboardEventParams,
  CellClickedEvent,
} from "ag-grid-community";
import type { FocusedCell } from "../types/grid";

type NavigateToCell = (api: GridApi, rowIndex: number, column: Column) => void;

interface UseGridKeyboardOptions<T> {
  getFocusedCell: () => FocusedCell | null;
  setFocusedCell: (cell: FocusedCell | null) => void;
}

export function useGridKeyboard<T>(options: UseGridKeyboardOptions<T>) {
  const { getFocusedCell, setFocusedCell } = options;

  const navigateToCell: NavigateToCell = useCallback((api, rowIndex, column) => {
    api.ensureIndexVisible(rowIndex);
    api.setFocusedCell(rowIndex, column);
    api.ensureColumnVisible(column);
  }, []);

  const suppressKeyboardEvent = useCallback(
    (params: SuppressKeyboardEventParams<T>) => {
      const key = params.event.key;
      if (key === "Enter" && !params.editing) {
        return true;
      }
      return false;
    },
    []
  );

  const onCellClicked = useCallback(
    (event: CellClickedEvent<T>) => {
      const { rowIndex, column, api } = event;
      const colId = column?.getColId();

      if (rowIndex === null || rowIndex === undefined || !colId) return;

      const previousFocused = getFocusedCell();
      const isSameCell =
        previousFocused?.rowIndex === rowIndex && previousFocused?.colId === colId;

      if (isSameCell) {
        api.startEditingCell({
          rowIndex,
          colKey: colId,
        });
        setFocusedCell(null);
      } else {
        setFocusedCell({ rowIndex, colId });
      }
    },
    [getFocusedCell, setFocusedCell]
  );

  const onCellKeyDown = useCallback(
    (event: CellKeyDownEvent<T>) => {
      const keyboardEvent = event.event as KeyboardEvent;
      if (keyboardEvent.key !== "Enter") return;

      keyboardEvent.preventDefault();
      keyboardEvent.stopPropagation();

      const { api, column: currentColumn, rowIndex: currentRowIndex } = event;
      if (!currentColumn || currentRowIndex === null || currentRowIndex === undefined)
        return;

      const allColumns = api.getAllDisplayedColumns();
      const currentColIndex = allColumns.findIndex(
        (col) => col.getColId() === currentColumn.getColId()
      );
      const isShiftPressed = keyboardEvent.shiftKey;

      const direction = isShiftPressed ? -1 : 1;
      const nextColIndex = currentColIndex + direction;
      const isWithinBounds = nextColIndex >= 0 && nextColIndex < allColumns.length;

      if (isWithinBounds) {
        navigateToCell(api, currentRowIndex, allColumns[nextColIndex]);
        setFocusedCell({
          rowIndex: currentRowIndex,
          colId: allColumns[nextColIndex].getColId(),
        });
      } else if (!isShiftPressed) {
        const newRowIndex = currentRowIndex + 1;
        navigateToCell(api, newRowIndex, allColumns[0]);
        setFocusedCell({
          rowIndex: newRowIndex,
          colId: allColumns[0].getColId(),
        });
      }
    },
    [navigateToCell, setFocusedCell]
  );

  return {
    onCellKeyDown,
    onCellClicked,
    suppressKeyboardEvent,
  };
}
