export const getContextMenuItems = (params: any) => {
  const createChart = (chartType: any) => {
    return () => {
      const cellRange = params.api.getCellRanges()?.[0];
      if (cellRange) {
        const startRow = cellRange.startRow;
        const endRow = cellRange.endRow;
        params.api.createRangeChart({
          chartType: chartType,
          cellRange: {
            rowStartIndex: startRow?.rowIndex,
            rowEndIndex: endRow?.rowIndex,
            columns: cellRange.columns.map((col: any) => col.colId),
          },
        });

        setTimeout(() => {
          params.api.clearCellSelection();
        }, 100);
      }
    };
  };

  const items: any[] = [
    {
      name: "📊 Grafik Oluştur",
      subMenu: [
        {
          name: "📊 Column Chart",
          action: createChart("groupedColumn"),
        },
        {
          name: "📈 Bar Chart",
          action: createChart("groupedBar"),
        },
        {
          name: "📉 Line Chart",
          action: createChart("line"),
        },
        {
          name: "🥧 Pie Chart",
          action: createChart("pie"),
        },
        {
          name: "🍩 Donut Chart",
          action: createChart("donut"),
        },
        {
          name: "📊 Area Chart",
          action: createChart("area"),
        },
      ],
    },
    "separator" as const,
    "copy" as const,
    "copyWithHeaders" as const,
    "separator" as const,
    "export" as const,
  ];
  return items as any;
};
