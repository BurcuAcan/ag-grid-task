import { AgGridReact } from "ag-grid-react";
import type {
  GridReadyEvent,
  RowDoubleClickedEvent,
  RowClassParams,
  SelectionChangedEvent,
} from "ag-grid-community";
import { useCallback, useEffect, useMemo, useRef } from "react";
import type { AgGridReact as AgGridReactType } from "ag-grid-react";
import { Task } from "../types/task";
import { useColumnDefs } from "../hooks/use-column-defs";
import { useGridSelection } from "../hooks/use-grid-selection";
import { useGridKeyboard } from "../hooks/use-grid-keyboard";
import { getContextMenuItems } from "../utils/grid-context-menu";
import { GRID_CONFIG, SIDEBAR_CONFIG } from "../config/grid-config";
import { getGridStyleClasses, getRowHeight, type GridStyleSettings } from "../config/grid-style-config";

interface TaskGridProps {
  tasks: Task[];
  quickFilterText: string;
  onRowDoubleClick: (event: RowDoubleClickedEvent<Task>) => void;
  onGridReady: (params: GridReadyEvent<Task>) => void;
  onSelectionChanged: (event: SelectionChangedEvent<Task>) => void;
  getRowStyle: (params: RowClassParams<Task>) => any;
  styleSettings: GridStyleSettings;
}

export function TaskGrid({
  tasks,
  quickFilterText,
  onRowDoubleClick,
  onGridReady,
  onSelectionChanged,
  getRowStyle,
  styleSettings,
}: TaskGridProps) {
  const { columnDefs, defaultColDef } = useColumnDefs();
  const { setGridApi, getFocusedCell, setFocusedCell, clearSelection } = useGridSelection<Task>();
  const { onCellKeyDown, onCellClicked, suppressKeyboardEvent } = useGridKeyboard<Task>({
    getFocusedCell,
    setFocusedCell,
  });
  const gridRef = useRef<AgGridReactType<Task>>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleGridReady = useCallback((params: GridReadyEvent<Task>) => {
    setGridApi(params.api);
    onGridReady(params);
  }, [setGridApi, onGridReady]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        clearSelection();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clearSelection]);

  const mergedDefaultColDef = useMemo(
    () => ({
      ...defaultColDef,
      suppressKeyboardEvent,
    }),
    [defaultColDef, suppressKeyboardEvent]
  );

  return (
    <div ref={containerRef} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className={`ag-theme-quartz ${getGridStyleClasses(styleSettings)}`} style={{ height: GRID_CONFIG.height, width: "100%" }}>
        <AgGridReact
          ref={gridRef}
          rowData={tasks}
          columnDefs={columnDefs}
          defaultColDef={mergedDefaultColDef}
          rowSelection="multiple"
          pagination
          paginationPageSize={GRID_CONFIG.paginationPageSize}
          rowHeight={getRowHeight(styleSettings)}
          quickFilterText={quickFilterText}
          onRowDoubleClicked={onRowDoubleClick}
          onGridReady={handleGridReady}
          onSelectionChanged={onSelectionChanged}
          sideBar={SIDEBAR_CONFIG}
          rowGroupPanelShow={GRID_CONFIG.rowGroupPanelShow}
          pivotPanelShow={GRID_CONFIG.pivotPanelShow}
          groupDisplayType={GRID_CONFIG.groupDisplayType}
          animateRows={GRID_CONFIG.animateRows}
          suppressAggFuncInHeader={GRID_CONFIG.suppressAggFuncInHeader}
          cellSelection={GRID_CONFIG.cellSelection}
          enableCharts={GRID_CONFIG.enableCharts}
          getRowStyle={getRowStyle}
          getContextMenuItems={getContextMenuItems}
          popupParent={typeof document !== "undefined" ? document.body : undefined}
          tooltipShowDelay={500}
          enableBrowserTooltips
          singleClickEdit={false}
          onCellClicked={onCellClicked}
          onCellKeyDown={onCellKeyDown}
        />
      </div>
    </div>
  );
}
