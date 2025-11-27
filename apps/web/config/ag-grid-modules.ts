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
  ClipboardModule 
} from "ag-grid-enterprise";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgChartsCommunityModule } from "ag-charts-community";

if (process.env.NEXT_PUBLIC_AG_GRID_LICENSE_KEY) {
  LicenseManager.setLicenseKey(process.env.NEXT_PUBLIC_AG_GRID_LICENSE_KEY);
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
  ClipboardModule 
]);

