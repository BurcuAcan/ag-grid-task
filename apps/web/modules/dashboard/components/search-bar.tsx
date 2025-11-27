import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white/80 p-3 shadow-sm backdrop-blur">
      <div className="relative w-full max-w-sm">
        <input
          type="text"
          placeholder="Görev, kişi veya durum ara..."
          className="h-9 w-full rounded-full border border-slate-200 bg-slate-50 px-9 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
          <Search className="h-4 w-4" />
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        <span>Satır tıkla · Inline edit · Çoklu seçim · Filtreleme</span>
      </div>
    </div>
  );
}
