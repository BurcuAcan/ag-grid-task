export interface GridStyleSettings {
  theme: string;
  rowHeight: "compact" | "normal" | "large";
  fontSize: "small" | "normal" | "large";
  headerStyle: "normal" | "bold" | "large";
  borders: "none" | "thin" | "thick";
}

export const DEFAULT_GRID_STYLE: GridStyleSettings = {
  theme: "default",
  rowHeight: "normal",
  fontSize: "normal",
  headerStyle: "normal",
  borders: "thin",
};

export const GRID_THEMES = [
  { id: "default", name: "Varsayılan", color: "#f8fafc" },
  { id: "blue", name: "Mavi", color: "#1e40af" },
  { id: "green", name: "Yeşil", color: "#166534" },
  { id: "purple", name: "Mor", color: "#7c3aed" },
  { id: "orange", name: "Turuncu", color: "#ea580c" },
  { id: "dark", name: "Koyu", color: "#1e293b" },
];

export const ROW_HEIGHT_OPTIONS = [
  { id: "compact", name: "Kompakt", height: 32 },
  { id: "normal", name: "Normal", height: 42 },
  { id: "large", name: "Geniş", height: 56 },
];

export const FONT_SIZE_OPTIONS = [
  { id: "small", name: "Küçük" },
  { id: "normal", name: "Normal" },
  { id: "large", name: "Büyük" },
];

export const HEADER_STYLE_OPTIONS = [
  { id: "normal", name: "Normal" },
  { id: "bold", name: "Kalın" },
  { id: "large", name: "Büyük" },
];

export const BORDER_OPTIONS = [
  { id: "none", name: "Yok" },
  { id: "thin", name: "İnce" },
  { id: "thick", name: "Kalın" },
];

export function getGridStyleClasses(settings: GridStyleSettings): string {
  const classes = [
    `grid-theme-${settings.theme}`,
    `grid-row-${settings.rowHeight}`,
    `grid-font-${settings.fontSize}`,
    `grid-header-${settings.headerStyle}`,
    `grid-border-${settings.borders}`,
  ];
  return classes.join(" ");
}

export function getRowHeight(settings: GridStyleSettings): number {
  const option = ROW_HEIGHT_OPTIONS.find((o) => o.id === settings.rowHeight);
  return option?.height || 42;
}
