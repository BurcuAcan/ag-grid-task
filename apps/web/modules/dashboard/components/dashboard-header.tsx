import { Plus } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import { DeleteConfirmDialog } from "./modals/delete-confirm-dialog";

interface DashboardHeaderProps {
  onNewTask: () => void;
  onDeleteSelected: () => void;
  selectedCount: number;
}

export function DashboardHeader({ onNewTask, onDeleteSelected, selectedCount }: DashboardHeaderProps) {
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
        <Button onClick={onNewTask} className="rounded-full">
          <Plus className="h-4 w-4" />
          Yeni Görev
        </Button>
        <DeleteConfirmDialog
          selectedCount={selectedCount}
          onConfirm={onDeleteSelected}
        />
      </div>
    </div>
  );
}
