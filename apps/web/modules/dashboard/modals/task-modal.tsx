import { Task } from "../types/task";
import { TaskDetailPanel } from "./../components/task-detail-panel";

interface TaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TaskModal({ task, isOpen, onClose }: TaskModalProps) {
  if (!isOpen || !task) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-2xl max-h-[90vh] overflow-auto rounded-2xl bg-white shadow-2xl">
          <button
            onClick={onClose}
            className="sticky top-0 right-0 float-right m-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
          >
            ✕
          </button>
          <div className="pt-4">
            <TaskDetailPanel task={task} />
          </div>
        </div>
      </div>
    </>
  );
}
