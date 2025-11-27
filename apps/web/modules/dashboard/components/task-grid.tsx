import { AgGridReact } from "ag-grid-react";
import type { GridReadyEvent, RowClickedEvent, RowClassParams } from "ag-grid-community";
import { Task } from "../types/task";
import { useColumnDefs } from "../hooks/use-column-defs";
import { getContextMenuItems } from "../utils/grid-context-menu";
import { GRID_CONFIG, SIDEBAR_CONFIG } from "../config/grid-config";
import "@/config/ag-grid-modules";

interface TaskGridProps {
  tasks: Task[];
  quickFilterText: string;
  onRowClick: (event: RowClickedEvent<Task>) => void;
  onGridReady: (params: GridReadyEvent<Task>) => void;
  getRowStyle: (params: RowClassParams<Task>) => any;
}

export function TaskGrid({
  tasks,
  quickFilterText,
  onRowClick,
  onGridReady,
  getRowStyle,
}: TaskGridProps) {
  const { columnDefs, defaultColDef } = useColumnDefs();
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="ag-theme-quartz" style={{ height: GRID_CONFIG.height, width: "100%" }}>
        <AgGridReact
          rowData={tasks}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          pagination
          paginationPageSize={GRID_CONFIG.paginationPageSize}
          quickFilterText={quickFilterText}
          onRowClicked={onRowClick}
          onGridReady={onGridReady}
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
        />
      </div>
    </div>
  );
}
