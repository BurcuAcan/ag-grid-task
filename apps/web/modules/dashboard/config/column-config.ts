import type { ColDef, ColGroupDef } from "ag-grid-community";
import { Task } from "../types/task";
import { StatusCellRenderer } from "../components/status-cell-renderer";
import { PriorityCellRenderer } from "../components/priority-cell-renderer";
import {
  TASK_STATUSES,
  TASK_PRIORITIES,
  ASSIGNEES,
  PROJECTS,
} from "../constants/task-options";
import { formatTurkishDate, formatHours } from "../utils/formatters";

export const DEFAULT_COL_DEF: ColDef<Task> = {
  sortable: true,
  filter: true,
  resizable: true,
  floatingFilter: true,
  enableValue: true,
  enableRowGroup: true,
  enablePivot: true,
  minWidth: 100,
  wrapHeaderText: true,
  autoHeaderHeight: true,
};

const checkboxColumn: ColDef<Task> = {
  headerName: "",
  checkboxSelection: true,
  headerCheckboxSelection: true,
  width: 50,
  pinned: "left",
  filter: false,
  sortable: false,
  enableRowGroup: false,
  enablePivot: false,
  enableValue: false,
};

const idColumn: ColDef<Task> = {
  field: "id",
  headerName: "ID",
  width: 80,
  filter: false,
  enableRowGroup: false,
  enablePivot: false,
  enableValue: false,
};

const taskInfoGroup: ColGroupDef<Task> = {
  headerName: "📋 Görev Bilgisi",
  marryChildren: true,
  children: [
    {
      field: "title",
      headerName: "Başlık",
      flex: 1.5,
      minWidth: 200,
      editable: true,
      filter: "agTextColumnFilter",
      filterParams: {
        defaultOption: "startsWith",
      },
      floatingFilter: true,
      tooltipField: "title",
    },
    {
      field: "description",
      headerName: "Açıklama",
      flex: 2,
      minWidth: 250,
      tooltipField: "description",
      filter: "agTextColumnFilter",
      filterParams: {
        defaultOption: "contains",
      },
      floatingFilter: true,
    },
  ],
};

const statusPriorityGroup: ColGroupDef<Task> = {
  headerName: "📊 Durum ve Öncelik",
  marryChildren: true,
  children: [
    {
      field: "status",
      headerName: "Durum",
      width: 140,
      editable: true,
      enablePivot: true,
      enableRowGroup: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: TASK_STATUSES,
      },
      filter: "agSetColumnFilter",
      filterParams: {
        values: TASK_STATUSES,
      },
      floatingFilter: true,
      cellRenderer: StatusCellRenderer,
      chartDataType: "category",
    },
    {
      field: "priority",
      headerName: "Öncelik",
      width: 130,
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: TASK_PRIORITIES,
      },
      filter: "agSetColumnFilter",
      filterParams: {
        values: TASK_PRIORITIES,
      },
      floatingFilter: true,
      cellRenderer: PriorityCellRenderer,
      chartDataType: "category",
    },
  ],
};

const assignmentGroup: ColGroupDef<Task> = {
  headerName: "👥 Atama",
  marryChildren: true,
  children: [
    {
      field: "assignedTo",
      headerName: "Atanan",
      width: 140,
      editable: true,
      enableRowGroup: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ASSIGNEES,
      },
      filter: "agSetColumnFilter",
      filterParams: {
        values: ASSIGNEES,
      },
      floatingFilter: true,
      chartDataType: "category",
    },
    {
      field: "project",
      headerName: "Proje",
      width: 180,
      editable: true,
      enableRowGroup: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: PROJECTS,
      },
      filter: "agSetColumnFilter",
      filterParams: {
        values: PROJECTS,
      },
      floatingFilter: true,
      tooltipField: "project",
    },
  ],
};

const timeTrackingGroup: ColGroupDef<Task> = {
  headerName: "⏱️ Zaman Takibi",
  marryChildren: true,
  children: [
    {
      field: "dueDate",
      headerName: "Teslim Tarihi",
      width: 150,
      filter: "agDateColumnFilter",
      floatingFilter: true,
      valueFormatter: (params) => formatTurkishDate(params.value),
    },
    {
      field: "estimateHours",
      headerName: "Tahmini Süre",
      headerTooltip: "Tahmini Süre (Saat)",
      width: 120,
      editable: true,
      filter: "agNumberColumnFilter",
      floatingFilter: true,
      aggFunc: "sum",
      enableValue: true,
      chartDataType: "series",
      valueFormatter: (params) => formatHours(params.value),
    },
  ],
};

export const COLUMN_DEFS: (ColDef<Task> | ColGroupDef<Task>)[] = [
  checkboxColumn,
  idColumn,
  taskInfoGroup,
  statusPriorityGroup,
  assignmentGroup,
  timeTrackingGroup,
];
