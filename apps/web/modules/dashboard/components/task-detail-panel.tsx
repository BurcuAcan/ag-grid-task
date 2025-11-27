import { Task } from "../types/task";

interface TaskDetailPanelProps {
  task: Task;
}

export function TaskDetailPanel({ task }: TaskDetailPanelProps) {
  const getStatusColor = (status: Task["status"]) => {
    const colors: Record<Task["status"], string> = {
      Todo: "bg-gray-100 text-gray-800",
      "In Progress": "bg-blue-100 text-blue-800",
      Done: "bg-green-100 text-green-800",
      Blocked: "bg-red-100 text-red-800",
    };
    return colors[status];
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    const colors: Record<Task["priority"], string> = {
      Low: "bg-emerald-50 text-emerald-700",
      Medium: "bg-yellow-50 text-yellow-700",
      High: "bg-orange-50 text-orange-700",
      Critical: "bg-red-50 text-red-700",
    };
    return colors[priority];
  };

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString("tr-TR");
  };

  const daysUntilDue = () => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const days = daysUntilDue();
  const isOverdue = days < 0;
  const isDueSoon = days <= 3 && days > 0;

  return (
    <div className="space-y-6 p-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="border-b border-slate-200 pb-6">
        <h2 className="text-xl font-bold text-slate-900 leading-relaxed">
          {task.title}
        </h2>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          {task.description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Durum
            </label>
            <span
              className={`inline-block px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}
            >
              {task.status}
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Öncelik
            </label>
            <span
              className={`inline-block px-3 py-1.5 rounded-full text-sm font-medium ${getPriorityColor(task.priority)}`}
            >
              {task.priority}
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Atanan Kişi
            </label>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700">
                {task.assignedTo.charAt(0)}
              </div>
              <span className="text-sm font-medium text-slate-800">
                {task.assignedTo}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Teslim Tarihi
            </label>
            <div className="flex items-center justify-between rounded-lg bg-slate-100 p-3">
              <div>
                <p className="text-sm font-medium text-slate-800">
                  {formatDate(task.dueDate)}
                </p>
                <p
                  className={`text-xs font-medium mt-1 ${
                    isOverdue
                      ? "text-red-600"
                      : isDueSoon
                        ? "text-orange-600"
                        : "text-slate-600"
                  }`}
                >
                  {isOverdue
                    ? `${Math.abs(days)} gün gecikmeli`
                    : isDueSoon
                      ? `${days} gün kaldı`
                      : `${days} gün sonra`}
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Tahmini Süre
            </label>
            <div className="rounded-lg bg-slate-100 p-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-800">
                  {task.estimateHours}
                </span>
                <span className="text-sm font-medium text-slate-600">saat</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                  style={{ width: `${Math.min((task.estimateHours / 20) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-slate-900">{task.id}</p>
          <p className="text-xs text-slate-500 mt-1">Görev ID</p>
        </div>
        <div className="text-center border-l border-r border-slate-200">
          <p className="text-2xl font-bold text-blue-600">
            {task.priority === "Critical" ? "🔥" : "✓"}
          </p>
          <p className="text-xs text-slate-500 mt-1">Durum</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-slate-900">
            {task.status === "Done" ? "100%" : task.status === "In Progress" ? "50%" : "0%"}
          </p>
          <p className="text-xs text-slate-500 mt-1">İlerleme</p>
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t border-slate-200">
        <button className="flex-1 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
          Düzenle
        </button>
        <button className="flex-1 inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
          Yorum Yap
        </button>
      </div>
    </div>
  );
}
