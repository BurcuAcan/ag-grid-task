export const PRIORITY_COLORS = {
  Low: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    rowBg: "rgba(34, 197, 94, 0.06)",
  },
  Medium: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    rowBg: "rgba(234, 179, 8, 0.06)",
  },
  High: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    rowBg: "rgba(249, 115, 22, 0.08)",
  },
  Critical: {
    bg: "bg-red-50",
    text: "text-red-700",
    rowBg: "rgba(239, 68, 68, 0.08)",
  },
} as const;

export const STATUS_COLORS = {
  Todo: {
    bg: "bg-gray-100",
    text: "text-gray-800",
  },
  "In Progress": {
    bg: "bg-blue-100",
    text: "text-blue-800",
  },
  Done: {
    bg: "bg-green-100",
    text: "text-green-800",
  },
  Blocked: {
    bg: "bg-red-100",
    text: "text-red-800",
  },
} as const;
