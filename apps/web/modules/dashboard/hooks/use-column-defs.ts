"use client";

import { useMemo } from "react";
import { COLUMN_DEFS, DEFAULT_COL_DEF } from "../config/column-config";

export function useColumnDefs() {
  const columnDefs = useMemo(() => COLUMN_DEFS, []);
  const defaultColDef = useMemo(() => DEFAULT_COL_DEF, []);

  return { columnDefs, defaultColDef };
}
