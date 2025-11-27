import { Plus, Trash2 } from "lucide-react";

interface DashboardHeaderProps {
  onNewTask: () => void;
  onDeleteSelected: () => void;
}

export function DashboardHeader({ onNewTask, onDeleteSelected }: DashboardHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Task Yönetim Paneli
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Görevleri öncelik, durum ve teslim tarihine göre yönetin. Detayları
          görmek için satırı tıklayın.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={onNewTask} 
          className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" />
          Yeni Görev
        </button>
        <button 
          onClick={onDeleteSelected} 
          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <Trash2 className="h-4 w-4" />
          Seçili Görevleri Sil
        </button>
      </div>
    </div>
  );
}
