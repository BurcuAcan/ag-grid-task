"use client";

import {
  LicenseManager,
  SetFilterModule,
  RowGroupingModule,
  RowGroupingPanelModule,
  SideBarModule,
  IntegratedChartsModule,
  MenuModule,
  ColumnsToolPanelModule,
  CellSelectionModule,
  ContextMenuModule,
  PivotModule,
  ClipboardModule,
  FiltersToolPanelModule,
  ExcelExportModule,
} from "ag-grid-enterprise";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgChartsCommunityModule } from "ag-charts-community";

interface AgGridProviderProps {
  licenseKey?: string;
  children: React.ReactNode;
}

ModuleRegistry.registerModules([
  AllCommunityModule,
  SetFilterModule,
  RowGroupingModule,
  RowGroupingPanelModule,
  SideBarModule,
  CellSelectionModule,
  MenuModule,
  ColumnsToolPanelModule,
  IntegratedChartsModule.with(AgChartsCommunityModule),
  ContextMenuModule,
  PivotModule,
  ClipboardModule,
  FiltersToolPanelModule,
  ExcelExportModule,
]);

let licenseSet = false;

export function AgGridProvider({ licenseKey, children }: AgGridProviderProps) {
  if (licenseKey && !licenseSet) {
    LicenseManager.setLicenseKey(licenseKey);
    licenseSet = true;
  }

  return <>{children}</>;
}
