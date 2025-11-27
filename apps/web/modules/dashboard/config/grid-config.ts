export const GRID_CONFIG = {
  paginationPageSize: 10,
  height: 520,
  animateRows: true,
  rowGroupPanelShow: "always",
  pivotPanelShow: "always",
  groupDisplayType: "multipleColumns",
  suppressAggFuncInHeader: false,
  cellSelection: true,
  enableCharts: true,
} as const;

export const SIDEBAR_CONFIG = {
  toolPanels: [
    {
      id: "columns",
      labelDefault: "Columns",
      labelKey: "columns",
      iconKey: "columns",
      toolPanel: "agColumnsToolPanel",
      toolPanelParams: {
        suppressRowGroups: false,
        suppressValues: false,
        suppressPivots: false,
        suppressPivotMode: false,
      },
    },
  ],
  defaultToolPanel: "",
};
