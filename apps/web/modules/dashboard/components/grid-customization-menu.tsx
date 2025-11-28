"use client";

import { 
  Settings2, 
  Columns, 
  RotateCcw, 
  Maximize2, 
  Eye, 
  EyeOff, 
  Palette,
  TextIcon,
  LayoutGrid,
  Rows3,
  StretchHorizontal,
} from "lucide-react";
import { Button } from "@repo/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@repo/ui/components/dropdown-menu";
import type { GridApi, Column } from "ag-grid-community";
import { useState, useEffect, useCallback } from "react";
import {
  GridStyleSettings,
  GRID_THEMES,
  ROW_HEIGHT_OPTIONS,
  FONT_SIZE_OPTIONS,
  HEADER_STYLE_OPTIONS,
  BORDER_OPTIONS,
} from "../config/grid-style-config";

interface GridCustomizationMenuProps {
  gridApi: GridApi | null;
  styleSettings: GridStyleSettings;
  onStyleChange: (settings: GridStyleSettings) => void;
}

interface ColumnVisibility {
  colId: string;
  headerName: string;
  visible: boolean;
}

export function GridCustomizationMenu({ 
  gridApi, 
  styleSettings,
  onStyleChange,
}: GridCustomizationMenuProps) {
  const [columns, setColumns] = useState<ColumnVisibility[]>([]);

  const updateColumnList = useCallback(() => {
    if (!gridApi) return;
    
    const allColumns = gridApi.getColumns() || [];
    const columnList: ColumnVisibility[] = allColumns.map((col: Column) => ({
      colId: col.getColId(),
      headerName: col.getColDef().headerName || col.getColId(),
      visible: col.isVisible(),
    }));
    setColumns(columnList);
  }, [gridApi]);

  useEffect(() => {
    updateColumnList();
  }, [updateColumnList]);

  const updateStyle = <K extends keyof GridStyleSettings>(key: K, value: GridStyleSettings[K]) => {
    onStyleChange({ ...styleSettings, [key]: value });
  };

  const toggleColumnVisibility = (colId: string, visible: boolean) => {
    if (!gridApi) return;
    gridApi.setColumnsVisible([colId], visible);
    updateColumnList();
  };

  const resetColumns = () => {
    if (!gridApi) return;
    gridApi.resetColumnState();
    updateColumnList();
  };

  const autoSizeAllColumns = () => {
    if (!gridApi) return;
    gridApi.autoSizeAllColumns();
  };

  const showAllColumns = () => {
    if (!gridApi) return;
    const allColumns = gridApi.getColumns() || [];
    const colIds = allColumns.map((col: Column) => col.getColId());
    gridApi.setColumnsVisible(colIds, true);
    updateColumnList();
  };

  const hideAllColumns = () => {
    if (!gridApi) return;
    const allColumns = gridApi.getColumns() || [];
    const colIds = allColumns.slice(1).map((col: Column) => col.getColId());
    gridApi.setColumnsVisible(colIds, false);
    updateColumnList();
  };

  const openColumnsSidebar = () => {
    if (!gridApi) return;
    gridApi.openToolPanel("columns");
  };

  const openFiltersSidebar = () => {
    if (!gridApi) return;
    gridApi.openToolPanel("filters");
  };

  return (
    <DropdownMenu onOpenChange={(open) => open && updateColumnList()}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings2 className="h-4 w-4" />
          Tablo Ayarları
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Panel Ayarları</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={openColumnsSidebar}>
          <Columns className="h-4 w-4 mr-2" />
          Sütun Panelini Aç
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={openFiltersSidebar}>
          <Settings2 className="h-4 w-4 mr-2" />
          Filtre Panelini Aç
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Sütun Ayarları</DropdownMenuLabel>
        
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Eye className="h-4 w-4 mr-2" />
            Sütunları Göster/Gizle
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="max-h-64 overflow-y-auto">
            <DropdownMenuItem onClick={showAllColumns}>
              <Eye className="h-4 w-4 mr-2" />
              Tümünü Göster
            </DropdownMenuItem>
            <DropdownMenuItem onClick={hideAllColumns}>
              <EyeOff className="h-4 w-4 mr-2" />
              Tümünü Gizle
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {columns.map((col) => (
              <DropdownMenuCheckboxItem
                key={col.colId}
                checked={col.visible}
                onCheckedChange={(checked) => toggleColumnVisibility(col.colId, checked)}
              >
                {col.headerName}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuItem onClick={autoSizeAllColumns}>
          <Maximize2 className="h-4 w-4 mr-2" />
          Otomatik Boyutlandır
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={resetColumns}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Sütunları Sıfırla
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Stil Ayarları</DropdownMenuLabel>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Palette className="h-4 w-4 mr-2" />
            Tema Rengi
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup 
              value={styleSettings.theme} 
              onValueChange={(value) => updateStyle("theme", value)}
            >
              {GRID_THEMES.map((theme) => (
                <DropdownMenuRadioItem key={theme.id} value={theme.id}>
                  <span
                    className="h-3 w-3 rounded-full mr-2 border border-slate-300"
                    style={{ backgroundColor: theme.color }}
                  />
                  {theme.name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Rows3 className="h-4 w-4 mr-2" />
            Satır Yüksekliği
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup 
              value={styleSettings.rowHeight} 
              onValueChange={(value) => updateStyle("rowHeight", value as GridStyleSettings["rowHeight"])}
            >
              {ROW_HEIGHT_OPTIONS.map((option) => (
                <DropdownMenuRadioItem key={option.id} value={option.id}>
                  {option.name} ({option.height}px)
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <TextIcon className="h-4 w-4 mr-2" />
            Font Boyutu
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup 
              value={styleSettings.fontSize} 
              onValueChange={(value) => updateStyle("fontSize", value as GridStyleSettings["fontSize"])}
            >
              {FONT_SIZE_OPTIONS.map((option) => (
                <DropdownMenuRadioItem key={option.id} value={option.id}>
                  {option.name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <LayoutGrid className="h-4 w-4 mr-2" />
            Header Stili
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup 
              value={styleSettings.headerStyle} 
              onValueChange={(value) => updateStyle("headerStyle", value as GridStyleSettings["headerStyle"])}
            >
              {HEADER_STYLE_OPTIONS.map((option) => (
                <DropdownMenuRadioItem key={option.id} value={option.id}>
                  {option.name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <StretchHorizontal className="h-4 w-4 mr-2" />
            Kenarlıklar
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup 
              value={styleSettings.borders} 
              onValueChange={(value) => updateStyle("borders", value as GridStyleSettings["borders"])}
            >
              {BORDER_OPTIONS.map((option) => (
                <DropdownMenuRadioItem key={option.id} value={option.id}>
                  {option.name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
