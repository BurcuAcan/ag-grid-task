import { ColDef } from "ag-grid-community";
import { Task } from "../types/task";
import { StatusCellRenderer } from "./cell-renderers/status-cell-renderer";
import { PriorityCellRenderer } from "./cell-renderers/priority-cell-renderer";

export const defaultColDef: ColDef<Task> = {
  sortable: true,
  filter: true,
  resizable: true,
  floatingFilter: true,
  enableValue: true,
  enableRowGroup: true,
  enablePivot: true,
};

export const columnDefs: ColDef<Task>[] = [
  {
    headerName: "",
    checkboxSelection: true,
    headerCheckboxSelection: true,
    width: 50,
    pinned: "left",
    filter: false,
    sortable: false,
  },
  {
    field: "id",
    headerName: "ID",
    width: 80,
    filter: false,
  },
  {
    field: "title",
    headerName: "Task",
    flex: 1.5,
    editable: true,
    filter: "agTextColumnFilter",
    filterParams: {
      defaultOption: "startsWith",
    },
    floatingFilter: true,
  },
  {
    field: "description",
    headerName: "Açıklama",
    flex: 2,
    tooltipField: "description",
    filter: "agTextColumnFilter",
    filterParams: {
      defaultOption: "contains",
    },
    floatingFilter: true,
  },
  {
    field: "status",
    headerName: "Durum",
    width: 140,
    editable: true,
    enablePivot: true,
    enableRowGroup: true,
    cellEditor: "agSelectCellEditor",
    cellEditorParams: {
      values: ["Todo", "In Progress", "Done", "Blocked"],
    },
    filter: "agSetColumnFilter",
    filterParams: {
      values: ["Todo", "In Progress", "Done", "Blocked"],
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
      values: ["Low", "Medium", "High", "Critical"],
    },
    filter: "agSetColumnFilter",
    filterParams: {
      values: ["Low", "Medium", "High", "Critical"],
    },
    floatingFilter: true,
    cellRenderer: PriorityCellRenderer,
    chartDataType: "category",
  },
  {
    field: "assignedTo",
    headerName: "Atanan",
    width: 140,
    editable: true,
    enableRowGroup: true,
    cellEditor: "agSelectCellEditor",
    cellEditorParams: {
      values: ["Burcu", "Ahmet", "Zeynep", "Mehmet", "Ayşe"],
    },
    filter: "agSetColumnFilter",
    filterParams: {
      values: ["Burcu", "Ahmet", "Zeynep", "Mehmet", "Ayşe"],
    },
    floatingFilter: true,
    chartDataType: "category",
  },
  {
    field: "project",
    headerName: "Proje",
    width: 160,
    editable: true,
    enableRowGroup: true,
    cellEditor: "agSelectCellEditor",
    cellEditorParams: {
      values: [
        "Frontend Geliştirme",
        "Backend Geliştirme",
        "Tasarım",
        "Dokümantasyon",
      ],
    },
    filter: "agSetColumnFilter",
    filterParams: {
      values: [
        "Frontend Geliştirme",
        "Backend Geliştirme",
        "Tasarım",
        "Dokümantasyon",
      ],
    },
    floatingFilter: true,
  },
  {
    field: "dueDate",
    headerName: "Teslim Tarihi",
    width: 150,
    filter: "agDateColumnFilter",
    floatingFilter: true,
    valueFormatter: (params) => {
      if (!params.value) return "";
      const d = new Date(params.value);
      if (Number.isNaN(d.getTime())) return params.value;
      return d.toLocaleDateString("tr-TR");
    },
  },
  {
    field: "estimateHours",
    headerName: "Tahmini Süre",
    width: 130,
    editable: true,
    filter: "agNumberColumnFilter",
    floatingFilter: true,
    aggFunc: "sum",
    enableValue: true,
    chartDataType: "series",
    valueFormatter: (params) =>
      params.value != null ? `${params.value}h` : "",
  },
];
