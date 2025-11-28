import { Task } from "../types/task";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent } from "@repo/ui/components/card";
import { Progress } from "@repo/ui/components/progress";
import { Label } from "@repo/ui/components/label";

interface TaskDetailPanelProps {
  task: Task;
}

export function TaskDetailPanel({ task }: TaskDetailPanelProps) {
  const getStatusVariant = (status: Task["status"]) => {
    const variants: Record<Task["status"], "default" | "secondary" | "destructive" | "outline"> = {
      Todo: "secondary",
      "In Progress": "default",
      Done: "outline",
      Blocked: "destructive",
    };
    return variants[status];
  };

  const getPriorityVariant = (priority: Task["priority"]) => {
    const variants: Record<Task["priority"], "default" | "secondary" | "destructive" | "outline"> = {
      Low: "outline",
      Medium: "secondary",
      High: "default",
      Critical: "destructive",
    };
    return variants[priority];
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

  const getProgressValue = () => {
    if (task.status === "Done") return 100;
    if (task.status === "In Progress") return 50;
    return 0;
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
            <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 block">
              Durum
            </Label>
            <Badge variant={getStatusVariant(task.status)}>
              {task.status}
            </Badge>
          </div>

          <div>
            <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 block">
              Öncelik
            </Label>
            <Badge variant={getPriorityVariant(task.priority)}>
              {task.priority}
            </Badge>
          </div>

          <div>
            <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 block">
              Atanan Kişi
            </Label>
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
            <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 block">
              Teslim Tarihi
            </Label>
            <Card>
              <CardContent className="p-3">
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
              </CardContent>
            </Card>
          </div>

          <div>
            <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 block">
              Tahmini Süre
            </Label>
            <Card>
              <CardContent className="p-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-slate-800">
                    {task.estimateHours}
                  </span>
                  <span className="text-sm font-medium text-slate-600">saat</span>
                </div>
                <Progress 
                  value={Math.min((task.estimateHours / 20) * 100, 100)} 
                  className="mt-2 h-2"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-3">
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
                {getProgressValue()}%
              </p>
              <p className="text-xs text-slate-500 mt-1">İlerleme</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3 pt-4 border-t border-slate-200">
        <Button className="flex-1">
          Düzenle
        </Button>
        <Button variant="outline" className="flex-1">
          Yorum Yap
        </Button>
      </div>
    </div>
  );
}
